import { describe, expect, it } from "vitest"

import { validateRecipes } from "../src/validate/recipes.ts"
import { validateTokenReferences } from "../src/validate/tokens.ts"
import { testSystem } from "./fixtures/system.ts"

describe("validateTokenReferences", () => {
  it("accepts the current system spec", () => {
    expect(() => validateTokenReferences(testSystem)).not.toThrow()
  })

  it("fails when a semantic token references an unknown primitive token", () => {
    const invalidSystem = structuredClone(testSystem) as typeof testSystem
    invalidSystem.theme.semanticTokens.color.bg.surface.light =
      "color.slate.1234" as never

    expect(() => validateTokenReferences(invalidSystem)).toThrowError(
      /Unknown light semantic token reference "color\.slate\.1234" at "color\.bg\.surface"/,
    )
  })

  it("fails when a semantic token references another token family", () => {
    const invalidSystem = structuredClone(testSystem) as typeof testSystem
    invalidSystem.theme.semanticTokens.color.bg.surface.light =
      "spacing.4" as never

    expect(() => validateTokenReferences(invalidSystem)).toThrowError(
      /references a different family token "spacing\.4"/,
    )
  })
})

describe("validateRecipes", () => {
  it("accepts the current system recipes", () => {
    expect(() => validateRecipes(testSystem)).not.toThrow()
  })

  it("fails when a recipe references an unknown token", () => {
    const invalidSystem = structuredClone(testSystem) as typeof testSystem
    invalidSystem.theme.recipes.button.base.backgroundColor =
      "color.bg.ghost" as never

    expect(() => validateRecipes(invalidSystem)).toThrowError(
      /Recipe "button" references an unknown token "color\.bg\.ghost"/,
    )
  })

  it("fails when defaultVariants references a missing value", () => {
    const invalidSystem = structuredClone(testSystem) as typeof testSystem
    invalidSystem.theme.recipes.avatar.defaultVariants.size = "xl" as never

    expect(() => validateRecipes(invalidSystem)).toThrowError(
      /defaultVariants references missing value "xl" for variant "size"/,
    )
  })

  it("fails when a slot recipe defines an unknown slot", () => {
    const invalidSystem = structuredClone(testSystem) as typeof testSystem

    invalidSystem.theme.recipes.avatar.base = {
      ...invalidSystem.theme.recipes.avatar.base,
      badge: {
        color: "color.fg.default",
      },
    } as never

    expect(() => validateRecipes(invalidSystem)).toThrowError(
      /Slot recipe "avatar" base defines an unknown slot "badge"/,
    )
  })
})
