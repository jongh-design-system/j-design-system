import type { StyleObject, ThemeContract } from "./style.ts"

export type RecipeVariantRecord<TTheme extends ThemeContract = ThemeContract> =
  Record<string, Record<string, StyleObject<TTheme>>>

export type SlotRecipeVariantRecord<
  S extends string,
  TTheme extends ThemeContract = ThemeContract,
> = Record<string, Record<string, Partial<Record<S, StyleObject<TTheme>>>>>

export interface RecipeCompoundVariant<
  TTheme extends ThemeContract = ThemeContract,
  TWhen extends Partial<Record<string, string>> = Partial<
    Record<string, string>
  >,
> {
  when: TWhen
  css: StyleObject<TTheme>
}

export interface SlotRecipeCompoundVariant<
  S extends string,
  TTheme extends ThemeContract = ThemeContract,
  TWhen extends Partial<Record<string, string>> = Partial<
    Record<string, string>
  >,
> {
  when: TWhen
  css: Partial<Record<S, StyleObject<TTheme>>>
}

export interface RecipeDefinition<
  TTheme extends ThemeContract = ThemeContract,
  TVariants extends RecipeVariantRecord<TTheme> = RecipeVariantRecord<TTheme>,
> {
  name: string
  base: StyleObject<TTheme>
  variants: TVariants
  compoundVariants?: Array<
    RecipeCompoundVariant<
      TTheme,
      Partial<Record<keyof TVariants & string, string>>
    >
  >
  defaultVariants: Partial<Record<keyof TVariants & string, string>>
}

export interface SlotRecipeDefinition<
  S extends string = string,
  TTheme extends ThemeContract = ThemeContract,
  TVariants extends SlotRecipeVariantRecord<
    S,
    TTheme
  > = SlotRecipeVariantRecord<S, TTheme>,
> {
  name: string
  slots: readonly S[]
  base: Partial<Record<S, StyleObject<TTheme>>>
  variants: TVariants
  compoundVariants?: Array<
    SlotRecipeCompoundVariant<
      S,
      TTheme,
      Partial<Record<keyof TVariants & string, string>>
    >
  >
  defaultVariants: Partial<Record<keyof TVariants & string, string>>
}

export type AnyRecipeDefinition<TTheme extends ThemeContract = ThemeContract> =
  | RecipeDefinition<TTheme>
  | SlotRecipeDefinition<string, TTheme>

export type DeepPartial<T> =
  T extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T extends object
      ? {
          [K in keyof T]?: DeepPartial<T[K]>
        }
      : T

export type RecipeInputDefinition<
  TTheme extends ThemeContract = ThemeContract,
> =
  | DeepPartial<RecipeDefinition<TTheme>>
  | DeepPartial<SlotRecipeDefinition<string, TTheme>>

export interface KeyframeDefinition {
  from?: Record<string, string>
  to?: Record<string, string>
  [step: `${number}%`]: Record<string, string> | undefined
}

export type SystemThemeDefinition<
  TTheme extends ThemeContract = ThemeContract,
> = TTheme & {
  recipes: Record<string, AnyRecipeDefinition<TTheme>>
}

export interface SystemThemeInput<
  TTheme extends ThemeContract = ThemeContract,
> {
  primitiveTokens?: DeepPartial<TTheme["primitiveTokens"]>
  semanticTokens?: DeepPartial<TTheme["semanticTokens"]>
  recipes?: Record<string, RecipeInputDefinition<TTheme>>
  keyframes?: Record<string, DeepPartial<KeyframeDefinition>>
}

export type SystemPresetDefinition<
  TTheme extends ThemeContract = ThemeContract,
> = SystemThemeInput<TTheme>

export interface SystemConfigDefinition<
  TTheme extends ThemeContract = ThemeContract,
> {
  name: string
  prefix: string
  presets?: Array<SystemPresetDefinition<TTheme>>
  theme: SystemThemeInput<TTheme>
}

export interface SystemDefinition<
  TTheme extends ThemeContract = ThemeContract,
> {
  name: string
  prefix: string
  theme: SystemThemeDefinition<TTheme>
}
