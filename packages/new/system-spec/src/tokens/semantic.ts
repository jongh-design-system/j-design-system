import { defineSemanticTokens } from "../define.ts"
import { semanticColor } from "./color/semantic.ts"

export const semanticTokens = defineSemanticTokens({
  color: semanticColor,
})

export type NativeSemanticTokens = typeof semanticTokens
