export type AnimationValue = string | number

export interface AnimationDefinition {
  keyframes: AnimationValue
  duration: AnimationValue
  easing: AnimationValue
  delay?: AnimationValue
  fillMode?: AnimationValue
  iterationCount?: AnimationValue
  direction?: AnimationValue
}

export type AnimationDefinitionMap = Record<string, AnimationDefinition>

export type AnimationReference<TAnimations extends Record<string, unknown>> =
  `animation.${keyof TAnimations & string}`

export function defineAnimations<
  const TAnimations extends AnimationDefinitionMap,
>(definitions: TAnimations): TAnimations {
  return definitions
}
