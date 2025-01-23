import { afterAll, beforeAll, expect, describe, test } from "vitest"
import path from "path"
import fs from "fs-extra"
import { checkJsonInit } from "../init/utils/checkJsonInit"
import { checkPandaInit } from "../init/utils/checkPandaInit"
import { getTsConfigAlias } from "../common/utils/directoryUtils"
import { init } from "../init"
import { execaCommandSync } from "execa"

const CLI_PATH = path.join(__dirname, "..")

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

const COMPONENTS_JSON = {
  utils: "@/utils",
  components: "@/components",
  hooks: "@/hooks",
  styledsystem: "@styled-system",
}

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

  test("init 함수 테스트", async () => {
    expect(await init({ cwd: temp })).toStrictEqual(COMPONENTS_JSON)
  })

  test("명령어를 입력했을 경우", async () => {
    process.chdir(temp)
    execaCommandSync(`npx tsx ${CLI_PATH} init`)
    expect(await fs.exists(path.join(temp, "components.json"))).toBeTruthy()
  })
})

// add.test.ts
