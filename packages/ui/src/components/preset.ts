import { definePreset } from "@pandacss/dev"
import { buttonRecipe } from "./Button/style"
import { tagButtonRecipe } from "./TagButton/style"

export const preset = definePreset({
  theme: {
    recipes: {
      button: buttonRecipe,
      tagButton: tagButtonRecipe,
    },
  },
})
