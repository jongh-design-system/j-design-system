import type { StyleObject } from "../../style/input.ts"
import type {
  RecipeCompoundVariant,
  RecipeVariantRecord,
  RecipeVariantSelection,
} from "./types.ts"

type RecipeDefinitionInput<
  TName extends string,
  TBase extends StyleObject,
  TVariants extends RecipeVariantRecord,
  TDefaultVariants extends RecipeVariantSelection<TVariants>,
  TCompoundVariants extends Array<RecipeCompoundVariant<TVariants>> | undefined,
> = {
  name: TName
  base: TBase
  variants: TVariants
  compoundVariants?: TCompoundVariants
  defaultVariants: TDefaultVariants
}

export function defineRecipe<
  const TName extends string,
  const TBase extends StyleObject,
  const TVariants extends RecipeVariantRecord,
  const TDefaultVariants extends RecipeVariantSelection<NoInfer<TVariants>>,
  const TCompoundVariants extends
    | Array<RecipeCompoundVariant<NoInfer<TVariants>>>
    | undefined = undefined,
>(
  definition: RecipeDefinitionInput<
    TName,
    TBase,
    TVariants,
    TDefaultVariants,
    TCompoundVariants
  >,
): RecipeDefinitionInput<
  TName,
  TBase,
  TVariants,
  TDefaultVariants,
  TCompoundVariants
> {
  return definition
}
