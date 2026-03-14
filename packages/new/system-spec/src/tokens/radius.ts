import { definePrimitiveTokens } from "../../../system-core/src/define.ts"

export const radius = definePrimitiveTokens.radius({
  none: "0px",
  xs: "0.125rem",
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  full: "9999px",
} as const)
