import { defineSystem } from "./define.ts"
import { keyframes } from "./keyframes.ts"
import { recipes } from "./recipes/index.ts"
import { primitiveTokens } from "./tokens/primitive.ts"
import { semanticTokens } from "./tokens/semantic.ts"

export const system = defineSystem({
  name: "jds-native",
  prefix: "jds",
  theme: {
    primitiveTokens,
    semanticTokens,
    recipes,
    keyframes,
  },
})
