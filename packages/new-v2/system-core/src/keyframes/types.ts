export type KeyframeSelector = "from" | "to" | `${number}%`

export type KeyframeDeclaration = Record<string, string>

export type KeyframesDefinition = Partial<
  Record<KeyframeSelector, KeyframeDeclaration>
>

export type KeyframesDefinitionMap = Record<string, KeyframesDefinition>

export type KeyframesName<TKeyframes extends KeyframesDefinitionMap> =
  keyof TKeyframes & string

export type KeyframesReference<TKeyframes extends KeyframesDefinitionMap> =
  `keyframes.${KeyframesName<TKeyframes>}`
