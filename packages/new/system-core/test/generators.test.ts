import { system } from "@jongh/new-system-spec"
import { describe, expect, it } from "vitest"

import { SystemArtifactGenerator } from "../src/build.ts"
import { CssGenerator } from "../src/generate/css.ts"
import { RecipeDtsGenerator } from "../src/generate/dts.ts"
import { RecipeJsGenerator } from "../src/generate/js.ts"

describe("CssGenerator", () => {
  it("generates base css with primitive, semantic and keyframe output", () => {
    const css = new CssGenerator(system).generateBaseCss()

    expect(css).toContain("--jds-primitive-color-slate-50:")
    expect(css).toContain("--jds-color-bg-surface:")
    expect(css).toContain(":root[data-theme='dark']")
    expect(css).toContain("@keyframes fade-in")
  })

  it("generates recipe css for slot recipes", () => {
    const css = new CssGenerator(system).generateAllCss()

    expect(css).toContain(".jds-avatar__root")
    expect(css).toContain(".jds-avatar__fallback--tone_accent")
  })
})

describe("Recipe generators", () => {
  it("generates runtime js for slot recipes", () => {
    const code = new RecipeJsGenerator(
      system.theme.recipes.avatar,
      system,
    ).generate()

    expect(code).toContain('from "@jongh/new-system-runtime/recipe"')
    expect(code).toContain("const avatarSlots =")
    expect(code).toContain("export const avatarVariantMap =")
    expect(code).toContain("export function avatar(props = {})")
    expect(code).toContain("splitVariantProps")
  })

  it("generates dts for slot recipes", () => {
    const dts = new RecipeDtsGenerator(system.theme.recipes.avatar).generate()

    expect(dts).toContain(
      'export declare type AvatarSlotName = "root" | "image" | "fallback"',
    )
    expect(dts).toContain(
      "export declare type AvatarVariantProps = Partial<AvatarVariant>",
    )
    expect(dts).toContain("splitVariantProps")
  })
})

describe("SystemArtifactGenerator", () => {
  it("returns the expected generated file set", () => {
    const files = new SystemArtifactGenerator(system).generateSystemFiles()
    const filePaths = new Set(files.map((file) => file.path))
    const themingFile = files.find(
      (file) => file.path === "generated/theming.js",
    )

    expect(filePaths).toContain("generated/styles/base.css")
    expect(filePaths).toContain("generated/styles/all.css")
    expect(filePaths).toContain("generated/tokens/index.js")
    expect(filePaths).toContain("generated/tokens/index.d.ts")
    expect(filePaths).toContain("generated/recipes/avatar.css")
    expect(filePaths).toContain("generated/recipes/avatar.js")
    expect(filePaths).toContain("generated/recipes/avatar.d.ts")
    expect(filePaths).toContain("generated/theming.js")
    expect(themingFile?.contents).toContain("@jongh/new-system-runtime/theme")
  })
})
