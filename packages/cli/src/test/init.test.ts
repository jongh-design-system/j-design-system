import fs from "fs-extra"
import path from "path"
import { afterAll, beforeEach, describe, expect, test } from "vitest"

import { initCommand } from "@/commands/init"
import { resolveOption } from "@/commands/init/option"
import {
  checkJsonInit,
  getBaseAlias,
  getBasePath,
  getStyleAlias,
  loadTSConfig,
} from "@/common/get-config"
import { checkPandaInit } from "@/common/get-config"

const createdFiles = [
  "components.json",
  "preset.ts",
  "panda.config.ts",
  path.join("src", "app", "styles.css"),
  path.join("src", "app", "utils", "cn.ts"),
]

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

  test("tsconfig.json의 path 설정을 기준으로 base path를 반환합니다", () => {
    // when
    const result = getBasePath(cwd, ts)
    // then
    expect(result).toBe(path.join(cwd, "src", "app"))
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

  beforeEach(() => {
    fs.removeSync(path.join(cwd, "components.json"))
    fs.removeSync(path.join(cwd, "preset.ts"))
    fs.removeSync(path.join(cwd, "src", "app", "styles.css"))
    fs.removeSync(path.join(cwd, "src", "app", "utils", "cn.ts"))
    fs.writeFileSync(path.join(cwd, "panda.config.ts"), copy, "utf-8")
  })

  afterAll(() => {
    createdFiles.forEach((file) => {
      fs.removeSync(path.join(cwd, file)) //생성된 파일 삭제
    })
    fs.writeFileSync(path.join(cwd, "panda.config.ts"), copy, "utf-8") //revert
  })

  test("resolveOption은 --yes 입력에서 기본 옵션을 채워 반환합니다", async () => {
    // when
    const options = await resolveOption({
      cwd,
      yes: true,
    })

    // then
    expect(options).toEqual({
      cwd,
      yes: true,
      style: "panda",
      primary: "neutral",
      secondary: "slate",
      gray: "gray",
    })
  })

  test("panda init은 components.json과 preset.ts를 생성하고 panda.config.ts를 수정합니다", async () => {
    // when
    await initCommand.parseAsync(["node", "init", "-c", cwd, "--yes"])

    // then
    expect(fs.existsSync(path.join(cwd, "components.json"))).toBeTruthy()
    expect(fs.existsSync(path.join(cwd, "preset.ts"))).toBeTruthy()
    expect(
      fs.existsSync(path.join(cwd, "src", "app", "styles.css")),
    ).toBeFalsy()

    expect(
      JSON.parse(fs.readFileSync(path.join(cwd, "components.json"), "utf-8")),
    ).toMatchObject({
      style: "panda",
      utils: "@/utils",
      components: "@/components",
      hooks: "@/hooks",
      styledsystem: "styled-system",
    })

    const pandaConfig = fs.readFileSync(
      path.join(cwd, "panda.config.ts"),
      "utf-8",
    )
    expect(pandaConfig).toContain("defaultPreset")
    expect(pandaConfig).toContain("panda-animation")
  })

  test("tailwind init은 base path에 styles.css를 생성하고 panda.config.ts를 요구하지 않습니다", async () => {
    fs.removeSync(path.join(cwd, "panda.config.ts"))

    // when
    await initCommand.parseAsync([
      "node",
      "init",
      "-c",
      cwd,
      "--style",
      "tailwind",
      "--primary",
      "blue",
      "--secondary",
      "emerald",
      "--gray",
      "slate",
    ])

    // then
    expect(fs.existsSync(path.join(cwd, "components.json"))).toBeTruthy()
    expect(
      fs.existsSync(path.join(cwd, "src", "app", "styles.css")),
    ).toBeTruthy()
    expect(
      fs.existsSync(path.join(cwd, "src", "app", "utils", "cn.ts")),
    ).toBeTruthy()
    expect(fs.existsSync(path.join(cwd, "preset.ts"))).toBeFalsy()
    expect(fs.existsSync(path.join(cwd, "panda.config.ts"))).toBeFalsy()

    expect(
      JSON.parse(fs.readFileSync(path.join(cwd, "components.json"), "utf-8")),
    ).toEqual({
      style: "tailwind",
      utils: "@/utils",
      components: "@/components",
      hooks: "@/hooks",
    })

    const styles = fs.readFileSync(
      path.join(cwd, "src", "app", "styles.css"),
      "utf-8",
    )
    expect(styles).toContain("var(--color-blue-600)")
    expect(styles).toContain("var(--color-emerald-700)")
    expect(styles).toContain("var(--color-slate-950)")

    const cn = fs.readFileSync(
      path.join(cwd, "src", "app", "utils", "cn.ts"),
      "utf-8",
    )
    expect(cn).toContain('from "clsx"')
    expect(cn).toContain('from "tailwind-merge"')
  })
})
