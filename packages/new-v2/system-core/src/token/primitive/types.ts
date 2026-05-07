import type * as CSS from "csstype"

import type { LeafPaths, TokenGroup } from "../utils.ts"

interface PrimitiveTokenFamilyMap {
  color: TokenGroup<CSS.Property.Color>
  spacing: TokenGroup<CSS.Property.Margin>
  radius: TokenGroup<CSS.Property.BorderRadius>
  shadow: TokenGroup<CSS.Property.BoxShadow>
  motion: {
    duration: TokenGroup<CSS.Property.TransitionDuration>
    easing: TokenGroup<CSS.Property.TransitionTimingFunction>
  }
  fontSize: TokenGroup<CSS.Property.FontSize>
  fontWeight: TokenGroup<CSS.Property.FontWeight>
  lineHeight: TokenGroup<CSS.Property.LineHeight>
  letterSpacing: TokenGroup<CSS.Property.LetterSpacing>
}

export type PrimitiveTokensDefinition = Partial<PrimitiveTokenFamilyMap>

export type TokenFamilyName<
  TPrimitiveTokens extends PrimitiveTokensDefinition =
    PrimitiveTokensDefinition,
> = keyof TPrimitiveTokens & string

export type PrimitiveFamilyPath<
  TPrimitiveTokens extends PrimitiveTokensDefinition,
  TFamily extends TokenFamilyName<TPrimitiveTokens>,
> = `${TFamily}.${LeafPaths<NonNullable<TPrimitiveTokens[TFamily]>, string>}`

export type PrimitiveTokenPath<
  TPrimitiveTokens extends PrimitiveTokensDefinition,
> = {
  [TFamily in TokenFamilyName<TPrimitiveTokens>]: PrimitiveFamilyPath<
    TPrimitiveTokens,
    TFamily
  >
}[TokenFamilyName<TPrimitiveTokens>]
