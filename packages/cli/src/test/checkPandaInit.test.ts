import { expect, test } from "vitest"
import path from "path"
import { checkPandaInit } from "../init/utils/checkPandaInit"

test("pandacss가 설치되어있는지 확인합니다", async () => {
  expect(
    await checkPandaInit(
      path.resolve(__dirname, "../fixture/panda-not-installed"),
    ),
  ).toBeFalsy()

  expect(
    await checkPandaInit(
      path.resolve(__dirname, "../fixture/panda-not-initialized"),
    ),
  ).toBeFalsy()

  expect(
    await checkPandaInit(path.resolve(__dirname, "../fixture/config-prepared")),
  ).toBeTruthy()
})
