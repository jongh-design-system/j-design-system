import type { SemanticTokensDefinition } from "./types.ts"

export function defineSemanticTokens<
  const TSemanticTokens extends SemanticTokensDefinition,
>(definition: TSemanticTokens): TSemanticTokens {
  return definition
}
