import { checkJsonInit } from "../init/utils/checkJsonInit"
import { expect, test } from "vitest"
import path from "path"

test("root 경로에 components.json 파일이 있는지 확인합니다", async () => {
  expect(
    await checkJsonInit(path.resolve(__dirname, "../fixture/config-prepared")),
  ).toBeTruthy()
})
