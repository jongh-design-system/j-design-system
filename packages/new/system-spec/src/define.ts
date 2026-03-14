import {
  createRecipeFactory,
  createSemanticTokensFactory,
  definePrimitiveTokens,
} from "../../system-core/src/define.ts"
import type { NativeThemeContract } from "./theme-contract.ts"
import type { NativePrimitiveTokens } from "./tokens/primitive.ts"

export const { defineRecipe, defineSlotRecipe, defineSystem } =
  createRecipeFactory<NativeThemeContract>()

export const { defineSemanticTokens } =
  createSemanticTokensFactory<NativePrimitiveTokens>()

export { definePrimitiveTokens }
