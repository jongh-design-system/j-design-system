import type { SystemDefinition, TokenSource } from "@jongh/new-v2-system-core"

import { normalizeComposites } from "./composites.ts"
import { normalizeKeyframes } from "./keyframes.ts"
import { normalizeRecipes } from "./recipes.ts"
import { compilerSystemSchema } from "./schema.ts"
import { normalizeTheme } from "./theme.ts"
import { normalizeTokens } from "./tokens.ts"

export function normalizeSystem<TTheme extends TokenSource>(
  system: SystemDefinition<TTheme>,
) {
  const theme = normalizeTheme(system)

  return compilerSystemSchema.parse({
    name: system.name,
    prefix: system.prefix,
    tokens: normalizeTokens(theme),
    keyframes: normalizeKeyframes(theme.keyframes),
    composites: normalizeComposites(theme.composites),
    recipes: normalizeRecipes(theme.recipes),
  })
}
