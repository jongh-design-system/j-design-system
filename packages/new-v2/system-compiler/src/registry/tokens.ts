import type { z } from "zod"

import type { compilerSystemSchema } from "../normalize/schema.ts"
import type { CssDeclaration } from "../output/schema.ts"
import type { TokenRegistry } from "./types.ts"

type NormalizedTokens = z.infer<typeof compilerSystemSchema>["tokens"]

function toKebab(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase()
}

export function toCssVariableName(prefix: string, path: string): string {
  return `--${prefix}-${path.split(".").map(toKebab).join("-")}`
}

function toCssVariableReference(prefix: string, path: string): string {
  return `var(${toCssVariableName(prefix, path)})`
}

function pushDeclaration(
  declarations: Record<string, CssDeclaration[]>,
  family: string,
  declaration: CssDeclaration,
): void {
  declarations[family] = [...(declarations[family] ?? []), declaration]
}

export function createTokenRegistry(
  prefix: string,
  tokens: NormalizedTokens,
): TokenRegistry {
  const declarations: Record<string, CssDeclaration[]> = {}
  const modeDeclarations: Record<string, CssDeclaration[]> = {}
  const references = new Map<string, string>()

  for (const token of tokens.primitive) {
    const property = toCssVariableName(prefix, token.path)
    references.set(token.path, `var(${property})`)
    pushDeclaration(declarations, token.family, {
      property,
      value: token.value,
    })
  }

  for (const token of tokens.semantic) {
    const property = toCssVariableName(prefix, token.path)
    const modeEntries = Object.entries(token.modes)
    const defaultModeEntry =
      modeEntries.find(([mode]) => mode === "base") ?? modeEntries[0]

    if (defaultModeEntry === undefined) {
      continue
    }

    const [defaultMode, referencedPath] = defaultModeEntry
    references.set(token.path, `var(${property})`)
    pushDeclaration(declarations, token.family, {
      property,
      value: toCssVariableReference(prefix, referencedPath),
    })

    for (const [mode, modeReferencedPath] of modeEntries) {
      if (mode === defaultMode) {
        continue
      }

      modeDeclarations[mode] = [
        ...(modeDeclarations[mode] ?? []),
        {
          property,
          value: toCssVariableReference(prefix, modeReferencedPath),
        },
      ]
    }
  }

  return {
    declarations,
    modeDeclarations,
    references,
  }
}

export function getTokenValue(registry: TokenRegistry, path: string): string {
  return registry.references.get(path) ?? path
}
