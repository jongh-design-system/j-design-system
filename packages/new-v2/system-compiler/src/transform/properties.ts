import type { CssDeclaration } from "../output/schema.ts"
import {
  getAnimationDeclarations,
  getTextStyleDeclarations,
} from "../registry/composites.ts"
import { getTokenValue } from "../registry/tokens.ts"
import type { CompilerRegistry } from "../registry/types.ts"

const shorthandProperties = {
  p: ["padding"],
  px: ["padding-left", "padding-right"],
  py: ["padding-top", "padding-bottom"],
  pt: ["padding-top"],
  pr: ["padding-right"],
  pb: ["padding-bottom"],
  pl: ["padding-left"],
  m: ["margin"],
  mx: ["margin-left", "margin-right"],
  my: ["margin-top", "margin-bottom"],
  rounded: ["border-radius"],
  bg: ["background-color"],
} as const

type PropertyTransformer = (
  value: unknown,
  registry: CompilerRegistry,
) => CssDeclaration[]

const compositePropertyTransformers = {
  animation(value, registry) {
    return typeof value === "string"
      ? getAnimationDeclarations(registry.composites, value)
      : []
  },
  textStyle(value, registry) {
    return typeof value === "string"
      ? getTextStyleDeclarations(registry.composites, value)
      : []
  },
} satisfies Record<string, PropertyTransformer>

function toKebab(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase()
}

function toCssProperties(property: string): string[] {
  if (property in shorthandProperties) {
    return [
      ...shorthandProperties[property as keyof typeof shorthandProperties],
    ]
  }

  return [toKebab(property)]
}

function isTokenReference(value: unknown): value is string {
  return (
    typeof value === "string" && /^[a-zA-Z][\w-]*(?:\.[\w-]+)+$/.test(value)
  )
}

export function transformProperty(
  property: string,
  value: unknown,
  registry: CompilerRegistry,
): CssDeclaration[] {
  if (property in compositePropertyTransformers) {
    return compositePropertyTransformers[
      property as keyof typeof compositePropertyTransformers
    ](value, registry)
  }

  if (typeof value !== "string" && typeof value !== "number") {
    return []
  }

  return toCssProperties(property).map((cssProperty) => ({
    property: cssProperty,
    value: isTokenReference(value)
      ? getTokenValue(registry.tokens, String(value))
      : String(value),
  }))
}
