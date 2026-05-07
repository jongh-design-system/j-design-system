import type { RecipeDefinition, RecipeVariantRecord } from "./recipe/types.ts"
import type {
  SlotRecipeDefinition,
  SlotRecipeVariantRecord,
} from "./slotRecipe/types.ts"

export type AnyRecipeDefinition =
  | RecipeDefinition<RecipeVariantRecord>
  | SlotRecipeDefinition<string, SlotRecipeVariantRecord<string>>

export type DeepPartial<T> =
  T extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T extends object
      ? {
          [K in keyof T]?: DeepPartial<T[K]>
        }
      : T

export type RecipeInputDefinition =
  | DeepPartial<RecipeDefinition<RecipeVariantRecord>>
  | DeepPartial<SlotRecipeDefinition<string, SlotRecipeVariantRecord<string>>>
