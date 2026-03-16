import type {
  SystemDefinition,
  SystemThemeDefinition,
} from "../types/recipe.ts"
import type { ThemeContract } from "../types/style.ts"
import type {
  PrimitiveTokensDefinition,
  SemanticTokenNode,
  TextStyleDefinition,
} from "../types/tokens.ts"

function joinPath(segments: string[]): string {
  return segments.join(".")
}

export function createVarName(path: string, prefix = "jds"): string {
  return `--${prefix}-${path.replaceAll(".", "-")}`
}

export function tokenVar(path: string, prefix = "jds"): string {
  return `var(${createVarName(path, prefix)})`
}

function isTextStyleDefinition(value: unknown): value is TextStyleDefinition {
  return (
    typeof value === "object" &&
    value !== null &&
    "fontSize" in value &&
    "lineHeight" in value &&
    "fontWeight" in value
  )
}

function isSemanticTokenNode(
  value: unknown,
): value is SemanticTokenNode<string> {
  return (
    typeof value === "object" &&
    value !== null &&
    "light" in value &&
    "dark" in value
  )
}

function flattenStringLeafTree(
  tree: Record<string, unknown>,
  prefix: string[] = [],
): Array<{
  path: string
  value: string
}> {
  const entries: Array<{ path: string; value: string }> = []

  for (const [key, value] of Object.entries(tree)) {
    if (typeof value === "string") {
      entries.push({ path: joinPath(prefix.concat(key)), value })
      continue
    }

    if (typeof value === "object" && value !== null) {
      entries.push(
        ...flattenStringLeafTree(
          value as Record<string, unknown>,
          prefix.concat(key),
        ),
      )
    }
  }

  return entries
}

export function flattenTypography(
  tree: Record<string, unknown>,
  prefix: string[] = [],
): Array<{
  path: string
  value: TextStyleDefinition
}> {
  const entries: Array<{ path: string; value: TextStyleDefinition }> = []

  for (const [key, value] of Object.entries(tree)) {
    if (isTextStyleDefinition(value)) {
      entries.push({ path: joinPath(prefix.concat(key)), value })
      continue
    }

    if (typeof value === "object" && value !== null) {
      entries.push(
        ...flattenTypography(
          value as Record<string, unknown>,
          prefix.concat(key),
        ),
      )
    }
  }

  return entries
}

export function flattenSemanticTokens(
  tree: Record<string, unknown>,
  prefix: string[] = [],
): Array<{
  path: string
  value: SemanticTokenNode<string>
}> {
  const entries: Array<{ path: string; value: SemanticTokenNode<string> }> = []

  for (const [key, value] of Object.entries(tree)) {
    if (isSemanticTokenNode(value)) {
      entries.push({ path: joinPath(prefix.concat(key)), value })
      continue
    }

    if (typeof value === "object" && value !== null) {
      entries.push(
        ...flattenSemanticTokens(
          value as Record<string, unknown>,
          prefix.concat(key),
        ),
      )
    }
  }

  return entries
}

export interface PrimitiveStringTokenEntry {
  family: string
  publicPath: string
  varPath: string
  value: string
}

export interface PrimitiveTypographyTokenEntry {
  family: string
  publicPath: string
  varPath: string
  value: TextStyleDefinition
}

export interface SemanticTokenEntry {
  family: string
  publicPath: string
  varPath: string
  value: SemanticTokenNode<string>
}

export function getPrimitiveStringTokenEntries<TTheme extends ThemeContract>(
  theme: SystemThemeDefinition<TTheme>,
): PrimitiveStringTokenEntry[] {
  const stringFamilies: Array<keyof PrimitiveTokensDefinition & string> = [
    "color",
    "spacing",
    "radius",
    "shadow",
    "motion",
  ]

  return stringFamilies.flatMap((family) =>
    flattenStringLeafTree(
      theme.primitiveTokens[family] as Record<string, unknown>,
    ).map(({ path, value }) => ({
      family,
      publicPath: `${family}.${path}`,
      varPath: `primitive.${family}.${path}`,
      value,
    })),
  )
}

export function getPrimitiveTypographyTokenEntries<
  TTheme extends ThemeContract,
>(theme: SystemThemeDefinition<TTheme>): PrimitiveTypographyTokenEntry[] {
  return flattenTypography(
    theme.primitiveTokens.typography as Record<string, unknown>,
  ).map(({ path, value }) => ({
    family: "typography",
    publicPath: `typography.${path}`,
    varPath: `primitive.typography.${path}`,
    value,
  }))
}

export function getSemanticTokenEntries<TTheme extends ThemeContract>(
  theme: SystemThemeDefinition<TTheme>,
): SemanticTokenEntry[] {
  return Object.entries(theme.semanticTokens).flatMap(([family, tree]) => {
    if (!tree || typeof tree !== "object") {
      return []
    }

    return flattenSemanticTokens(tree as Record<string, unknown>).map(
      ({ path, value }) => ({
        family,
        publicPath: `${family}.${path}`,
        varPath: `${family}.${path}`,
        value,
      }),
    )
  })
}

export function collectPrimitiveTokenPaths<TTheme extends ThemeContract>(
  theme: SystemThemeDefinition<TTheme>,
): Set<string> {
  return new Set([
    ...getPrimitiveStringTokenEntries(theme).map((entry) => entry.publicPath),
    ...getPrimitiveTypographyTokenEntries(theme).map(
      (entry) => entry.publicPath,
    ),
  ])
}

export function collectTokenPaths<TTheme extends ThemeContract>(
  theme: SystemThemeDefinition<TTheme>,
): Set<string> {
  return new Set([
    ...collectPrimitiveTokenPaths(theme),
    ...getSemanticTokenEntries(theme).map((entry) => entry.publicPath),
  ])
}

export function isTokenReference(value: string): boolean {
  return /^(color|spacing|radius|shadow|motion|typography)\./.test(value)
}

function getInternalTokenPath<TTheme extends ThemeContract>(
  theme: SystemThemeDefinition<TTheme>,
  publicPath: string,
): string {
  const tokenPaths = collectTokenPaths(theme)

  if (!tokenPaths.has(publicPath)) {
    return publicPath
  }

  const semanticPaths = new Set(
    getSemanticTokenEntries(theme).map((entry) => entry.publicPath),
  )

  if (semanticPaths.has(publicPath)) {
    return publicPath
  }

  return `primitive.${publicPath}`
}

export function resolveTokenVarPath<TTheme extends ThemeContract>(
  publicPath: string,
  system: SystemDefinition<TTheme>,
): string {
  return getInternalTokenPath(system.theme, publicPath)
}

export function resolveStyleToken<TTheme extends ThemeContract>(
  value: string,
  system: SystemDefinition<TTheme>,
): string {
  if (!isTokenReference(value)) {
    return value
  }

  return tokenVar(resolveTokenVarPath(value, system), system.prefix)
}
