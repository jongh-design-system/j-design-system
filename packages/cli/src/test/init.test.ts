import fs from "fs-extra"
import path from "path"
import { afterAll, describe, expect, test } from "vitest"

import { initCommand } from "@/commands/init"
import {
  checkJsonInit,
  getBaseAlias,
  getStyleAlias,
  loadTSConfig,
} from "@/common/get-config"
import { checkPandaInit } from "@/common/get-config"

const createdFiles = ["components.json", "preset.ts", "panda.config.ts"]

describe("init에 사용되는 유틸함수 테스트", () => {
  // given
  const cwd = path.resolve(__dirname, "./fixture/init_test")
  const ts = loadTSConfig(cwd)

  test("tsconfig.json의 path 설정을 기준으로 주어진 경로의 alias를 반환합니다", () => {
    // when
    const result = getStyleAlias(cwd, "/a/b/c/d", ts)
    // then
    expect(result).toBe("fake")
  })

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

  test("root 경로에 panda.config.* 파일이 존재한다면 true를 반환합니다", async () => {
    // when
    const result = await checkPandaInit(cwd)
    // then
    expect(result).toBeTruthy()
  })
})

describe("init 명령어 입력 테스트", () => {
  // given
  const cwd = path.join(__dirname, "./fixture/init_test")
  const copy = fs.readFileSync(path.join(cwd, "panda.config.ts"))

  afterAll(() => {
    createdFiles.forEach((file) => {
      fs.removeSync(path.join(cwd, file)) //생성된 파일 삭제
    })
    fs.writeFileSync(path.join(cwd, "panda.config.ts"), copy, "utf-8") //revert
  })

  test("터미널에 @jongh/cli init을 입력하면 components.json과 preset.ts파일이 생성됩니다", async () => {
    // when
    await initCommand.parseAsync(["node", "init", "-c", cwd, "-d"])
    // then
    createdFiles.forEach((file) => {
      expect(fs.existsSync(path.join(cwd, file))).toBeTruthy()
    })
  })
})
