import type { LeafPaths } from "../utils.ts"

export type TextStyleValue = string | number

export interface TextStyleDefinition {
  fontSize: TextStyleValue
  lineHeight: TextStyleValue
  fontWeight: TextStyleValue
  letterSpacing?: TextStyleValue
}

export type TextStyleGroup = {
  readonly [key: string]: TextStyleGroup | TextStyleDefinition
}

export type TextStyleReference<
  TTextStyles extends TextStyleGroup = TextStyleGroup,
> = `textStyle.${LeafPaths<TTextStyles, TextStyleDefinition>}`

export function defineTextStyles<const TTextStyles extends TextStyleGroup>(
  definition: TTextStyles,
): TTextStyles {
  return definition
}
