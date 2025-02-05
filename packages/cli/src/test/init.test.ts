import { afterAll, beforeAll, expect, describe, test, vi } from "vitest"
import path from "path"
import fs from "fs-extra"
import { checkJsonInit } from "../init/utils/checkJsonInit"
import { checkPandaInit } from "../init/utils/checkPandaInit"
import { getTsConfigAlias } from "../common/utils/directoryUtils"
import { initCommand } from "../init"

const TS_CONFIG = {
  compilerOptions: {
    paths: {
      "@/*": ["./src/"],
      "@styled-system/*": ["./styled-system/"],
      "@utils/*": ["./src/utils/"],
    },
  },
}

const PACKAGE_JSON = {
  devDependencies: {
    "@pandacss/dev": "^1.0.0",
  },
}

// const COMPONENTS_JSON = {
//   utils: "@/utils",
//   components: "@/components",
//   hooks: "@/hooks",
//   styledsystem: "@styled-system",
// }

const PANDA_CONFIG_TS = `import { defineConfig } from "@pandacss/dev"

export default defineConfig({
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

const PRESET_TS = {
  name: "preset.ts",
  dependencies: [],
  file: '"import {\\n  defineGlobalStyles,\\n  definePreset,\\n  defineSemanticTokens,\\n  defineTokens,\\n} from \\"@pandacss/dev\\"\\n\\nconst globalCss = defineGlobalStyles({\\n  \\"html, body\\": {\\n    w: \\"full\\",\\n    h: \\"full\\",\\n  },\\n})\\n\\nconst radii = defineTokens.radii({\\n  radius: { value: \\"0.5rem\\" },\\n})\\n\\nexport const semanticColors = defineSemanticTokens.colors({\\n  background: {\\n    value: { base: \\"hsl(0 0% 100%)\\", _dark: \\"hsl(222.2 84% 4.9%)\\" },\\n  },\\n  foreground: {\\n    value: { base: \\"hsl(222.2 84% 4.9%)\\", _dark: \\"hsl(210 40% 98%)\\" },\\n  },\\n  card: {\\n    DEFAULT: {\\n      value: { base: \\"hsl(0 0% 100%)\\", _dark: \\"hsl(222.2 84% 4.9%)\\" },\\n    },\\n    foreground: {\\n      value: { base: \\"hsl(222.2 84% 4.9%)\\", _dark: \\"hsl(210 40% 98%)\\" },\\n    },\\n  },\\n  popover: {\\n    DEFAULT: {\\n      value: { base: \\"hsl(0 0% 100%)\\", _dark: \\"hsl(222.2 84% 4.9%)\\" },\\n    },\\n    foreground: {\\n      value: { base: \\"hsl(222.2 84% 4.9%)\\", _dark: \\"hsl(210 40% 98%)\\" },\\n    },\\n  },\\n  primary: {\\n    DEFAULT: {\\n      value: { base: \\"hsl(222.2 47.4% 11.2%)\\", _dark: \\"hsl(210 40% 98%)\\" },\\n    },\\n    foreground: {\\n      value: { base: \\"hsl(210 40% 98%)\\", _dark: \\"hsl(222.2 47.4% 11.2%)\\" },\\n    },\\n  },\\n  secondary: {\\n    DEFAULT: {\\n      value: { base: \\"hsl(210 40% 96.1%)\\", _dark: \\"hsl(217.2 32.6% 17.5%)\\" },\\n    },\\n    foreground: {\\n      value: { base: \\"hsl(222.2 47.4% 11.2%)\\", _dark: \\"hsl(210 40% 98%)\\" },\\n    },\\n  },\\n  muted: {\\n    DEFAULT: {\\n      value: { base: \\"hsl(210 40% 96.1%)\\", _dark: \\"hsl(217.2 32.6% 17.5%)\\" },\\n    },\\n    foreground: {\\n      value: {\\n        base: \\"hsl(215.4 16.3% 46.9%)\\",\\n        _dark: \\"hsl(215 20.2% 65.1%)\\",\\n      },\\n    },\\n  },\\n  accent: {\\n    DEFAULT: {\\n      value: { base: \\"hsl(210 40% 96.1%)\\", _dark: \\"hsl(217.2 32.6% 17.5%)\\" },\\n    },\\n    foreground: {\\n      value: { base: \\"hsl(222.2 47.4% 11.2%)\\", _dark: \\"hsl(210 40% 98%)\\" },\\n    },\\n  },\\n  destructive: {\\n    DEFAULT: {\\n      value: { base: \\"hsl(0 84.2% 60.2%)\\", _dark: \\"hsl(0 62.8% 30.6%)\\" },\\n    },\\n    foreground: {\\n      value: { base: \\"hsl(210 40% 98%)\\", _dark: \\"hsl(210 40% 98%)\\" },\\n    },\\n  },\\n  border: {\\n    value: {\\n      base: \\"hsl(214.3 31.8% 91.4%)\\",\\n      _dark: \\"hsl(217.2 32.6% 17.5%)\\",\\n    },\\n  },\\n  input: {\\n    value: {\\n      base: \\"hsl(214.3 31.8% 91.4%)\\",\\n      _dark: \\"hsl(217.2 32.6% 17.5%)\\",\\n    },\\n  },\\n  ring: {\\n    value: { base: \\"hsl(222.2 84% 4.9%)\\", _dark: \\"hsl(212.7 26.8% 83.9%)\\" },\\n  },\\n})\\n\\nconst borders = defineSemanticTokens.borders({\\n  base: { value: \\"1px solid {colors.border}\\" },\\n  input: { value: \\"1px solid {colors.input}\\" },\\n  primary: { value: \\"1px solid {colors.primary}\\" },\\n  destructive: { value: \\"1px solid {colors.destructive}\\" },\\n})\\n\\nexport const radius = defineSemanticTokens.radii({\\n  xl: { value: `calc({radii.radius} + 4px)` },\\n  lg: { value: `{radii.radius}` },\\n  md: { value: `calc({radii.radius} - 2px)` },\\n  sm: { value: \\"calc({radii.radius} - 4px)\\" },\\n})\\n\\nexport const defaultPreset = definePreset({\\n  name: \\"default\\",\\n  globalCss,\\n  theme: {\\n    extend: {\\n      tokens: {\\n        radii,\\n      },\\n      semanticTokens: {\\n        colors: semanticColors,\\n        radii: radius,\\n        borders: borders,\\n      },\\n    },\\n  },\\n  staticCss: {\\n    recipes: \\"*\\",\\n  },\\n})\\n"',
}
// init.test.ts
describe("init 테스트", () => {
  const temp = path.resolve(__dirname, "../temp-init")

  beforeAll(async () => {
    await fs.mkdir(temp, { recursive: true })
    await fs.writeFile(
      path.resolve(temp, "tsconfig.json"),
      JSON.stringify(TS_CONFIG, null, 2),
      "utf-8",
    )
    await fs.writeFile(
      path.resolve(temp, "package.json"),
      JSON.stringify(PACKAGE_JSON, null, 2),
      "utf-8",
    )
    await fs.writeFile(
      path.resolve(temp, "panda.config.ts"),
      PANDA_CONFIG_TS,
      "utf-8",
    )
  })

  afterAll(async () => {
    await fs.remove(temp)
  })

  test("root 경로에 components.json 파일이 있는지 확인합니다", async () => {
    expect(await checkJsonInit(temp)).toBeFalsy()
  })

  test("pandaCSS 설치 상태를 확인합니다", async () => {
    expect(await checkPandaInit(temp)).toBeTruthy()
  })

  test("tsconfig와 panda.config.ts 설정 파일의 경로를 통해 alias를 찾습니다", async () => {
    expect(getTsConfigAlias(temp, "styled-system")).toStrictEqual({
      baseAlias: "@",
      styledSystemAlias: "@styled-system",
    })
  })

  test("cli init", async () => {
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(PRESET_TS),
        }) as Promise<Response>,
    )
    await initCommand.parseAsync(["node", "init", "-c", temp])
    expect(fs.existsSync(path.join(temp, "preset.ts"))).toBeTruthy()
  })
})

// add.test.ts
