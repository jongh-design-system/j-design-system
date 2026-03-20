import {
  createRecipeFactory,
  createSemanticTokensFactory,
  definePrimitiveTokens,
} from "@jongh/new-system-core/define"

import type { NativeThemeContract } from "./theme-contract.ts"
import type { NativePrimitiveTokens } from "./tokens/primitive.ts"

export const { defineRecipe, defineSlotRecipe, definePreset, defineSystem } =
  createRecipeFactory<NativeThemeContract>()

export const { defineSemanticTokens } =
  createSemanticTokensFactory<NativePrimitiveTokens>()

export { definePrimitiveTokens }
