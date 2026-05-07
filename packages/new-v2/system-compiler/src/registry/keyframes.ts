import type { z } from "zod"

import type { compilerSystemSchema } from "../normalize/schema.ts"
import type { KeyframesRegistry } from "./types.ts"

type NormalizedKeyframes = z.infer<typeof compilerSystemSchema>["keyframes"]

export function createKeyframesRegistry(
  keyframes: NormalizedKeyframes,
): KeyframesRegistry {
  return {
    references: new Map(
      keyframes.map(({ name }) => [`keyframes.${name}`, name]),
    ),
  }
}

export function getKeyframesName(
  registry: KeyframesRegistry,
  reference: string,
): string {
  const name = registry.references.get(reference)

  if (name === undefined) {
    throw new Error(`Unknown keyframes reference "${reference}"`)
  }

  return name
}
