import path from "path"
import {
  getAbsolutePath,
  loadComponentConfig,
  loadTSConfig,
} from "../add/utils/config"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import fs from "fs-extra"

const COMPONENTS_JSON = {
  utils: "@/utils",
  components: "@/ui",
  hooks: "@/hooks",
  styledsystem: "@styled-system",
}

const TS_CONFIG = {
  compilerOptions: {
    paths: {
      "@/*": ["./src/*"],
      "@styled-system/*": ["./styled-system/*"],
      "@utils/*": ["./src/utils/*"],
    },
  },
}

describe("person", () => {
  //Given: components.json, tsconfig.json 파일이 준비되어 있다
  beforeAll(() => {
    fs.writeFile(
      path.resolve(__dirname, "../fixture/config-prepared/components.json"),
      JSON.stringify(COMPONENTS_JSON, null, 2),
      "utf-8",
    )
    fs.writeFile(
      path.resolve(__dirname, "../fixture/config-prepared/tsconfig.json"),
      JSON.stringify(TS_CONFIG, null, 2),
      "utf-8",
    )
  })

  afterAll(() => {
    fs.remove(
      path.resolve(__dirname, "../fixture/config-prepared/components.json"),
    )
    fs.remove(
      path.resolve(__dirname, "../fixture/config-prepared/tsconfig.json"),
    )
  })

  test("components.json에서 컴포넌트 경로 설정을 올바르게 로드한다", async () => {
    const config = await loadComponentConfig(
      path.resolve(__dirname, "../fixture/config-prepared"),
    )
    expect(config).toStrictEqual(COMPONENTS_JSON)
  })

  test("tsconfig.json에서 경로 별칭 설정을 올바르게 로드한다", async () => {
    const config = await loadTSConfig(
      path.resolve(__dirname, "../fixture/config-prepared"),
    )
    expect(config.paths).toStrictEqual(TS_CONFIG.compilerOptions.paths)
  })

  test("components.json과 tsconfig.json을 기반으로 실제 설치 경로를 계산한다", async () => {
    const componentPath = await getAbsolutePath(
      path.resolve(__dirname, "../fixture/config-prepared"),
    )
    expect(componentPath).toStrictEqual({
      utils: path.resolve(__dirname, "../fixture/config-prepared", "src/utils"),
      components: path.resolve(
        __dirname,
        "../fixture/config-prepared",
        "src/ui",
      ),
      hooks: path.resolve(__dirname, "../fixture/config-prepared", "src/hooks"),
    })
  })
})
