import { afterAll, beforeAll, expect, test } from "vitest"
import path from "path"
import { initTemplate } from "../init/utils/initTemplate"
import fs from "fs-extra"

beforeAll(() => {
  fs.removeSync(path.resolve(__dirname, "../fixture/config-prepared/tokens.ts"))
})

test("tokens.ts 파일이 정상적으로 생성되는지 테스트합니다", async () => {
  initTemplate(path.resolve(__dirname, "../fixture/config-prepared"))
  expect(
    fs.existsSync(
      path.resolve(__dirname, "../fixture/config-prepared/tokens.ts"),
    ),
  ).toBeTruthy()
})

afterAll(() => {
  fs.removeSync(path.resolve(__dirname, "../fixture/config-prepared/tokens.ts"))
})
