import type { PrimitiveTokensDefinition } from "./types.ts"

export function definePrimitiveTokens<
  const T extends PrimitiveTokensDefinition,
>(definition: T): T {
  return definition
}
