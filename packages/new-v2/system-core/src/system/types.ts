import type {
  SystemPresetDefinition,
  SystemThemeDefinition,
} from "../preset/types.ts"
import type { TokenSource } from "../token/types.ts"

export interface SystemDefinition<
  TStyleSource extends TokenSource = TokenSource,
> {
  name: string
  prefix: string
  presets?: Array<SystemPresetDefinition<TStyleSource>>
  theme: SystemThemeDefinition<TStyleSource>
}

export type SystemConfigDefinition<
  TStyleSource extends TokenSource = TokenSource,
> = SystemDefinition<TStyleSource>
