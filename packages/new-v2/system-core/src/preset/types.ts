import type { KeyframesDefinitionMap } from "../keyframes/types.ts"
import type { DeepPartial, RecipeInputDefinition } from "../recipe/types.ts"
import type { AnimationDefinitionMap } from "../token/composite/animation.ts"
import type { TextStyleGroup } from "../token/composite/textStyle.ts"
import type { TokenSource } from "../token/types.ts"

export interface SystemCompositesDefinition {
  textStyles?: DeepPartial<TextStyleGroup>
  animations?: DeepPartial<AnimationDefinitionMap>
}

export interface SystemThemeDefinition<
  TStyleSource extends TokenSource = TokenSource,
> {
  primitiveTokens?: DeepPartial<TStyleSource["primitiveTokens"]>
  semanticTokens?: DeepPartial<TStyleSource["semanticTokens"]>
  keyframes?: DeepPartial<KeyframesDefinitionMap>
  composites?: SystemCompositesDefinition
  recipes?: Record<string, RecipeInputDefinition>
}

export type SystemThemeInput<TStyleSource extends TokenSource = TokenSource> =
  SystemThemeDefinition<TStyleSource>

export type SystemPresetDefinition<
  TStyleSource extends TokenSource = TokenSource,
> = SystemThemeDefinition<TStyleSource>
