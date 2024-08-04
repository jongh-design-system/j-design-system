import { definePreset } from "@pandacss/dev"
import { buttonRecipe } from "./Button/style"
import { tagButtonRecipe } from "./TagButton/style"
import { accordionRecipe } from "./Accordion/style"
import { tabRecipe } from "./Tab/style"

export const preset = definePreset({
  theme: {
    recipes: {
      button: buttonRecipe,
      tagButton: tagButtonRecipe,
      accordion: accordionRecipe,
      tab: tabRecipe,
    },
  },
})
