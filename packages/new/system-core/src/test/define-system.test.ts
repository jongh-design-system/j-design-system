import { describe, expect, it } from "vitest"

import { defineSystem } from "../define.ts"
import {
  accentPreset,
  basePreset,
  createRecipeKindConflictSystem,
  localTheme,
} from "./fixtures/preset-system.ts"

function getColorSemanticTree(system: ReturnType<typeof defineSystem>) {
  return system.theme.semanticTokens.color
}

describe("defineSystem", () => {
  it("returns the original theme when presets are omitted", () => {
    const system = defineSystem({
      name: "no-presets",
      prefix: "jds",
      theme: basePreset,
    })

    expect(system.theme).toEqual(basePreset)
  })

  it("applies presets in declaration order", () => {
    const system = defineSystem({
      name: "preset-order",
      prefix: "jds",
      presets: [basePreset, accentPreset],
      theme: {},
    })

    expect(system.theme.primitiveTokens.color.blue[500]).toBe("accent-blue-500")
  })

  it("lets the local theme override preset values", () => {
    const system = defineSystem({
      name: "local-theme-wins",
      prefix: "jds",
      presets: [basePreset, accentPreset],
      theme: localTheme,
    })

    expect(system.theme.primitiveTokens.color.blue[500]).toBe("local-blue-500")
    expect(getColorSemanticTree(system)).toMatchObject({
      fg: {
        default: {
          light: "color.blue.500",
          dark: "color.blue.600",
        },
      },
    })
  })

  it("merges primitive token trees without replacing sibling values", () => {
    const system = defineSystem({
      name: "primitive-merge",
      prefix: "jds",
      presets: [basePreset, accentPreset],
      theme: localTheme,
    })

    expect(system.theme.primitiveTokens.color.blue[500]).toBe("local-blue-500")
    expect(system.theme.primitiveTokens.color.blue[600]).toBe("base-blue-600")
    expect(system.theme.primitiveTokens.spacing[4]).toBe("1rem")
    expect(system.theme.primitiveTokens.spacing[6]).toBe("1.5rem")
  })

  it("merges semantic token trees without replacing sibling values", () => {
    const system = defineSystem({
      name: "semantic-merge",
      prefix: "jds",
      presets: [basePreset, accentPreset],
      theme: localTheme,
    })

    expect(getColorSemanticTree(system)).toMatchObject({
      bg: {
        surface: {
          light: "color.blue.500",
          dark: "color.blue.600",
        },
        accent: {
          light: "color.blue.600",
          dark: "color.blue.500",
        },
      },
      fg: {
        default: {
          light: "color.blue.500",
          dark: "color.blue.600",
        },
      },
    })
  })

  it("merges keyframes by keyframe name", () => {
    const system = defineSystem({
      name: "keyframes-merge",
      prefix: "jds",
      presets: [basePreset, accentPreset],
      theme: localTheme,
    })

    expect(system.theme.keyframes).toMatchObject({
      "fade-in": {
        from: { opacity: "0.25" },
        to: { opacity: "1" },
      },
      "scale-in": {
        from: { transform: "scale(0.95)" },
        to: { transform: "scale(1)" },
      },
    })
  })

  it("merges single recipe definitions by field", () => {
    const system = defineSystem({
      name: "single-recipe-merge",
      prefix: "jds",
      presets: [basePreset, accentPreset],
      theme: localTheme,
    })
    const button = system.theme.recipes.button

    if ("slots" in button) {
      throw new Error("expected single recipe")
    }

    expect(button.base.backgroundColor).toBe("color.bg.accent")
    expect(button.variants.tone.accent).toEqual({
      backgroundColor: "color.bg.accent",
      color: "color.fg.default",
    })
    expect(button.defaultVariants.tone).toBe("accent")
  })

  it("merges slot recipe definitions by slot and variant key", () => {
    const system = defineSystem({
      name: "slot-recipe-merge",
      prefix: "jds",
      presets: [basePreset, accentPreset],
      theme: {},
    })
    const avatar = system.theme.recipes.avatar

    if (!("slots" in avatar)) {
      throw new Error("expected slot recipe")
    }

    expect(avatar.slots).toEqual(["root", "image", "fallback"])
    expect(avatar.base.root).toMatchObject({
      display: "inline-flex",
      backgroundColor: "color.bg.surface",
    })
    expect(avatar.base.fallback).toEqual({
      color: "color.fg.default",
    })
    expect(avatar.variants.size.md).toEqual({
      root: {
        width: "spacing.4",
        height: "spacing.4",
      },
      fallback: {
        width: "spacing.6",
      },
    })
  })

  it("preserves compound variant order across preset composition", () => {
    const system = defineSystem({
      name: "compound-variants-merge",
      prefix: "jds",
      presets: [basePreset, accentPreset],
      theme: {},
    })
    const button = system.theme.recipes.button
    const avatar = system.theme.recipes.avatar

    if ("slots" in button || !("slots" in avatar)) {
      throw new Error("unexpected recipe kinds")
    }

    expect(button.compoundVariants).toHaveLength(2)
    expect(button.compoundVariants?.[0]).toMatchObject({
      when: { tone: "neutral", size: "md" },
    })
    expect(button.compoundVariants?.[1]).toMatchObject({
      when: { tone: "accent", size: "md" },
    })
    expect(avatar.compoundVariants).toHaveLength(1)
    expect(avatar.compoundVariants?.[0]).toMatchObject({
      when: { size: "md" },
    })
  })

  it("rejects recipe merges that mix single and slot definitions", () => {
    expect(() => createRecipeKindConflictSystem()).toThrow(
      /Recipe "button" cannot merge slot and single definitions/,
    )
  })
})
