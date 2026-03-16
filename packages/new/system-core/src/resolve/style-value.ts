import type { SystemDefinition } from "../types/recipe.ts"
import {
  type StyleObject,
  type StyleScalar,
  styleTokenPropertyGroups,
  type ThemeContract,
} from "../types/style.ts"
import { resolveStyleToken, resolveTokenVarPath, tokenVar } from "./tokens.ts"

const pseudoSelectors: Record<string, string> = {
  _hover: "&:hover",
  _active: "&:active",
  _focus: "&:focus",
  _focusVisible: "&:focus-visible",
  _disabled: "&:disabled, &[data-disabled]",
  _checked: "&:checked, &[data-checked]",
  _selected: "&[aria-selected='true'], &[data-selected]",
  _open: "&[data-state='open']",
  _closed: "&[data-state='closed']",
}

const shorthandProperties: Record<string, string[]> = {
  p: ["padding"],
  px: ["padding-inline"],
  py: ["padding-block"],
  pt: ["padding-top"],
  pr: ["padding-right"],
  pb: ["padding-bottom"],
  pl: ["padding-left"],
  m: ["margin"],
  mx: ["margin-inline"],
  my: ["margin-block"],
  w: ["width"],
  h: ["height"],
  minW: ["min-width"],
  minH: ["min-height"],
  maxW: ["max-width"],
  maxH: ["max-height"],
  bg: ["background-color"],
  rounded: ["border-radius"],
}

function kebabCase(value: string): string {
  return value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
}

const tokenPropertySets = {
  color: new Set(styleTokenPropertyGroups.color.map(kebabCase)),
  spacing: new Set(styleTokenPropertyGroups.spacing.map(kebabCase)),
  radius: new Set(styleTokenPropertyGroups.radius.map(kebabCase)),
  shadow: new Set(styleTokenPropertyGroups.shadow.map(kebabCase)),
  motionDuration: new Set(
    styleTokenPropertyGroups.motionDuration.map(kebabCase),
  ),
  motionEasing: new Set(styleTokenPropertyGroups.motionEasing.map(kebabCase)),
}

function isNestedValue(value: unknown): value is StyleObject {
  return typeof value === "object" && value !== null
}

function isScalarValue(value: unknown): value is StyleScalar {
  return typeof value === "string" || typeof value === "number"
}

function stringifyValue<TTheme extends ThemeContract>(
  property: string,
  value: StyleScalar<TTheme>,
  system: SystemDefinition<TTheme>,
): string {
  if (typeof value === "number") {
    return String(value)
  }

  if (property === "textStyle" && value.startsWith("typography.")) {
    const path = value.replace(/^typography\./, "")
    return path
  }

  if (value.startsWith("color.")) {
    return resolveStyleToken(value, system)
  }

  if (value.startsWith("spacing.") && tokenPropertySets.spacing.has(property)) {
    return resolveStyleToken(value, system)
  }

  if (value.startsWith("radius.") && tokenPropertySets.radius.has(property)) {
    return resolveStyleToken(value, system)
  }

  if (value.startsWith("shadow.") && tokenPropertySets.shadow.has(property)) {
    return resolveStyleToken(value, system)
  }

  if (
    value.startsWith("motion.duration.") &&
    tokenPropertySets.motionDuration.has(property)
  ) {
    return resolveStyleToken(value, system)
  }

  if (
    value.startsWith("motion.easing.") &&
    tokenPropertySets.motionEasing.has(property)
  ) {
    return resolveStyleToken(value, system)
  }

  return value
}

function renderDeclarations<TTheme extends ThemeContract>(
  style: StyleObject<TTheme>,
  system: SystemDefinition<TTheme>,
): string {
  const declarations: string[] = []

  for (const [rawKey, rawValue] of Object.entries(style)) {
    if (
      rawValue === undefined ||
      isNestedValue(rawValue) ||
      !isScalarValue(rawValue)
    ) {
      continue
    }

    if (rawKey === "textStyle") {
      if (typeof rawValue !== "string" || !rawValue.startsWith("typography.")) {
        throw new Error("textStyle must reference a typography token")
      }

      const path = resolveTokenVarPath(rawValue, system)
      declarations.push(
        `font-size: ${tokenVar(`${path}.fontSize`, system.prefix)};`,
      )
      declarations.push(
        `line-height: ${tokenVar(`${path}.lineHeight`, system.prefix)};`,
      )
      declarations.push(
        `font-weight: ${tokenVar(`${path}.fontWeight`, system.prefix)};`,
      )
      declarations.push(
        `letter-spacing: ${tokenVar(`${path}.letterSpacing`, system.prefix)};`,
      )
      continue
    }

    const properties = shorthandProperties[rawKey] ?? [kebabCase(rawKey)]

    for (const property of properties) {
      declarations.push(
        `${property}: ${stringifyValue(property, rawValue, system)};`,
      )
    }
  }

  return declarations.join("\n")
}

function renderRule(selector: string, body: string): string {
  return `${selector} {\n${body
    .split("\n")
    .filter(Boolean)
    .map((line) => `  ${line}`)
    .join("\n")}\n}`
}

export function renderStyleObject<TTheme extends ThemeContract>(
  selector: string,
  style: StyleObject<TTheme>,
  system: SystemDefinition<TTheme>,
): string {
  const chunks: string[] = []
  const declarations = renderDeclarations(style, system)

  if (declarations) {
    chunks.push(renderRule(selector, declarations))
  }

  for (const [rawKey, rawValue] of Object.entries(style)) {
    if (!isNestedValue(rawValue)) {
      continue
    }

    const nestedStyle = rawValue as StyleObject<TTheme>

    const nestedSelector = pseudoSelectors[rawKey]
      ? pseudoSelectors[rawKey].replaceAll("&", selector)
      : rawKey.startsWith("&")
        ? rawKey.replaceAll("&", selector)
        : rawKey.startsWith("@")
          ? rawKey
          : `${selector} ${rawKey}`

    if (rawKey.startsWith("@")) {
      chunks.push(
        `${nestedSelector} {\n${indent(renderStyleObject(selector, nestedStyle, system))}\n}`,
      )
      continue
    }

    chunks.push(renderStyleObject(nestedSelector, nestedStyle, system))
  }

  return chunks.filter(Boolean).join("\n\n")
}

function indent(value: string): string {
  return value
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n")
}
