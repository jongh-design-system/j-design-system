import fs from "fs-extra"
import path from "path"
import { afterAll, describe, expect, test } from "vitest"

import { initCommand } from "@/commands/init"
import { checkJsonInit, getBaseAlias, loadTSConfig } from "@/common/get-config"

const createdFiles = ["components.json"]

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

  afterAll(() => {
    createdFiles.forEach((file) => {
      fs.removeSync(path.join(cwd, file))
    })
    // cn.ts가 생성된 utils 폴더도 정리
    fs.removeSync(path.join(cwd, "src"))
  })

  test("터미널에 @jongh/cli init을 입력하면 components.json과 cn.ts가 생성됩니다", async () => {
    // when
    await initCommand.parseAsync(["node", "init", "-c", cwd])
    // then
    expect(fs.existsSync(path.join(cwd, "components.json"))).toBeTruthy()
    expect(
      fs.existsSync(path.join(cwd, "src", "app", "utils", "cn.ts")),
    ).toBeTruthy()
  })
})
