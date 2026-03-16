import type {
  LeafPaths,
  PrimitiveFamilyPath,
  PrimitiveTokensDefinition,
  SemanticTokenNode,
  SemanticTokensDefinition,
  TextStyleDefinition,
  TokenFamilyName,
} from "./tokens.ts"

type ThemeFamilyName<TTheme extends ThemeContract> = TokenFamilyName<
  TTheme["primitiveTokens"]
>

type FamilyKey<
  TTheme extends ThemeContract,
  TFamily extends keyof PrimitiveTokensDefinition & string,
> = Extract<TFamily, ThemeFamilyName<TTheme>>

type SemanticFamilyTree<
  TTheme extends ThemeContract,
  TFamily extends ThemeFamilyName<TTheme>,
> = TFamily extends keyof TTheme["semanticTokens"]
  ? Exclude<TTheme["semanticTokens"][TFamily], undefined>
  : never

export interface ThemeContract {
  primitiveTokens: PrimitiveTokensDefinition
  semanticTokens: SemanticTokensDefinition<PrimitiveTokensDefinition>
  keyframes?: Record<string, unknown>
}

export type PrimitiveTokenPathByFamily<
  TTheme extends ThemeContract,
  TFamily extends ThemeFamilyName<TTheme>,
> = PrimitiveFamilyPath<TTheme["primitiveTokens"], TFamily>

export type SemanticTokenPathByFamily<
  TTheme extends ThemeContract,
  TFamily extends ThemeFamilyName<TTheme>,
> = [SemanticFamilyTree<TTheme, TFamily>] extends [never]
  ? never
  : `${TFamily}.${LeafPaths<
      SemanticFamilyTree<TTheme, TFamily>,
      SemanticTokenNode<string>
    >}`

export type TokenPathByFamily<
  TTheme extends ThemeContract,
  TFamily extends ThemeFamilyName<TTheme>,
> =
  | PrimitiveTokenPathByFamily<TTheme, TFamily>
  | SemanticTokenPathByFamily<TTheme, TFamily>

export type PrimitiveColorTokenPath<TTheme extends ThemeContract> =
  PrimitiveTokenPathByFamily<TTheme, FamilyKey<TTheme, "color">>

export type SemanticColorTokenPath<TTheme extends ThemeContract> =
  SemanticTokenPathByFamily<TTheme, FamilyKey<TTheme, "color">>

export type PaletteTokenPath<TTheme extends ThemeContract> =
  PrimitiveColorTokenPath<TTheme>

export type ColorTokenPath<TTheme extends ThemeContract> = TokenPathByFamily<
  TTheme,
  FamilyKey<TTheme, "color">
>

export type SpacingTokenPath<TTheme extends ThemeContract> = TokenPathByFamily<
  TTheme,
  FamilyKey<TTheme, "spacing">
>

export type RadiusTokenPath<TTheme extends ThemeContract> = TokenPathByFamily<
  TTheme,
  FamilyKey<TTheme, "radius">
>

export type ShadowTokenPath<TTheme extends ThemeContract> = TokenPathByFamily<
  TTheme,
  FamilyKey<TTheme, "shadow">
>

export type MotionTokenPath<TTheme extends ThemeContract> = TokenPathByFamily<
  TTheme,
  FamilyKey<TTheme, "motion">
>

export type MotionDurationTokenPath<TTheme extends ThemeContract> = Extract<
  MotionTokenPath<TTheme>,
  `motion.duration.${string}`
>

export type MotionEasingTokenPath<TTheme extends ThemeContract> = Extract<
  MotionTokenPath<TTheme>,
  `motion.easing.${string}`
>

export type TypographyTokenPath<TTheme extends ThemeContract> =
  TokenPathByFamily<TTheme, FamilyKey<TTheme, "typography">>

export type KeyframeName<TTheme extends ThemeContract> =
  TTheme["keyframes"] extends Record<string, unknown>
    ? Extract<keyof TTheme["keyframes"], string>
    : never

type CssVarFunction = `var(--${string})`
type CssMathFunction =
  | `calc(${string})`
  | `min(${string})`
  | `max(${string})`
  | `clamp(${string})`
type CssUrlFunction = `url(${string})`
type CssQuotedString = `"${string}"` | `'${string}'`
type HexColor = `#${string}`
type FunctionalColor =
  | `rgb(${string})`
  | `rgba(${string})`
  | `hsl(${string})`
  | `hsla(${string})`
  | `oklch(${string})`
type TimeLiteral = `${number}ms` | `${number}s`
type NumberLiteral = `${number}`
type LengthLiteral =
  | `${number}px`
  | `${number}rem`
  | `${number}em`
  | `${number}%`
  | `${number}vh`
  | `${number}vw`
  | `${number}dvh`
  | `${number}dvw`
  | `${number}ch`
type ZeroLiteral = "0"

type ColorLiteral =
  | HexColor
  | FunctionalColor
  | CssVarFunction
  | "transparent"
  | "currentColor"
  | "inherit"
  | "black"
  | "white"

type DimensionLiteral =
  | ZeroLiteral
  | "auto"
  | "fit-content"
  | "min-content"
  | "max-content"
  | LengthLiteral
  | CssVarFunction
  | CssMathFunction

type BorderStyleLiteral = "none" | "solid" | "dashed" | "dotted" | "double"
type BorderWidthLiteral =
  | ZeroLiteral
  | LengthLiteral
  | CssVarFunction
  | CssMathFunction
type BorderLiteral =
  | "none"
  | `${BorderWidthLiteral} ${BorderStyleLiteral} ${ColorLiteral}`
type OutlineLiteral =
  | "none"
  | `${BorderWidthLiteral} ${BorderStyleLiteral} ${ColorLiteral}`
type ShadowLiteral =
  | "none"
  | CssVarFunction
  | `0 ${string}`
  | `${number}px ${string}`
  | `inset ${string}`
type TimingFunctionLiteral =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | `cubic-bezier(${string})`
  | `steps(${string})`
type TransformLiteral =
  | "none"
  | `translate(${string})`
  | `translateX(${string})`
  | `translateY(${string})`
  | `rotate(${string})`
  | `scale(${string})`
  | `scaleX(${string})`
  | `scaleY(${string})`
type TransitionPropertyName =
  | "all"
  | "background-color"
  | "border-color"
  | "box-shadow"
  | "color"
  | "opacity"
  | "transform"
type TransitionPropertyLiteral =
  | TransitionPropertyName
  | `${TransitionPropertyName}, ${string}`
type TransitionLiteral =
  | `${TransitionPropertyName} ${TimeLiteral}`
  | `${TransitionPropertyName} ${TimeLiteral} ${TimingFunctionLiteral}`
type DisplayLiteral =
  | "block"
  | "flex"
  | "grid"
  | "inline-block"
  | "inline-flex"
  | "none"
type PositionLiteral = "absolute" | "fixed" | "relative" | "static" | "sticky"
type OverflowLiteral = "auto" | "clip" | "hidden" | "scroll" | "visible"
type CursorLiteral = "default" | "not-allowed" | "pointer" | "text" | "wait"
type PointerEventsLiteral = "auto" | "none"
type VisibilityLiteral = "hidden" | "visible"
type WhiteSpaceLiteral = "normal" | "nowrap" | "pre" | "pre-wrap"
type FlexDirectionLiteral = "column" | "column-reverse" | "row" | "row-reverse"
type AlignItemsLiteral =
  | "baseline"
  | "center"
  | "flex-end"
  | "flex-start"
  | "stretch"
type JustifyContentLiteral =
  | "center"
  | "flex-end"
  | "flex-start"
  | "space-between"
type ObjectFitLiteral = "contain" | "cover" | "fill" | "none" | "scale-down"
type UserSelectLiteral = "auto" | "none" | "text"
type TouchActionLiteral = "auto" | "none" | "pan-x" | "pan-y"
type AppearanceLiteral = "auto" | "none"
type BackgroundRepeatLiteral = "no-repeat" | "repeat" | "repeat-x" | "repeat-y"
type BackgroundPositionLiteral = "bottom" | "center" | "left" | "right" | "top"
type AnimationFillModeLiteral = "backwards" | "both" | "forwards" | "none"
type TextDecorationLiteral = "line-through" | "none" | "overline" | "underline"
type BoxSizingLiteral = "border-box" | "content-box"
type ColorSchemeLiteral = "dark" | "light" | "light dark" | "normal"
type FontFamilyLiteral =
  | CssVarFunction
  | CssQuotedString
  | `${string}, ${string}`
  | "inherit"

type NumberValue = number | NumberLiteral

type ColorValue<TTheme extends ThemeContract> =
  | ColorTokenPath<TTheme>
  | ColorLiteral

type SpaceValue<TTheme extends ThemeContract> =
  | SpacingTokenPath<TTheme>
  | DimensionLiteral

type BorderWidthValue = BorderWidthLiteral

type RadiusValue<TTheme extends ThemeContract> =
  | RadiusTokenPath<TTheme>
  | DimensionLiteral

type ShadowValue<TTheme extends ThemeContract> =
  | ShadowTokenPath<TTheme>
  | ShadowLiteral

type DurationValue<TTheme extends ThemeContract> =
  | MotionDurationTokenPath<TTheme>
  | TimeLiteral

type EasingValue<TTheme extends ThemeContract> =
  | MotionEasingTokenPath<TTheme>
  | TimingFunctionLiteral

type TypographyValue<TTheme extends ThemeContract> = TypographyTokenPath<TTheme>

type AnimationNameValue<TTheme extends ThemeContract> =
  | KeyframeName<TTheme>
  | "none"
  | CssVarFunction

export interface StyleValueMap<TTheme extends ThemeContract> {
  alignItems: AlignItemsLiteral
  animationDuration: DurationValue<TTheme>
  animationFillMode: AnimationFillModeLiteral
  animationName: AnimationNameValue<TTheme>
  animationTimingFunction: EasingValue<TTheme>
  appearance: AppearanceLiteral
  backgroundColor: ColorValue<TTheme>
  backgroundImage: CssUrlFunction | "none" | CssVarFunction
  backgroundPosition: BackgroundPositionLiteral
  backgroundRepeat: BackgroundRepeatLiteral
  border: BorderLiteral
  borderBottomColor: ColorValue<TTheme>
  borderBottomStyle: BorderStyleLiteral
  borderBottomWidth: BorderWidthValue
  borderColor: ColorValue<TTheme>
  borderRadius: RadiusValue<TTheme>
  borderStyle: BorderStyleLiteral
  borderWidth: BorderWidthValue
  bottom: SpaceValue<TTheme>
  boxShadow: ShadowValue<TTheme>
  boxSizing: BoxSizingLiteral
  color: ColorValue<TTheme>
  colorScheme: ColorSchemeLiteral
  content: CssQuotedString
  cursor: CursorLiteral
  display: DisplayLiteral
  flex: NumberValue | "auto" | "none"
  flexDirection: FlexDirectionLiteral
  flexGrow: NumberValue
  flexShrink: NumberValue
  fontFamily: FontFamilyLiteral
  fontWeight: NumberValue | "bold" | "normal"
  gap: SpaceValue<TTheme>
  height: SpaceValue<TTheme>
  inset: SpaceValue<TTheme>
  justifyContent: JustifyContentLiteral
  left: SpaceValue<TTheme>
  lineHeight: NumberValue | LengthLiteral | CssVarFunction
  margin: SpaceValue<TTheme>
  marginBlock: SpaceValue<TTheme>
  marginBottom: SpaceValue<TTheme>
  marginInline: SpaceValue<TTheme>
  marginLeft: SpaceValue<TTheme>
  marginRight: SpaceValue<TTheme>
  marginTop: SpaceValue<TTheme>
  maskImage: CssUrlFunction | "none" | CssVarFunction
  maskPosition: BackgroundPositionLiteral
  maskRepeat: BackgroundRepeatLiteral
  maxHeight: SpaceValue<TTheme>
  maxWidth: SpaceValue<TTheme>
  minHeight: SpaceValue<TTheme>
  minWidth: SpaceValue<TTheme>
  objectFit: ObjectFitLiteral
  opacity: NumberValue
  outline: OutlineLiteral
  outlineOffset: DimensionLiteral
  overflow: OverflowLiteral
  padding: SpaceValue<TTheme>
  paddingBlock: SpaceValue<TTheme>
  paddingBottom: SpaceValue<TTheme>
  paddingInline: SpaceValue<TTheme>
  paddingLeft: SpaceValue<TTheme>
  paddingRight: SpaceValue<TTheme>
  paddingTop: SpaceValue<TTheme>
  pointerEvents: PointerEventsLiteral
  position: PositionLiteral
  right: SpaceValue<TTheme>
  textDecoration: TextDecorationLiteral
  textStyle: TypographyValue<TTheme>
  top: SpaceValue<TTheme>
  touchAction: TouchActionLiteral
  transform: TransformLiteral | CssVarFunction
  transition: TransitionLiteral
  transitionDuration: DurationValue<TTheme>
  transitionProperty: TransitionPropertyLiteral
  transitionTimingFunction: EasingValue<TTheme>
  userSelect: UserSelectLiteral
  visibility: VisibilityLiteral
  whiteSpace: WhiteSpaceLiteral
  width: SpaceValue<TTheme>
  zIndex: NumberValue
}

export type StyleProperty = keyof StyleValueMap<ThemeContract> & string

export const styleTokenPropertyGroups = {
  color: ["backgroundColor", "borderBottomColor", "borderColor", "color"],
  spacing: [
    "bottom",
    "gap",
    "height",
    "inset",
    "left",
    "margin",
    "marginBlock",
    "marginBottom",
    "marginInline",
    "marginLeft",
    "marginRight",
    "marginTop",
    "maxHeight",
    "maxWidth",
    "minHeight",
    "minWidth",
    "padding",
    "paddingBlock",
    "paddingBottom",
    "paddingInline",
    "paddingLeft",
    "paddingRight",
    "paddingTop",
    "right",
    "top",
    "width",
  ],
  radius: ["borderRadius"],
  shadow: ["boxShadow"],
  motionDuration: ["animationDuration", "transitionDuration"],
  motionEasing: ["animationTimingFunction", "transitionTimingFunction"],
  typography: ["textStyle"],
} as const satisfies Record<string, readonly StyleProperty[]>

export type StyleValueByProperty<
  TTheme extends ThemeContract,
  TProperty extends StyleProperty,
> = StyleValueMap<TTheme>[TProperty]

export type StyleScalar<TTheme extends ThemeContract = ThemeContract> =
  StyleValueMap<TTheme>[keyof StyleValueMap<TTheme>]

export type PseudoAlias =
  | "_active"
  | "_checked"
  | "_closed"
  | "_disabled"
  | "_focus"
  | "_focusVisible"
  | "_focusWithin"
  | "_hover"
  | "_open"
  | "_selected"

export type NestedStyleKey =
  | PseudoAlias
  | `&${string}`
  | `@media ${string}`
  | `@supports ${string}`

export type StyleObject<TTheme extends ThemeContract = ThemeContract> = Partial<
  StyleValueMap<TTheme>
> & {
  [K in NestedStyleKey]?: StyleObject<TTheme>
}

export type { TextStyleDefinition }
