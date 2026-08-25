import fs from "fs-extra"
import path from "path"
import { afterAll, beforeEach, describe, expect, test } from "vitest"

import { initCommand } from "@/commands/init"
import { checkJsonInit, getBaseAlias, loadTSConfig } from "@/common/get-config"

describe("init에 사용되는 유틸함수 테스트", () => {
  // given
  const cwd = path.resolve(__dirname, "./fixture/init_test")
  const ts = loadTSConfig(cwd)

  test("tsconfig.json의 path 설정을 기준으로 base alias를 반환합니다", () => {
    // when
    const result = getBaseAlias(cwd, ts)
    // then
    expect(result).toBe("@")
  })

  test("root 경로에 components.json 파일이 존재하지 않는다면 false를 반환합니다", async () => {
    // when
    const result = await checkJsonInit(cwd)
    // then
    expect(result).toBeFalsy()
  })
})

describe("init 명령어 입력 테스트", () => {
  // given
  const cwd = path.join(__dirname, "./fixture/init_test")

  beforeEach(() => {
    fs.removeSync(path.join(cwd, "components.json"))
  })

  afterAll(() => {
    fs.removeSync(path.join(cwd, "components.json"))
  })

  test("init은 스타일 설정 없이 alias 기반 components.json만 생성합니다", async () => {
    // when
    await initCommand.parseAsync(["node", "init", "-c", cwd])

    // then
    expect(fs.existsSync(path.join(cwd, "components.json"))).toBeTruthy()
    expect(
      JSON.parse(fs.readFileSync(path.join(cwd, "components.json"), "utf-8")),
    ).toEqual({
      utils: "@/utils",
      components: "@/components",
      hooks: "@/hooks",
    })
  })
})
