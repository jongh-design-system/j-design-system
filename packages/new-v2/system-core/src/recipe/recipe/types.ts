import type { StyleObject } from "../../style/input.ts"

export type RecipeVariantRecord = Record<string, Record<string, StyleObject>>

export type RecipeVariantSelection<
  TVariants extends Record<string, Record<string, unknown>>,
> = Partial<{
  [TVariantName in keyof TVariants & string]: keyof TVariants[TVariantName] &
    string
}>

export interface RecipeCompoundVariant<
  TVariants extends RecipeVariantRecord = RecipeVariantRecord,
> {
  when: RecipeVariantSelection<TVariants>
  css: StyleObject
}

export interface RecipeDefinition<
  TVariants extends RecipeVariantRecord = RecipeVariantRecord,
> {
  name: string
  base: StyleObject
  variants: TVariants
  compoundVariants?: Array<RecipeCompoundVariant<TVariants>>
  defaultVariants: RecipeVariantSelection<TVariants>
}
