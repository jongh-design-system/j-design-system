import fs from "fs-extra"
import path from "path"
import { afterAll, describe, expect, test, vi } from "vitest"

import { initCommand } from "@/commands/init"
import {
  checkJsonInit,
  getBaseAlias,
  getStyleAlias,
  loadTSConfig,
} from "@/common/get-config"
import { checkPandaInit } from "@/common/get-config"

const PRESET_TS = {
  name: "preset.ts",
  dependencies: [],
  file: '"import {\\n  defineGlobalStyles,\\n  definePreset,\\n  defineSemanticTokens,\\n  defineTokens,\\n} from \\"@pandacss/dev\\"\\n\\nconst globalCss = defineGlobalStyles({\\n  \\"html, body\\": {\\n    w: \\"full\\",\\n    h: \\"full\\",\\n  },\\n})\\n\\nconst radii = defineTokens.radii({\\n  radius: { value: \\"0.5rem\\" },\\n})\\n\\nexport const semanticColors = defineSemanticTokens.colors({\\n  background: {\\n    value: { base: \\"hsl(0 0% 100%)\\", _dark: \\"hsl(222.2 84% 4.9%)\\" },\\n  },\\n  foreground: {\\n    value: { base: \\"hsl(222.2 84% 4.9%)\\", _dark: \\"hsl(210 40% 98%)\\" },\\n  },\\n  card: {\\n    DEFAULT: {\\n      value: { base: \\"hsl(0 0% 100%)\\", _dark: \\"hsl(222.2 84% 4.9%)\\" },\\n    },\\n    foreground: {\\n      value: { base: \\"hsl(222.2 84% 4.9%)\\", _dark: \\"hsl(210 40% 98%)\\" },\\n    },\\n  },\\n  popover: {\\n    DEFAULT: {\\n      value: { base: \\"hsl(0 0% 100%)\\", _dark: \\"hsl(222.2 84% 4.9%)\\" },\\n    },\\n    foreground: {\\n      value: { base: \\"hsl(222.2 84% 4.9%)\\", _dark: \\"hsl(210 40% 98%)\\" },\\n    },\\n  },\\n  primary: {\\n    DEFAULT: {\\n      value: { base: \\"hsl(222.2 47.4% 11.2%)\\", _dark: \\"hsl(210 40% 98%)\\" },\\n    },\\n    foreground: {\\n      value: { base: \\"hsl(210 40% 98%)\\", _dark: \\"hsl(222.2 47.4% 11.2%)\\" },\\n    },\\n  },\\n  secondary: {\\n    DEFAULT: {\\n      value: { base: \\"hsl(210 40% 96.1%)\\", _dark: \\"hsl(217.2 32.6% 17.5%)\\" },\\n    },\\n    foreground: {\\n      value: { base: \\"hsl(222.2 47.4% 11.2%)\\", _dark: \\"hsl(210 40% 98%)\\" },\\n    },\\n  },\\n  muted: {\\n    DEFAULT: {\\n      value: { base: \\"hsl(210 40% 96.1%)\\", _dark: \\"hsl(217.2 32.6% 17.5%)\\" },\\n    },\\n    foreground: {\\n      value: {\\n        base: \\"hsl(215.4 16.3% 46.9%)\\",\\n        _dark: \\"hsl(215 20.2% 65.1%)\\",\\n      },\\n    },\\n  },\\n  accent: {\\n    DEFAULT: {\\n      value: { base: \\"hsl(210 40% 96.1%)\\", _dark: \\"hsl(217.2 32.6% 17.5%)\\" },\\n    },\\n    foreground: {\\n      value: { base: \\"hsl(222.2 47.4% 11.2%)\\", _dark: \\"hsl(210 40% 98%)\\" },\\n    },\\n  },\\n  destructive: {\\n    DEFAULT: {\\n      value: { base: \\"hsl(0 84.2% 60.2%)\\", _dark: \\"hsl(0 62.8% 30.6%)\\" },\\n    },\\n    foreground: {\\n      value: { base: \\"hsl(210 40% 98%)\\", _dark: \\"hsl(210 40% 98%)\\" },\\n    },\\n  },\\n  border: {\\n    value: {\\n      base: \\"hsl(214.3 31.8% 91.4%)\\",\\n      _dark: \\"hsl(217.2 32.6% 17.5%)\\",\\n    },\\n  },\\n  input: {\\n    value: {\\n      base: \\"hsl(214.3 31.8% 91.4%)\\",\\n      _dark: \\"hsl(217.2 32.6% 17.5%)\\",\\n    },\\n  },\\n  ring: {\\n    value: { base: \\"hsl(222.2 84% 4.9%)\\", _dark: \\"hsl(212.7 26.8% 83.9%)\\" },\\n  },\\n})\\n\\nconst borders = defineSemanticTokens.borders({\\n  base: { value: \\"1px solid {colors.border}\\" },\\n  input: { value: \\"1px solid {colors.input}\\" },\\n  primary: { value: \\"1px solid {colors.primary}\\" },\\n  destructive: { value: \\"1px solid {colors.destructive}\\" },\\n})\\n\\nexport const radius = defineSemanticTokens.radii({\\n  xl: { value: `calc({radii.radius} + 4px)` },\\n  lg: { value: `{radii.radius}` },\\n  md: { value: `calc({radii.radius} - 2px)` },\\n  sm: { value: \\"calc({radii.radius} - 4px)\\" },\\n})\\n\\nexport const defaultPreset = definePreset({\\n  name: \\"default\\",\\n  globalCss,\\n  theme: {\\n    extend: {\\n      tokens: {\\n        radii,\\n      },\\n      semanticTokens: {\\n        colors: semanticColors,\\n        radii: radius,\\n        borders: borders,\\n      },\\n    },\\n  },\\n  staticCss: {\\n    recipes: \\"*\\",\\n  },\\n})\\n"',
}

const createdFiles = ["components.json", "preset.ts"]

describe("unit 테스트", () => {
  const cwd = path.resolve(__dirname, "./fixture/init_test")
  const ts = loadTSConfig(cwd)
  test("tsconfig를 분석해서 pandacss의 generated css의 alias를 찾습니다", () => {
    expect(getStyleAlias(cwd, "/a/b/c/d", ts)).toBe("fake")
  })

  test("tsconfig를 분석해서 base alias를 찾습니다", () => {
    expect(getBaseAlias(cwd, ts)).toBe("@")
  })
})

describe("init 테스트", () => {
  const cwd = path.resolve(__dirname, "./fixture/init_test")

  afterAll(() => {
    createdFiles.forEach((file) => {
      fs.remove(path.join(cwd, file))
    })
  })

  test("root 경로에 components.json 파일이 있는지 확인합니다", async () => {
    expect(await checkJsonInit(cwd)).toBeFalsy()
  })

  test("pandaCSS 설치 상태를 확인합니다", async () => {
    expect(await checkPandaInit(cwd)).toBeTruthy()
  })

  test("cli init", async () => {
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(PRESET_TS),
        }) as Promise<Response>,
    )
    await initCommand.parseAsync(["node", "init", "-c", cwd])
    createdFiles.forEach((file) => {
      expect(fs.existsSync(path.join(cwd, file))).toBeTruthy()
    })
  })
})
