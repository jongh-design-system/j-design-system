import { afterAll, beforeAll, expect, describe, test } from "vitest"
import path from "path"
import fs from "fs-extra"
import { checkJsonInit } from "../init/utils/checkJsonInit"
import { checkPandaInit } from "../init/utils/checkPandaInit"
import { initTemplate } from "../init/utils/initTemplate"

const COMPONENTS_JSON = {
  utils: "@/utils",
  components: "@/ui",
  hooks: "@/hooks",
  styledsystem: "@styled-system",
}

describe("설정 초기화 테스트", () => {
  const CONFIG_PREPARED_PATH = path.resolve(
    __dirname,
    "../fixture/config-prepared",
  )
  const TOKENS_PATH = path.resolve(CONFIG_PREPARED_PATH, "tokens.ts")
  const JSON_PATH = path.resolve(CONFIG_PREPARED_PATH, "components.json")

  beforeAll(() => {
    // 테스트 시작 전 tokens.ts 파일이 있다면 제거
    fs.writeFile(JSON_PATH, JSON.stringify(COMPONENTS_JSON, null, 2), "utf-8")
  })

  afterAll(() => {
    // 테스트 완료 후 tokens.ts 파일 정리
    fs.remove(TOKENS_PATH)
    fs.remove(path.resolve(CONFIG_PREPARED_PATH, "components.json"))
  })

  test("root 경로에 components.json 파일이 있는지 확인합니다", async () => {
    expect(await checkJsonInit(CONFIG_PREPARED_PATH)).toBeTruthy()
  })

  test("PandaCSS 설치 상태를 확인합니다", async () => {
    // 설치되지 않은 경우
    expect(
      await checkPandaInit(
        path.resolve(__dirname, "../fixture/panda-not-installed"),
      ),
    ).toBeFalsy()

    // 초기화되지 않은 경우
    expect(
      await checkPandaInit(
        path.resolve(__dirname, "../fixture/panda-not-initialized"),
      ),
    ).toBeFalsy()

    // 정상 설치된 경우
    expect(await checkPandaInit(CONFIG_PREPARED_PATH)).toBeTruthy()
  })

  test("tokens.ts 파일이 정상적으로 생성되는지 테스트합니다", async () => {
    initTemplate(CONFIG_PREPARED_PATH)
    expect(fs.existsSync(TOKENS_PATH)).toBeTruthy()
  })
})
