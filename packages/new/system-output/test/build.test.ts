import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"

import { afterEach, describe, expect, it } from "vitest"

import { resetCssPath } from "../../system-spec/src/reset.ts"
import { buildSystemOutput } from "../scripts/build.ts"

const tempDirs: string[] = []

afterEach(async () => {
  await Promise.all(
    tempDirs.splice(0).map((dir) =>
      fs.rm(dir, {
        force: true,
        recursive: true,
      }),
    ),
  )
})

describe("buildSystemOutput", () => {
  it("writes generated files and copies reset.css", async () => {
    const outputDir = await fs.mkdtemp(
      path.join(os.tmpdir(), "new-system-output-"),
    )
    tempDirs.push(outputDir)

    await buildSystemOutput({
      outputDir,
      resetCssPath,
    })

    const baseCss = await fs.readFile(
      path.join(outputDir, "generated/styles/base.css"),
      "utf8",
    )
    const allCss = await fs.readFile(
      path.join(outputDir, "generated/styles/all.css"),
      "utf8",
    )
    const avatarJs = await fs.readFile(
      path.join(outputDir, "generated/recipes/avatar.js"),
      "utf8",
    )
    const tokenDts = await fs.readFile(
      path.join(outputDir, "generated/tokens/index.d.ts"),
      "utf8",
    )
    const resetCss = await fs.readFile(
      path.join(outputDir, "generated/styles/reset.css"),
      "utf8",
    )
    const sourceResetCss = await fs.readFile(resetCssPath, "utf8")

    expect(baseCss).toContain("--jds-primitive-color-slate-50:")
    expect(baseCss).toContain("--jds-color-bg-surface:")
    expect(allCss).toContain(".jds-avatar__root")
    expect(avatarJs).toContain('from "../../internal/recipe.js"')
    expect(avatarJs).toContain("export function avatar(props = {})")
    expect(tokenDts).toContain("export declare type ColorTokenPath =")
    expect(resetCss).toBe(sourceResetCss)
  })
})
