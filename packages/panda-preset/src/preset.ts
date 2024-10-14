import { definePreset } from "@pandacss/dev"
import { colors, radii, fontSizes, textStyles } from "./tokens/tokens"
import { recipes, slotRecipes } from "./recipes"
import { keyframes } from "./tokens/keyframes"

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
      keyframes,
    },
  },
})
