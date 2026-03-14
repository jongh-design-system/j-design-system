import { keyframes } from "./keyframes.ts"
import { primitiveTokens } from "./tokens/primitive.ts"
import { semanticTokens } from "./tokens/semantic.ts"

export type NativeThemeContract = {
  primitiveTokens: typeof primitiveTokens
  semanticTokens: typeof semanticTokens
  keyframes: typeof keyframes
}
