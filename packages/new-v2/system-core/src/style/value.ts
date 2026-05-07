import type * as CSS from "csstype"

import type {
  ClosedCssValue,
  ColorValueLiteral,
  CssVarFunction,
  DimensionValue,
  LengthValue,
  TimeLiteral,
  TimingFunctionValue,
} from "./css.ts"

export type StyleAnimationValue = `animation.${string}` | CssVarFunction

export type StyleColorValue = ColorValueLiteral | `color.${string}`

export type StyleSpacingValue = DimensionValue | `spacing.${string}`

export type StyleRadiusValue =
  | ClosedCssValue<CSS.Property.BorderRadius<LengthValue>>
  | `radius.${string}`

export type StyleShadowLiteral =
  | `${LengthValue} ${LengthValue}${string}`
  | `inset ${LengthValue} ${LengthValue}${string}`

export type StyleShadowValue =
  | ClosedCssValue<CSS.Property.BoxShadow>
  | CssVarFunction
  | StyleShadowLiteral
  | `shadow.${string}`

export type StyleDurationValue =
  | ClosedCssValue<CSS.Property.AnimationDuration<TimeLiteral | CssVarFunction>>
  | `motion.duration.${string}`

export type StyleEasingValue =
  | TimingFunctionValue
  | CssVarFunction
  | `motion.easing.${string}`

export type StyleFontSizeValue =
  | ClosedCssValue<CSS.Property.FontSize<LengthValue>>
  | `fontSize.${string}`

export type StyleTextStyleValue = `textStyle.${string}`

export type StyleInputValueMap = {
  animation: StyleAnimationValue
  color: StyleColorValue
  spacing: StyleSpacingValue
  radius: StyleRadiusValue
  shadow: StyleShadowValue
  motion: {
    duration: StyleDurationValue
    easing: StyleEasingValue
  }
  fontSize: StyleFontSizeValue
  textStyle: StyleTextStyleValue
}
