import { definePrimitiveTokens } from "../../../system-core/src/define.ts"
import { palette } from "./color/palette.ts"
import { motion } from "./motion.ts"
import { radius } from "./radius.ts"
import { shadow } from "./shadow.ts"
import { spacing } from "./spacing.ts"
import { typography } from "./typography.ts"

export const primitiveTokens = definePrimitiveTokens({
  color: palette,
  spacing,
  radius,
  typography,
  shadow,
  motion,
})

export type NativePrimitiveTokens = typeof primitiveTokens
