import type { Properties } from "@styled-system/types/csstype"
import type { UtilityValues } from "@styled-system/types/prop-type"
import type { CSSProperties } from "react"

export const breakpoints = {
  sm: "480px",
  md: "768px",
  lg: "1280px",
  xl: "1440px",
}

export type ResponsiveLayoutStyleValue<Value> =
  | Value
  | ({ base?: Value } & Partial<Record<keyof typeof breakpoints, Value>>)

type CssValue<Property extends keyof Properties> = NonNullable<
  Properties[Property]
>
type PositiveSpacingValue<Property extends keyof Properties> =
  | Exclude<UtilityValues["padding"], `-${string}`>
  | CssValue<Property>
type MarginValue<Property extends keyof Properties> =
  | UtilityValues["margin"]
  | CssValue<Property>
type LayoutColor = Exclude<
  UtilityValues["color"],
  `palette.${string}` | `colorPalette${string}`
>

export type LayoutStyleProps = {
  color?: ResponsiveLayoutStyleValue<LayoutColor>
  display?: ResponsiveLayoutStyleValue<CssValue<"display">>
  flexDirection?: ResponsiveLayoutStyleValue<CssValue<"flexDirection">>
  gap?: ResponsiveLayoutStyleValue<PositiveSpacingValue<"gap">>
  rowGap?: ResponsiveLayoutStyleValue<PositiveSpacingValue<"rowGap">>
  columnGap?: ResponsiveLayoutStyleValue<PositiveSpacingValue<"columnGap">>
  width?: ResponsiveLayoutStyleValue<CssValue<"width"> | "full">
  minWidth?: ResponsiveLayoutStyleValue<CssValue<"minWidth"> | "full">
  maxWidth?: ResponsiveLayoutStyleValue<CssValue<"maxWidth"> | "full">
  height?: ResponsiveLayoutStyleValue<CssValue<"height"> | "full">
  minHeight?: ResponsiveLayoutStyleValue<CssValue<"minHeight"> | "full">
  maxHeight?: ResponsiveLayoutStyleValue<CssValue<"maxHeight"> | "full">
  padding?: ResponsiveLayoutStyleValue<PositiveSpacingValue<"padding">>
  paddingX?: ResponsiveLayoutStyleValue<PositiveSpacingValue<"paddingInline">>
  paddingY?: ResponsiveLayoutStyleValue<PositiveSpacingValue<"paddingBlock">>
  paddingTop?: ResponsiveLayoutStyleValue<PositiveSpacingValue<"paddingTop">>
  paddingRight?: ResponsiveLayoutStyleValue<
    PositiveSpacingValue<"paddingRight">
  >
  paddingBottom?: ResponsiveLayoutStyleValue<
    PositiveSpacingValue<"paddingBottom">
  >
  paddingLeft?: ResponsiveLayoutStyleValue<PositiveSpacingValue<"paddingLeft">>
  p?: ResponsiveLayoutStyleValue<PositiveSpacingValue<"padding">>
  px?: ResponsiveLayoutStyleValue<PositiveSpacingValue<"paddingInline">>
  py?: ResponsiveLayoutStyleValue<PositiveSpacingValue<"paddingBlock">>
  pt?: ResponsiveLayoutStyleValue<PositiveSpacingValue<"paddingTop">>
  pr?: ResponsiveLayoutStyleValue<PositiveSpacingValue<"paddingRight">>
  pb?: ResponsiveLayoutStyleValue<PositiveSpacingValue<"paddingBottom">>
  pl?: ResponsiveLayoutStyleValue<PositiveSpacingValue<"paddingLeft">>
  margin?: ResponsiveLayoutStyleValue<MarginValue<"margin">>
  marginX?: ResponsiveLayoutStyleValue<MarginValue<"marginInline">>
  marginY?: ResponsiveLayoutStyleValue<MarginValue<"marginBlock">>
  marginTop?: ResponsiveLayoutStyleValue<MarginValue<"marginTop">>
  marginRight?: ResponsiveLayoutStyleValue<MarginValue<"marginRight">>
  marginBottom?: ResponsiveLayoutStyleValue<MarginValue<"marginBottom">>
  marginLeft?: ResponsiveLayoutStyleValue<MarginValue<"marginLeft">>
  m?: ResponsiveLayoutStyleValue<MarginValue<"margin">>
  mx?: ResponsiveLayoutStyleValue<MarginValue<"marginInline">>
  my?: ResponsiveLayoutStyleValue<MarginValue<"marginBlock">>
  mt?: ResponsiveLayoutStyleValue<MarginValue<"marginTop">>
  mr?: ResponsiveLayoutStyleValue<MarginValue<"marginRight">>
  mb?: ResponsiveLayoutStyleValue<MarginValue<"marginBottom">>
  ml?: ResponsiveLayoutStyleValue<MarginValue<"marginLeft">>
}

const layoutVariableNames = [
  "color",
  "display",
  "flex-direction",
  "gap",
  "row-gap",
  "column-gap",
  "align-items",
  "justify-content",
  "justify-items",
  "flex-wrap",
  "flex-grow",
  "flex-shrink",
  "width",
  "min-width",
  "max-width",
  "height",
  "min-height",
  "max-height",
  "padding",
  "padding-x",
  "padding-y",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "margin",
  "margin-x",
  "margin-y",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "grid-template-columns",
  "grid-template-rows",
  "grid-auto-flow",
  "grid-auto-columns",
  "grid-auto-rows",
] as const

type LayoutVariableName = (typeof layoutVariableNames)[number]
type ResponsiveCondition = "base" | keyof typeof breakpoints
type ResponsiveStyleValue = ResponsiveLayoutStyleValue<unknown>

const conditions = [
  "base",
  ...Object.keys(breakpoints),
] as ResponsiveCondition[]

const variableDefaults = Object.fromEntries(
  layoutVariableNames.flatMap((name) =>
    conditions.map((condition, index) => [
      `--layout-${name}-${condition}`,
      index === 0
        ? "initial"
        : `var(--layout-${name}-${conditions[index - 1]}, initial)`,
    ]),
  ),
)

const activeVariables = (condition: ResponsiveCondition) =>
  Object.fromEntries(
    layoutVariableNames.map((name) => [
      `--layout-${name}`,
      `var(--layout-${name}-${condition}, initial)`,
    ]),
  )

export const layoutRecipeBase = {
  ...variableDefaults,
  ...activeVariables("base"),
  color: "[var(--layout-color)]",
  display: "[var(--layout-display)]",
  flexDirection: "[var(--layout-flex-direction)]",
  gap: "[var(--layout-gap)]",
  rowGap: "[var(--layout-row-gap, var(--layout-gap))]",
  columnGap: "[var(--layout-column-gap, var(--layout-gap))]",
  alignItems: "[var(--layout-align-items)]",
  justifyContent: "[var(--layout-justify-content)]",
  justifyItems: "[var(--layout-justify-items)]",
  flexWrap: "[var(--layout-flex-wrap)]",
  flexGrow: "[var(--layout-flex-grow)]",
  flexShrink: "[var(--layout-flex-shrink)]",
  width: "[var(--layout-width)]",
  minWidth: "[var(--layout-min-width)]",
  maxWidth: "[var(--layout-max-width)]",
  height: "[var(--layout-height)]",
  minHeight: "[var(--layout-min-height)]",
  maxHeight: "[var(--layout-max-height)]",
  paddingTop:
    "[var(--layout-padding-top, var(--layout-padding-y, var(--layout-padding)))]",
  paddingRight:
    "[var(--layout-padding-right, var(--layout-padding-x, var(--layout-padding)))]",
  paddingBottom:
    "[var(--layout-padding-bottom, var(--layout-padding-y, var(--layout-padding)))]",
  paddingLeft:
    "[var(--layout-padding-left, var(--layout-padding-x, var(--layout-padding)))]",
  marginTop:
    "[var(--layout-margin-top, var(--layout-margin-y, var(--layout-margin)))]",
  marginRight:
    "[var(--layout-margin-right, var(--layout-margin-x, var(--layout-margin)))]",
  marginBottom:
    "[var(--layout-margin-bottom, var(--layout-margin-y, var(--layout-margin)))]",
  marginLeft:
    "[var(--layout-margin-left, var(--layout-margin-x, var(--layout-margin)))]",
  gridTemplateColumns: "[var(--layout-grid-template-columns)]",
  gridTemplateRows: "[var(--layout-grid-template-rows)]",
  gridAutoFlow: "[var(--layout-grid-auto-flow)]",
  gridAutoColumns: "[var(--layout-grid-auto-columns)]",
  gridAutoRows: "[var(--layout-grid-auto-rows)]",
  ...Object.fromEntries(
    Object.keys(breakpoints).map((condition) => [
      `_${condition}`,
      activeVariables(condition as keyof typeof breakpoints),
    ]),
  ),
}

const resolveSize = (value: unknown) => {
  if (value === "full") {
    return "100%"
  }

  return value
}

const resolveSpacing = (value: unknown) => {
  if (value === "0") {
    return 0
  }

  if (typeof value !== "string" || !/^-?\d+(?:\.\d+)?$/.test(value)) {
    return value
  }

  const isNegative = value.startsWith("-")
  const tokenName = value.replace("-", "").replaceAll(".", "\\.")
  const tokenValue = `var(--spacing-${tokenName})`

  return isNegative ? `calc(${tokenValue} * -1)` : tokenValue
}

export const normalizeLayoutStyleProps = (
  styleProps: object,
): CSSProperties => {
  const props = styleProps as Record<string, ResponsiveStyleValue | undefined>
  const style: Record<string, unknown> = {}

  const setResponsiveVariable = (
    name: LayoutVariableName,
    value: ResponsiveStyleValue | undefined,
    transform: (value: unknown) => unknown = (currentValue) => currentValue,
  ) => {
    if (value === undefined) {
      return
    }

    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      style[`--layout-${name}-base`] = transform(value)
      return
    }

    const responsiveValue = value as Partial<
      Record<ResponsiveCondition, unknown>
    >

    for (const condition of conditions) {
      const conditionValue = responsiveValue[condition]

      if (conditionValue !== undefined) {
        style[`--layout-${name}-${condition}`] = transform(conditionValue)
      }
    }
  }

  setResponsiveVariable("display", props.display)
  setResponsiveVariable("color", props.color, (value) =>
    typeof value === "string"
      ? `var(--colors-${value.replaceAll(".", "-")})`
      : value,
  )
  setResponsiveVariable("flex-direction", props.flexDirection)
  setResponsiveVariable("gap", props.gap, resolveSpacing)
  setResponsiveVariable("row-gap", props.rowGap, resolveSpacing)
  setResponsiveVariable("column-gap", props.columnGap, resolveSpacing)
  setResponsiveVariable("align-items", props.alignItems)
  setResponsiveVariable("justify-content", props.justifyContent)
  setResponsiveVariable("justify-items", props.justifyItems)
  setResponsiveVariable("flex-wrap", props.flexWrap)
  setResponsiveVariable("flex-grow", props.flexGrow)
  setResponsiveVariable("flex-shrink", props.flexShrink)
  setResponsiveVariable("width", props.width, resolveSize)
  setResponsiveVariable("min-width", props.minWidth, resolveSize)
  setResponsiveVariable("max-width", props.maxWidth, resolveSize)
  setResponsiveVariable("height", props.height, resolveSize)
  setResponsiveVariable("min-height", props.minHeight, resolveSize)
  setResponsiveVariable("max-height", props.maxHeight, resolveSize)
  setResponsiveVariable("padding", props.padding ?? props.p, resolveSpacing)
  setResponsiveVariable("padding-x", props.paddingX ?? props.px, resolveSpacing)
  setResponsiveVariable("padding-y", props.paddingY ?? props.py, resolveSpacing)
  setResponsiveVariable(
    "padding-top",
    props.paddingTop ?? props.pt,
    resolveSpacing,
  )
  setResponsiveVariable(
    "padding-right",
    props.paddingRight ?? props.pr,
    resolveSpacing,
  )
  setResponsiveVariable(
    "padding-bottom",
    props.paddingBottom ?? props.pb,
    resolveSpacing,
  )
  setResponsiveVariable(
    "padding-left",
    props.paddingLeft ?? props.pl,
    resolveSpacing,
  )
  setResponsiveVariable("margin", props.margin ?? props.m, resolveSpacing)
  setResponsiveVariable("margin-x", props.marginX ?? props.mx, resolveSpacing)
  setResponsiveVariable("margin-y", props.marginY ?? props.my, resolveSpacing)
  setResponsiveVariable(
    "margin-top",
    props.marginTop ?? props.mt,
    resolveSpacing,
  )
  setResponsiveVariable(
    "margin-right",
    props.marginRight ?? props.mr,
    resolveSpacing,
  )
  setResponsiveVariable(
    "margin-bottom",
    props.marginBottom ?? props.mb,
    resolveSpacing,
  )
  setResponsiveVariable(
    "margin-left",
    props.marginLeft ?? props.ml,
    resolveSpacing,
  )
  setResponsiveVariable("grid-template-columns", props.gridTemplateColumns)
  setResponsiveVariable("grid-template-rows", props.gridTemplateRows)
  setResponsiveVariable("grid-auto-flow", props.gridAutoFlow)
  setResponsiveVariable("grid-auto-columns", props.gridAutoColumns)
  setResponsiveVariable("grid-auto-rows", props.gridAutoRows)

  return style as CSSProperties
}
