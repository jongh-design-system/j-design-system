import type { KeyframeSelector } from "@jongh/new-v2-system-core"

import type {
  CompileDocument,
  CompileLayer,
  CssDeclaration,
  CssNode,
} from "../../output/schema.ts"
import { compileDocumentSchema } from "../../output/schema.ts"
import { getKeyframesName } from "../../registry/keyframes.ts"
import { getTokenValue } from "../../registry/tokens.ts"
import { transformRecipes } from "../../transform/recipes.ts"
import type { CompileContext, NormalizedSystem } from "../context.ts"

type NormalizedToken =
  | NormalizedSystem["tokens"]["primitive"][number]
  | NormalizedSystem["tokens"]["semantic"][number]
type NormalizedTextStyle = NormalizedSystem["composites"]["textStyles"][number]

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

const tokenFamilyNamespaces: Record<string, string> = {
  color: "color",
  fontSize: "text",
  fontWeight: "font-weight",
  letterSpacing: "tracking",
  lineHeight: "leading",
  radius: "radius",
  shadow: "shadow",
  spacing: "spacing",
}

function toKebab(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .replace(/\./g, "-")
    .toLowerCase()
}

function pathSuffix(path: string, segmentsToRemove: number): string {
  return path.split(".").slice(segmentsToRemove).map(toKebab).join("-")
}

function isTokenReference(value: unknown): value is string {
  return (
    typeof value === "string" && /^[a-zA-Z][\w-]*(?:\.[\w-]+)+$/.test(value)
  )
}

function toCssProperties(property: string): string[] {
  if (property in shorthandProperties) {
    return [
      ...shorthandProperties[property as keyof typeof shorthandProperties],
    ]
  }

  return [toKebab(property)]
}

function keyframesToDeclarations(
  frames: CompileContext["normalized"]["keyframes"][number]["frames"],
): Array<{ selector: KeyframeSelector; declarations: CssDeclaration[] }> {
  return frames.map((frame) => ({
    selector: frame.selector as KeyframeSelector,
    declarations: frame.declarations.map((declaration) => ({
      property: toKebab(declaration.property),
      value: declaration.value,
    })),
  }))
}

function tailwindTokenProperty(token: NormalizedToken): string | undefined {
  if (token.path.startsWith("motion.duration.")) {
    return `--transition-duration-${pathSuffix(token.path, 2)}`
  }

  if (token.path.startsWith("motion.easing.")) {
    return `--ease-${pathSuffix(token.path, 2)}`
  }

  const namespace = tokenFamilyNamespaces[token.family]

  if (namespace === undefined) {
    return undefined
  }

  return `--${namespace}-${pathSuffix(token.path, 1)}`
}

function createTailwindTokenReferences(context: CompileContext) {
  const references = new Map<string, string>()

  for (const token of [
    ...context.normalized.tokens.primitive,
    ...context.normalized.tokens.semantic,
  ]) {
    const property = tailwindTokenProperty(token)

    if (property !== undefined) {
      references.set(token.path, `var(${property})`)
    }
  }

  return references
}

function resolveTailwindValue(
  context: CompileContext,
  references: Map<string, string>,
  value: string,
): string {
  return references.get(value) ?? getTokenValue(context.registry.tokens, value)
}

function animationProperty(reference: string): string {
  return `--animate-${toKebab(reference.replace(/^animation\./, ""))}`
}

function createAnimationValue(
  context: CompileContext,
  references: Map<string, string>,
  animation: NormalizedSystem["composites"]["animations"][number],
): string {
  const values = [
    getKeyframesName(context.registry.keyframes, animation.keyframes),
    resolveTailwindValue(context, references, animation.duration),
    resolveTailwindValue(context, references, animation.easing),
  ]

  if (animation.delay !== undefined) {
    values.push(resolveTailwindValue(context, references, animation.delay))
  }

  if (animation.iterationCount !== undefined) {
    values.push(String(animation.iterationCount))
  }

  if (animation.direction !== undefined) {
    values.push(animation.direction)
  }

  if (animation.fillMode !== undefined) {
    values.push(animation.fillMode)
  }

  return values.join(" ")
}

function createTextStyleDeclarations(
  context: CompileContext,
  references: Map<string, string>,
  textStyle: NormalizedTextStyle,
): CssDeclaration[] {
  const declarations = [
    {
      property: "font-size",
      value: resolveTailwindValue(context, references, textStyle.fontSize),
    },
    {
      property: "line-height",
      value: resolveTailwindValue(context, references, textStyle.lineHeight),
    },
    {
      property: "font-weight",
      value: resolveTailwindValue(context, references, textStyle.fontWeight),
    },
  ]

  if (textStyle.letterSpacing !== undefined) {
    declarations.push({
      property: "letter-spacing",
      value: resolveTailwindValue(context, references, textStyle.letterSpacing),
    })
  }

  return declarations
}

function createThemeDeclarations(context: CompileContext): CssDeclaration[] {
  const references = createTailwindTokenReferences(context)
  const declarations: CssDeclaration[] = []

  for (const token of [
    ...context.normalized.tokens.primitive,
    ...context.normalized.tokens.semantic,
  ]) {
    const property = tailwindTokenProperty(token)

    if (property === undefined) {
      continue
    }

    declarations.push({
      property,
      value: getTokenValue(context.registry.tokens, token.path),
    })
  }

  for (const animation of context.normalized.composites.animations) {
    declarations.push({
      property: animationProperty(`animation.${animation.name}`),
      value: createAnimationValue(context, references, animation),
    })
  }

  return declarations
}

function createTextStyleUtilities(context: CompileContext): CssNode[] {
  const references = createTailwindTokenReferences(context)

  return context.normalized.composites.textStyles.map((textStyle) => ({
    kind: "at-rule",
    name: "utility",
    params: `text-style-${toKebab(textStyle.name)}`,
    declarations: createTextStyleDeclarations(context, references, textStyle),
  }))
}

function getTextStyleDeclarations(
  context: CompileContext,
  references: Map<string, string>,
  reference: string,
) {
  const name = reference.replace(/^textStyle\./, "")
  const textStyle = context.normalized.composites.textStyles.find(
    (item) => item.name === name,
  )

  if (textStyle === undefined) {
    throw new Error(`Unknown textStyle reference "${reference}"`)
  }

  return createTextStyleDeclarations(context, references, textStyle)
}

function transformTailwindProperty(
  context: CompileContext,
  references: Map<string, string>,
  property: string,
  value: unknown,
): CssDeclaration[] {
  if (property === "animation") {
    if (typeof value !== "string") {
      return []
    }

    if (!context.registry.composites.animations.has(value)) {
      throw new Error(`Unknown animation reference "${value}"`)
    }

    return [
      {
        property: "animation",
        value: `var(${animationProperty(value)})`,
      },
    ]
  }

  if (property === "textStyle") {
    return typeof value === "string"
      ? getTextStyleDeclarations(context, references, value)
      : []
  }

  if (typeof value !== "string" && typeof value !== "number") {
    return []
  }

  return toCssProperties(property).map((cssProperty) => ({
    property: cssProperty,
    value: isTokenReference(value)
      ? resolveTailwindValue(context, references, String(value))
      : String(value),
  }))
}

function createComponentBlocks(
  context: CompileContext,
): CompileLayer["blocks"] {
  const references = createTailwindTokenReferences(context)

  return transformRecipes(
    context.normalized,
    context.registry,
    (property, value) =>
      transformTailwindProperty(context, references, property, value),
  )
}

export function compileTailwindV4(context: CompileContext): CompileDocument {
  const tokenBlocks: CompileLayer["blocks"] = []

  for (const [family, declarations] of Object.entries(
    context.registry.tokens.declarations,
  )) {
    tokenBlocks.push({
      kind: "token",
      family,
      declarations,
    })
  }

  for (const [mode, declarations] of Object.entries(
    context.registry.tokens.modeDeclarations,
  )) {
    tokenBlocks.push({
      kind: "tokenMode",
      mode,
      declarations,
    })
  }

  const themeDeclarations = createThemeDeclarations(context)
  const layers: CompileLayer[] = [
    {
      name: "tokens",
      blocks: tokenBlocks,
    },
    {
      name: "theme",
      blocks: [
        {
          kind: "css",
          nodes:
            themeDeclarations.length > 0
              ? [
                  {
                    kind: "at-rule",
                    name: "theme",
                    params: "inline",
                    declarations: themeDeclarations,
                  },
                ]
              : [],
        },
      ],
    },
    {
      name: "keyframes",
      blocks: context.normalized.keyframes.map((keyframes) => ({
        kind: "keyframes",
        name: keyframes.name,
        frames: keyframesToDeclarations(keyframes.frames),
      })),
    },
    {
      name: "utilities",
      blocks: [
        {
          kind: "css",
          nodes: createTextStyleUtilities(context),
        },
      ],
    },
    {
      name: "components",
      blocks: createComponentBlocks(context),
    },
  ]

  return compileDocumentSchema.parse({ layers })
}
