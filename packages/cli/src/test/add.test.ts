import fs from "fs-extra"
import path from "path"
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest"

import { addCommand } from "@/commands/add"
import { loadComponentConfig, loadTSConfig } from "@/common/get-config"
import { resolveImport } from "@/common/resolve"
import { configSchema } from "@/common/types"

const BUTTON_JSON = {
  name: "button",
  dependencies: ["@radix-ui/react-slot"],
  files: [
    {
      name: "index.tsx",
      content:
        'import { styled, type HTMLStyledProps } from "@styled-system/jsx"\nimport { button } from "@styled-system/recipes"\nimport type { ComponentPropsWithoutRef } from "react"\nimport { forwardRef } from "react"\nimport { Slot } from "@radix-ui/react-slot"\n\nexport type BaseButtonProps = ComponentPropsWithoutRef<"button"> & {\n  asChild?: boolean\n}\n\nexport const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(\n  ({ asChild, ...props }, ref) => {\n    const Comp = asChild ? Slot : "button"\n\n    return <Comp role="button" ref={ref} {...props}></Comp>\n  },\n)\n\nBaseButton.displayName = "Button"\n\nexport const Button = styled(BaseButton, button)\nexport type ButtonProps = HTMLStyledProps<typeof Button>\n',
      type: "ui",
    },
    {
      name: "recipe.ts",
      content:
        'import { defineSafe } from "@utils/defineSafe"\n\nexport const buttonRecipe = defineSafe.recipe({\n  className: "button",\n  description: "Styles for the Button component",\n  base: {\n    display: "inline-flex",\n    alignItems: "center",\n    justifyContent: "center",\n    rounded: "md",\n    textStyle: "sm",\n    fontWeight: "medium",\n    transition: "colors",\n    cursor: "pointer",\n    gap: "2",\n    _focusVisible: {\n      ringWidth: "1",\n      ringColor: "ring",\n      ringOffset: "1",\n    },\n\n    _disabled: {\n      cursor: "not-allowed",\n      opacity: "50%",\n    },\n  },\n  variants: {\n    variant: {\n      default: {\n        bg: "primary",\n        color: "primary.foreground",\n\n        _hover: {\n          bg: "primary/90",\n        },\n      },\n      destructive: {\n        bg: "destructive",\n        color: "destructive.foreground",\n\n        _hover: {\n          bg: "destructive/90",\n        },\n      },\n      outline: {\n        border: "input",\n        bg: "background",\n\n        _hover: {\n          bg: "accent",\n          color: "accent.foreground",\n        },\n      },\n      secondary: {\n        bg: "secondary",\n        color: "secondary.foreground",\n\n        _hover: {\n          bga: "secondary/90",\n        },\n      },\n      ghost: {\n        _hover: {\n          bg: "accent",\n          color: "accent.foreground",\n        },\n      },\n      link: {\n        color: "primary",\n        textUnderlineOffset: "4px",\n\n        _hover: {\n          textDecoration: "underline",\n        },\n      },\n    },\n    size: {\n      default: {\n        h: "10",\n        px: "4",\n        py: "2",\n      },\n      sm: {\n        h: "9",\n        rounded: "md",\n        px: "3",\n      },\n      lg: {\n        h: "11",\n        rounded: "md",\n        px: "8",\n      },\n      icon: {\n        h: "10",\n        w: "10",\n      },\n    },\n  },\n  defaultVariants: {\n    variant: "default",\n    size: "default",\n  },\n})\n',
      type: "ui",
    },
  ],
}

const COMPONENTS_JSON = {
  utils: "@/utils",
  components: "@/components",
  hooks: "@/hooks",
  styledsystem: "@styled-system",
}

const TSCONFIG_JSON = {
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"],
      "@styled-system/*": ["./styled-system/*"],
    },
  },
}

const cwd = path.join(__dirname, "./fixture/add_test")

describe("add test", () => {
  beforeAll(() => {
    fs.writeFileSync(
      path.join(cwd, "components.json"),
      JSON.stringify(COMPONENTS_JSON),
      "utf-8",
    )
    fs.writeFileSync(
      path.join(cwd, "tsconfig.json"),
      JSON.stringify(TSCONFIG_JSON),
      "utf-8",
    )
  })

  afterAll(() => {
    fs.remove(path.join(cwd, "components.json"))
    fs.remove(path.join(cwd, "tsconfig.json"))
  })

  describe("add 유틸함수 test", () => {
    test("현재 경로에서 components.json파일을 읽습니다", () => {
      expect(configSchema.schema.parse(loadComponentConfig(cwd))).toEqual(
        COMPONENTS_JSON,
      )
    })

    test("tsconfig.json를 사용해 components.json의 alias를 실제 path로 변환합니다", async () => {
      const tsconfig = loadTSConfig(cwd)

      const componentsPath = await resolveImport(
        COMPONENTS_JSON["components"],
        tsconfig,
      )
      expect(componentsPath).equal(path.join(cwd, "src", "components"))
    })
  })

  describe("터미널에 @jongh/cli add button을 입력합니다", () => {
    const buttonFolder = path.join(cwd, "src", "components", "button")

    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(BUTTON_JSON),
        }) as Promise<Response>,
    )

    beforeAll(async () => {
      await addCommand.parseAsync(["node", "add", "button", "-c", cwd])
    })

    afterAll(() => {
      fs.remove(path.join(cwd, "src"))
    })

    test("components/button 폴더에 index.tsx파일이 생성됩니다", () => {
      expect(
        fs.pathExistsSync(path.join(buttonFolder, "index.tsx")),
      ).toBeTruthy()
    })

    test("components/button 폴더에 recipe.ts 파일이 생성됩니다", () => {
      expect(
        fs.pathExistsSync(path.join(buttonFolder, "recipe.ts")),
      ).toBeTruthy()
    })
  })
})
