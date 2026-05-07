import type { KeyframeDeclaration, KeyframeSelector } from "./types.ts"

type KeyframesInput<TKeyframes> = {
  readonly [TName in keyof TKeyframes]: {
    readonly [TSelector in keyof TKeyframes[TName]]: TSelector extends KeyframeSelector
      ? KeyframeDeclaration
      : never
  }
}

export function defineKeyframes<
  const TKeyframes extends KeyframesInput<TKeyframes>,
>(keyframes: TKeyframes): TKeyframes {
  return keyframes
}
