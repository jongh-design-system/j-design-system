import { definePreset } from "@pandacss/dev"
import { colors, radii, fontSizes, textStyles } from "./tokens/helpers"
import { recipes, slotRecipes } from "./recipes"

export const preset = definePreset({
  theme: {
    extend: {
      tokens: {
        radii,
        fontSizes,
      },
      semanticTokens: {
        colors,
      },
      textStyles,
      recipes,
      slotRecipes,
    },
  },
})
