import type { StyleObject } from "../../style/input.ts"
import type {
  SlotRecipeCompoundVariant,
  SlotRecipeVariantRecord,
  SlotRecipeVariantSelection,
} from "./types.ts"

type SlotRecipeDefinitionInput<
  TName extends string,
  TSlots extends readonly string[],
  TBase extends Partial<Record<TSlots[number], StyleObject>>,
  TVariants extends SlotRecipeVariantRecord<TSlots[number]>,
  TDefaultVariants extends SlotRecipeVariantSelection<TVariants>,
  TCompoundVariants extends
    | Array<SlotRecipeCompoundVariant<TSlots[number], TVariants>>
    | undefined,
> = {
  name: TName
  slots: TSlots
  base: TBase
  variants: TVariants
  compoundVariants?: TCompoundVariants
  defaultVariants: TDefaultVariants
}

export function defineSlotRecipe<
  const TName extends string,
  const TSlots extends readonly string[],
  const TBase extends Partial<Record<TSlots[number], StyleObject>>,
  const TVariants extends SlotRecipeVariantRecord<TSlots[number]>,
  const TDefaultVariants extends SlotRecipeVariantSelection<NoInfer<TVariants>>,
  const TCompoundVariants extends
    | Array<SlotRecipeCompoundVariant<TSlots[number], NoInfer<TVariants>>>
    | undefined = undefined,
>(
  definition: SlotRecipeDefinitionInput<
    TName,
    TSlots,
    TBase,
    TVariants,
    TDefaultVariants,
    TCompoundVariants
  >,
): SlotRecipeDefinitionInput<
  TName,
  TSlots,
  TBase,
  TVariants,
  TDefaultVariants,
  TCompoundVariants
> {
  return definition
}
