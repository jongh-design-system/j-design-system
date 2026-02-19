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
        'import { forwardRef, type ComponentPropsWithoutRef } from "react"\nimport { Slot } from "@radix-ui/react-slot"\nimport { cn } from "@utils/cn"\nimport { buttonVariants } from "./recipe"\n\nexport type ButtonProps = ComponentPropsWithoutRef<"button"> & {\n  asChild?: boolean\n  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"\n  size?: "default" | "sm" | "lg" | "icon"\n}\n\nexport const Button = forwardRef<HTMLButtonElement, ButtonProps>(\n  ({ className, variant, size, asChild, ...props }, ref) => {\n    const Comp = asChild ? Slot : "button"\n    return <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />\n  },\n)\n\nButton.displayName = "Button"\n',
      type: "ui",
    },
    {
      name: "recipe.ts",
      content:
        'import { tv } from "tailwind-variants"\n\nexport const buttonVariants = tv({\n  base: "inline-flex items-center justify-center rounded-md text-sm font-medium cursor-pointer gap-2 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",\n  variants: {\n    variant: {\n      default: "bg-primary text-primary-foreground hover:bg-primary/90",\n      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",\n      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",\n      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",\n      ghost: "hover:bg-accent hover:text-accent-foreground",\n      link: "text-primary underline-offset-4 hover:underline",\n    },\n    size: {\n      default: "h-10 px-4 py-2",\n      sm: "h-9 rounded-md px-3",\n      lg: "h-11 rounded-md px-8",\n      icon: "h-10 w-10",\n    },\n  },\n  defaultVariants: {\n    variant: "default",\n    size: "default",\n  },\n})\n',
      type: "ui",
    },
  ],
}

const COMPONENTS_JSON = {
  utils: "@/utils",
  components: "@/components",
  hooks: "@/hooks",
}

const TSCONFIG_JSON = {
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"],
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
