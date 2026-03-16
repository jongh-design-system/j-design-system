import type * as CSS from "csstype"

export type ThemeMode = "light" | "dark"

type PrimitiveKey = string | number
type KeyOf<T> = Extract<keyof T, PrimitiveKey>
type StringifyKey<T> = T extends PrimitiveKey ? `${T}` : never
type Join<Head extends string, Tail extends string> = `${Head}.${Tail}`

export interface TextStyleDefinition {
  fontSize: CSS.Property.FontSize
  lineHeight: CSS.Property.LineHeight
  fontWeight: CSS.Property.FontWeight
  letterSpacing?: CSS.Property.LetterSpacing
}

export type TypographyTree = {
  readonly [key: string]: TypographyTree | TextStyleDefinition
}

export type PrimitiveColorValue = CSS.Property.Color

export type PrimitiveSpacingValue = CSS.Property.Margin

export type PrimitiveRadiusValue = CSS.Property.BorderRadius

export type PrimitiveShadowValue = CSS.Property.BoxShadow

export type PrimitiveDurationValue = CSS.Property.TransitionDuration

export type PrimitiveEasingValue = CSS.Property.TransitionTimingFunction

export interface PrimitiveTokensDefinition {
  color: Record<string, Record<string | number, PrimitiveColorValue>>
  spacing: Record<string | number, PrimitiveSpacingValue>
  radius: Record<string, PrimitiveRadiusValue>
  typography: TypographyTree
  shadow: Record<string, PrimitiveShadowValue>
  motion: {
    duration: Record<string, PrimitiveDurationValue>
    easing: Record<string, PrimitiveEasingValue>
  }
}

export type TokenFamilyName<
  TPrimitiveTokens extends
    PrimitiveTokensDefinition = PrimitiveTokensDefinition,
> = Extract<keyof TPrimitiveTokens, string>

type PrimitiveLeafByFamily<
  TPrimitiveTokens extends PrimitiveTokensDefinition,
  TFamily extends TokenFamilyName<TPrimitiveTokens>,
> = TFamily extends "typography" ? TextStyleDefinition : string

export type LeafPaths<T, Leaf> = T extends object
  ? {
      [K in KeyOf<T>]: T[K] extends Leaf
        ? StringifyKey<K>
        : T[K] extends object
          ? Join<StringifyKey<K>, LeafPaths<T[K], Leaf>>
          : never
    }[KeyOf<T>]
  : never

export type PrimitiveFamilyPath<
  TPrimitiveTokens extends PrimitiveTokensDefinition,
  TFamily extends TokenFamilyName<TPrimitiveTokens>,
> = `${TFamily}.${LeafPaths<
  TPrimitiveTokens[TFamily],
  PrimitiveLeafByFamily<TPrimitiveTokens, TFamily>
>}`

export type PrimitiveTokenPath<
  TPrimitiveTokens extends PrimitiveTokensDefinition,
> = {
  [TFamily in TokenFamilyName<TPrimitiveTokens>]: PrimitiveFamilyPath<
    TPrimitiveTokens,
    TFamily
  >
}[TokenFamilyName<TPrimitiveTokens>]

export type SemanticTokenNode<
  TReference extends string,
  TMode extends string = ThemeMode,
> = Readonly<Record<TMode, TReference>>

export type SemanticTokenTree<
  TReference extends string,
  TMode extends string = ThemeMode,
> = {
  readonly [key: string]:
    | SemanticTokenTree<TReference, TMode>
    | SemanticTokenNode<TReference, TMode>
}

export type SemanticTokensDefinition<
  TPrimitiveTokens extends PrimitiveTokensDefinition,
  TMode extends string = ThemeMode,
> = Partial<{
  [TFamily in TokenFamilyName<TPrimitiveTokens>]: SemanticTokenTree<
    PrimitiveFamilyPath<TPrimitiveTokens, TFamily>,
    TMode
  >
}>
