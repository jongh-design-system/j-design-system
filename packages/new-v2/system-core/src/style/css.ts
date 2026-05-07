import type * as CSS from "csstype"

export type ClosedCssValue<TValue> = TValue extends string
  ? string extends TValue
    ? never
    : TValue
  : TValue

export type CssVarFunction = `var(--${string})`
export type CssMathFunction =
  | `calc(${string})`
  | `min(${string})`
  | `max(${string})`
  | `clamp(${string})`
export type CssUrlFunction = `url(${string})`
export type CssQuotedString = `"${string}"` | `'${string}'`
export type CssHexColor = `#${string}`
export type CssColorFunction =
  | `rgb(${string})`
  | `rgba(${string})`
  | `hsl(${string})`
  | `hsla(${string})`
  | `oklch(${string})`
export type TimeLiteral = `${number}ms` | `${number}s`
export type NumberLiteral = `${number}`
export type LengthLiteral =
  | `${number}px`
  | `${number}rem`
  | `${number}em`
  | `${number}%`
  | `${number}vh`
  | `${number}vw`
  | `${number}dvh`
  | `${number}dvw`
  | `${number}ch`
export type ZeroLiteral = "0"

export type NumberValue = number | NumberLiteral
export type LengthValue =
  | ZeroLiteral
  | LengthLiteral
  | CssVarFunction
  | CssMathFunction
export type DimensionValue = ClosedCssValue<CSS.Property.Width<LengthValue>>
export type ColorValueLiteral =
  | ClosedCssValue<CSS.Property.Color>
  | CssHexColor
  | CssColorFunction
  | CssVarFunction
export type TimingFunctionValue =
  | ClosedCssValue<CSS.Property.AnimationTimingFunction>
  | `cubic-bezier(${string})`
  | `steps(${string})`
