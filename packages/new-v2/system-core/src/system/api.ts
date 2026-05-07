import type { SystemDefinition } from "./types.ts"

export function defineSystem<const TSystem extends SystemDefinition>(
  definition: TSystem,
): TSystem {
  return definition
}
