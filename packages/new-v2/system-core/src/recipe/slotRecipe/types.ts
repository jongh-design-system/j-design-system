import type { StyleObject } from "../../style/input.ts"

export type SlotRecipeVariantRecord<TSlotName extends string> = Record<
  string,
  Record<string, Partial<Record<TSlotName, StyleObject>>>
>

export type SlotRecipeVariantSelection<
  TVariants extends Record<string, Record<string, unknown>>,
> = Partial<{
  [TVariantName in keyof TVariants & string]: keyof TVariants[TVariantName] &
    string
}>

export interface SlotRecipeCompoundVariant<
  TSlotName extends string,
  TVariants extends SlotRecipeVariantRecord<TSlotName> =
    SlotRecipeVariantRecord<TSlotName>,
> {
  when: SlotRecipeVariantSelection<TVariants>
  css: Partial<Record<TSlotName, StyleObject>>
}

export interface SlotRecipeDefinition<
  TSlotName extends string,
  TVariants extends SlotRecipeVariantRecord<TSlotName> =
    SlotRecipeVariantRecord<TSlotName>,
> {
  name: string
  slots: readonly TSlotName[]
  base: Partial<Record<TSlotName, StyleObject>>
  variants: TVariants
  compoundVariants?: Array<SlotRecipeCompoundVariant<TSlotName, TVariants>>
  defaultVariants: SlotRecipeVariantSelection<TVariants>
}
