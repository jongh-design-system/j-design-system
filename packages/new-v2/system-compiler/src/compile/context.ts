import type { SystemDefinition, TokenSource } from "@jongh/new-v2-system-core"
import type { z } from "zod"

import type { compilerSystemSchema } from "../normalize/schema.ts"
import { normalizeSystem } from "../normalize/system.ts"
import { createCompositeRegistry } from "../registry/composites.ts"
import { createKeyframesRegistry } from "../registry/keyframes.ts"
import { createTokenRegistry } from "../registry/tokens.ts"
import type { CompilerRegistry } from "../registry/types.ts"

export type NormalizedSystem = z.infer<typeof compilerSystemSchema>

export interface CompileContext {
  normalized: NormalizedSystem
  registry: CompilerRegistry
}

export function createCompileContext<TTheme extends TokenSource>(
  system: SystemDefinition<TTheme>,
): CompileContext {
  const normalized = normalizeSystem(system)
  const tokens = createTokenRegistry(normalized.prefix, normalized.tokens)
  const keyframes = createKeyframesRegistry(normalized.keyframes)
  const composites = createCompositeRegistry(
    normalized.composites,
    tokens,
    keyframes,
  )

  return {
    normalized,
    registry: {
      tokens,
      keyframes,
      composites,
    },
  }
}
