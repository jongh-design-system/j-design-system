import type * as CSS from "csstype"

import type {
  ClosedCssValue,
  CssQuotedString,
  CssUrlFunction,
  CssVarFunction,
  DimensionValue,
  LengthValue,
  NumberValue,
} from "./css.ts"
import type { StyleInputValueMap } from "./value.ts"

interface StyleShorthandInputMap {
  p: StyleInputValueMap["spacing"]
  px: StyleInputValueMap["spacing"]
  py: StyleInputValueMap["spacing"]
  pt: StyleInputValueMap["spacing"]
  pr: StyleInputValueMap["spacing"]
  pb: StyleInputValueMap["spacing"]
  pl: StyleInputValueMap["spacing"]
  m: StyleInputValueMap["spacing"]
  mx: StyleInputValueMap["spacing"]
  my: StyleInputValueMap["spacing"]
  w: StyleInputValueMap["spacing"]
  h: StyleInputValueMap["spacing"]
  minW: StyleInputValueMap["spacing"]
  minH: StyleInputValueMap["spacing"]
  maxW: StyleInputValueMap["spacing"]
  maxH: StyleInputValueMap["spacing"]
  bg: StyleInputValueMap["color"]
  rounded: StyleInputValueMap["radius"]
}

export interface StyleInputMap {
  alignItems: ClosedCssValue<CSS.Property.AlignItems>
  animation: StyleInputValueMap["animation"]
  animationDuration: StyleInputValueMap["motion"]["duration"]
  animationFillMode: ClosedCssValue<CSS.Property.AnimationFillMode>
  animationName: CSS.Property.AnimationName | CssVarFunction
  animationTimingFunction: StyleInputValueMap["motion"]["easing"]
  appearance: ClosedCssValue<CSS.Property.Appearance>
  backgroundColor: StyleInputValueMap["color"]
  backgroundImage:
    | ClosedCssValue<CSS.Property.BackgroundImage>
    | CssUrlFunction
    | CssVarFunction
  backgroundPosition: ClosedCssValue<
    CSS.Property.BackgroundPosition<LengthValue>
  >
  backgroundRepeat: ClosedCssValue<CSS.Property.BackgroundRepeat>
  border: CSS.Property.Border<LengthValue>
  borderBottomColor: StyleInputValueMap["color"]
  borderBottomStyle: ClosedCssValue<CSS.Property.BorderBottomStyle>
  borderBottomWidth: ClosedCssValue<CSS.Property.BorderBottomWidth<LengthValue>>
  borderColor: StyleInputValueMap["color"]
  borderRadius: StyleInputValueMap["radius"]
  borderStyle: ClosedCssValue<CSS.Property.BorderStyle>
  borderWidth: ClosedCssValue<CSS.Property.BorderWidth<LengthValue>>
  bottom: StyleInputValueMap["spacing"]
  boxShadow: StyleInputValueMap["shadow"]
  boxSizing: ClosedCssValue<CSS.Property.BoxSizing>
  color: StyleInputValueMap["color"]
  colorScheme: ClosedCssValue<CSS.Property.ColorScheme> | "light dark"
  content: ClosedCssValue<CSS.Property.Content> | CssQuotedString
  cursor: ClosedCssValue<CSS.Property.Cursor>
  display: ClosedCssValue<CSS.Property.Display>
  flex: ClosedCssValue<CSS.Property.Flex<LengthValue>>
  flexDirection: ClosedCssValue<CSS.Property.FlexDirection>
  flexGrow: CSS.Property.FlexGrow
  flexShrink: CSS.Property.FlexShrink
  fontFamily:
    | ClosedCssValue<CSS.Property.FontFamily>
    | CssQuotedString
    | CssVarFunction
    | `${string}, ${string}`
  fontSize: StyleInputValueMap["fontSize"]
  fontWeight: ClosedCssValue<CSS.Property.FontWeight> | NumberValue
  gap: StyleInputValueMap["spacing"]
  height: StyleInputValueMap["spacing"]
  inset: StyleInputValueMap["spacing"]
  justifyContent: ClosedCssValue<CSS.Property.JustifyContent>
  left: StyleInputValueMap["spacing"]
  lineHeight: ClosedCssValue<CSS.Property.LineHeight<LengthValue>>
  margin: StyleInputValueMap["spacing"]
  marginBlock: StyleInputValueMap["spacing"]
  marginBottom: StyleInputValueMap["spacing"]
  marginInline: StyleInputValueMap["spacing"]
  marginLeft: StyleInputValueMap["spacing"]
  marginRight: StyleInputValueMap["spacing"]
  marginTop: StyleInputValueMap["spacing"]
  maskImage:
    | ClosedCssValue<CSS.Property.MaskImage>
    | CssUrlFunction
    | CssVarFunction
  maskPosition: ClosedCssValue<CSS.Property.MaskPosition<LengthValue>>
  maskRepeat: ClosedCssValue<CSS.Property.MaskRepeat>
  maxHeight: StyleInputValueMap["spacing"]
  maxWidth: StyleInputValueMap["spacing"]
  minHeight: StyleInputValueMap["spacing"]
  minWidth: StyleInputValueMap["spacing"]
  objectFit: ClosedCssValue<CSS.Property.ObjectFit>
  opacity: CSS.Property.Opacity
  outline: CSS.Property.Outline<LengthValue>
  outlineOffset: DimensionValue
  overflow: ClosedCssValue<CSS.Property.Overflow>
  padding: StyleInputValueMap["spacing"]
  paddingBlock: StyleInputValueMap["spacing"]
  paddingBottom: StyleInputValueMap["spacing"]
  paddingInline: StyleInputValueMap["spacing"]
  paddingLeft: StyleInputValueMap["spacing"]
  paddingRight: StyleInputValueMap["spacing"]
  paddingTop: StyleInputValueMap["spacing"]
  pointerEvents: ClosedCssValue<CSS.Property.PointerEvents>
  position: ClosedCssValue<CSS.Property.Position>
  right: StyleInputValueMap["spacing"]
  textDecoration: ClosedCssValue<CSS.Property.TextDecoration<LengthValue>>
  textStyle: StyleInputValueMap["textStyle"]
  top: StyleInputValueMap["spacing"]
  touchAction: ClosedCssValue<CSS.Property.TouchAction>
  transform: ClosedCssValue<CSS.Property.Transform> | CssVarFunction
  transition: CSS.Property.Transition
  transitionDuration: StyleInputValueMap["motion"]["duration"]
  transitionProperty: CSS.Property.TransitionProperty
  transitionTimingFunction: StyleInputValueMap["motion"]["easing"]
  userSelect: ClosedCssValue<CSS.Property.UserSelect>
  visibility: ClosedCssValue<CSS.Property.Visibility>
  whiteSpace: ClosedCssValue<CSS.Property.WhiteSpace>
  width: StyleInputValueMap["spacing"]
  zIndex: NumberValue
}

export type StyleInputKey = keyof StyleInputMap & string

export type StyleScalar = StyleInputMap[keyof StyleInputMap]

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
  | `@container ${string}`
  | `@media ${string}`
  | `@supports ${string}`

export type StyleObject = Partial<StyleInputMap & StyleShorthandInputMap> & {
  [K in NestedStyleKey]?: StyleObject
}
