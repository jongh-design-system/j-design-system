import { describe, expect, it } from "vitest"

import { SystemArtifactGenerator } from "../build.ts"
import { CssGenerator } from "../generate/css.ts"
import { RecipeDtsGenerator } from "../generate/dts.ts"
import { RecipeJsGenerator } from "../generate/js.ts"
import { presetTestSystem } from "./fixtures/preset-system.ts"
import { testSystem } from "./fixtures/system.ts"

describe("CssGenerator", () => {
  it("generates base css with primitive, semantic and keyframe output", () => {
    const css = new CssGenerator(testSystem).generateBaseCss()

    expect(css).toContain("--jds-primitive-color-slate-50:")
    expect(css).toContain("--jds-color-bg-surface:")
    expect(css).toContain(":root[data-theme='dark']")
    expect(css).toContain("@keyframes fade-in")
  })

  it("generates recipe css for slot recipes", () => {
    const css = new CssGenerator(testSystem).generateAllCss()

    expect(css).toContain(".jds-avatar__root")
    expect(css).toContain(".jds-avatar__fallback--tone_accent")
  })

  it("generates layered css for base and recipes", () => {
    const generator = new CssGenerator(testSystem)

    expect(generator.generateLayeredBaseCss()).toContain("@layer jds-base")
    expect(generator.generateLayeredBaseCss()).toContain(
      "--jds-primitive-color-slate-50:",
    )
    expect(
      generator.generateLayeredRecipeCss(testSystem.theme.recipes.avatar),
    ).toContain("@layer jds-components")
    expect(
      generator.generateLayeredRecipeCss(testSystem.theme.recipes.avatar),
    ).toContain(".jds-avatar__root")
    expect(generator.generateLayeredAllCss()).toContain("@layer jds-base")
    expect(generator.generateLayeredAllCss()).toContain("@layer jds-components")
  })

  it("emits preset-composed token values and keyframes in base css", () => {
    const css = new CssGenerator(presetTestSystem).generateBaseCss()

    expect(css).toContain("--jds-primitive-color-blue-500: local-blue-500;")
    expect(css).toContain("--jds-color-bg-accent:")
    expect(css).toContain("@keyframes scale-in")
  })
})

describe("Recipe generators", () => {
  it("generates runtime js for slot recipes", () => {
    const code = new RecipeJsGenerator(
      testSystem.theme.recipes.avatar,
      testSystem,
    ).generate()

    expect(code).toContain('from "../../internal/recipe.js"')
    expect(code).toContain("const avatarSlots =")
    expect(code).toContain("export const avatarVariantMap =")
    expect(code).toContain("export function avatar(props = {})")
    expect(code).toContain("splitVariantProps")
  })

  it("generates dts for slot recipes", () => {
    const dts = new RecipeDtsGenerator(
      testSystem.theme.recipes.avatar,
    ).generate()

    expect(dts).toContain(
      'export declare type AvatarSlotName = "root" | "image" | "fallback"',
    )
    expect(dts).toContain(
      "export declare type AvatarVariantProps = Partial<AvatarVariant>",
    )
    expect(dts).toContain("splitVariantProps")
  })

  it("emits merged default variants in recipe runtime js", () => {
    const code = new RecipeJsGenerator(
      presetTestSystem.theme.recipes.button,
      presetTestSystem,
    ).generate()

    expect(code).toContain('"tone": "accent"')
    expect(code).toContain('"size": "md"')
  })
})

describe("SystemArtifactGenerator", () => {
  it("returns the expected generated file set", () => {
    const files = new SystemArtifactGenerator(testSystem).generateSystemFiles()
    const filePaths = new Set(files.map((file) => file.path))
    expect(filePaths).toContain("generated/styles/base.css")
    expect(filePaths).toContain("generated/styles/all.css")
    expect(filePaths).toContain("generated/styles/base.layered.css")
    expect(filePaths).toContain("generated/styles/all.layered.css")
    expect(filePaths).toContain("generated/tokens/index.js")
    expect(filePaths).toContain("generated/tokens/index.d.ts")
    expect(filePaths).toContain("generated/recipes/avatar.css")
    expect(filePaths).toContain("generated/recipes/avatar.layered.css")
    expect(filePaths).toContain("generated/recipes/avatar.js")
    expect(filePaths).toContain("generated/recipes/avatar.d.ts")
  })
})
