import path from "path"
import { test, vi, describe, beforeAll, expect, afterAll } from "vitest"
import fs from "fs-extra"
import { addCommand } from "../add"

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

const PACKAGE_JSON = {
  devDependencies: {
    "@pandacss/dev": "0.0.5",
  },
}

const TS_CONFIG = {
  compilerOptions: {
    baseUrl: "src",
    paths: {
      "@/*": ["./*"],
      "@styled-system/*": ["../styled-system/*"],
      // "@utils/*": ["./src/utils/"],
    },
  },
}

const COMPONENTS_JSON = {
  utils: "@/utils",
  components: "@/components",
  hooks: "@/hooks",
  styledsystem: "@styled-system",
}

const PRESET_TS = `
export const defaultPreset = definePreset({
  name: "default",
  theme: {
    extend: {

      recipes: {

      },
    },
  },
  staticCss: {
    recipes: "*",
  },
})
`

const PANDA_CONFIG_TS = `export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src//*.{js,jsx,ts,tsx}", "./pages//*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: "styled-system",
})
`

describe("add test", () => {
  const temp = path.join(__dirname, "../../../temp-add")

  beforeAll(async () => {
    await fs.mkdir(temp, { recursive: true })
    await Promise.all([
      fs.writeFile(
        path.resolve(temp, "tsconfig.json"),
        JSON.stringify(TS_CONFIG, null, 2),
        "utf-8",
      ),
      fs.writeFile(
        path.resolve(temp, "package.json"),
        JSON.stringify(PACKAGE_JSON, null, 2),
        "utf-8",
      ),
      fs.writeFile(
        path.resolve(temp, "panda.config.ts"),
        PANDA_CONFIG_TS,
        "utf-8",
      ),
      fs.writeFile(
        path.resolve(temp, "components.json"),
        JSON.stringify(COMPONENTS_JSON, null, 2),
        "utf-8",
      ),
      fs.writeFile(path.resolve(temp, "preset.ts"), PRESET_TS, "utf-8"),
      //folder
      fs.mkdir(path.join(temp, "src", "components"), {
        recursive: true,
      }),
      fs.mkdir(path.join(temp, "src", "utils"), { recursive: true }),
      fs.mkdir(path.join(temp, "src", "hooks"), { recursive: true }),
      fs.mkdir(path.join(temp, "styled-system"), { recursive: true }),
    ])
  })

  afterAll(async () => {
    await fs.remove(temp)
  })

  test("터미널에 add button을 입력했을 경우 ./src/components 경로에 폴더가 생성된다", async () => {
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(BUTTON_JSON),
        }) as Promise<Response>,
    )
    await addCommand.parseAsync(["node", "add", "button", "-c", temp])

    expect(
      fs.pathExistsSync(
        path.join(temp, "src", "components", "button", "index.tsx"),
      ),
    ).toBeTruthy()
    expect(
      fs.pathExistsSync(
        path.join(temp, "src", "components", "button", "recipe.ts"),
      ),
    ).toBeTruthy()
  })
})
