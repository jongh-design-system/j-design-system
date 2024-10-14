import type {
  RecipeConfig,
  RecipeVariantRecord,
  SlotRecipeConfig,
} from "@pandacss/dev"
import { buttonRecipe } from "./button"
import { accordionRecipe } from "./accordion"

export const recipes: Record<
  string,
  Partial<RecipeConfig<RecipeVariantRecord>>
> = {
  button: buttonRecipe,
}

export const slotRecipes: Record<string, Partial<SlotRecipeConfig>> = {
  accordion: accordionRecipe,
}
