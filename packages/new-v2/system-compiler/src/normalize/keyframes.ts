import { entriesOf } from "./utils.ts"

export function normalizeKeyframes(keyframes: unknown) {
  return entriesOf(keyframes).map(([name, frames]) => ({
    name,
    frames: entriesOf(frames).map(([selector, declarations]) => ({
      selector,
      declarations: entriesOf(declarations)
        .filter(([, value]) => value !== undefined)
        .map(([property, value]) => ({
          property,
          value,
        })),
    })),
  }))
}
