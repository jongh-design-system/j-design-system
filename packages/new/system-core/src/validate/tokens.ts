import {
  collectPrimitiveTokenPaths,
  getSemanticTokenEntries,
} from "../resolve/tokens.ts"
import type { SystemDefinition } from "../types/recipe.ts"
import type { ThemeContract } from "../types/style.ts"
import type { SemanticTokenNode } from "../types/tokens.ts"

function validateSemanticTokenNode(
  family: string,
  path: string,
  value: SemanticTokenNode<string>,
  primitiveTokenPaths: Set<string>,
): void {
  for (const [mode, reference] of Object.entries(value)) {
    if (!primitiveTokenPaths.has(reference)) {
      throw new Error(
        `Unknown ${mode} semantic token reference "${reference}" at "${path}"`,
      )
    }

    if (!reference.startsWith(`${family}.`)) {
      throw new Error(
        `Semantic token "${path}" references a different family token "${reference}"`,
      )
    }
  }
}

export function validateTokenReferences<TTheme extends ThemeContract>(
  system: SystemDefinition<TTheme>,
): void {
  const primitiveTokenPaths = collectPrimitiveTokenPaths(system.theme)

  for (const semantic of getSemanticTokenEntries(system.theme)) {
    validateSemanticTokenNode(
      semantic.family,
      semantic.publicPath,
      semantic.value,
      primitiveTokenPaths,
    )
  }
}
