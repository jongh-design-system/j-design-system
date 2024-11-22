import type {
  RecipeConfig,
  RecipeVariantRecord,
  SlotRecipeConfig,
} from "@pandacss/dev"
import { buttonRecipe } from "./button"
import { accordionRecipe } from "./accordion"
import { sliderRecipe } from "./slider"
import { tabRecipe } from "./tab"

export const recipes: Record<
  string,
  Partial<RecipeConfig<RecipeVariantRecord>>
> = {
  button: buttonRecipe,
  slider: sliderRecipe,
  tabs: tabRecipe,
}

export const slotRecipes: Record<string, Partial<SlotRecipeConfig>> = {
  accordion: accordionRecipe,
}
