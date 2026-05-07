import type { SystemPresetDefinition } from "./types.ts"

export function definePreset<const TPreset extends SystemPresetDefinition>(
  definition: TPreset,
): TPreset {
  return definition
}
