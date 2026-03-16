import { definePrimitiveTokens } from "@jongh/new-system-core/define"

export const shadow = definePrimitiveTokens.shadow({
  sm: "0 1px 2px oklch(0 0 0 / 0.08)",
  md: "0 8px 24px oklch(0 0 0 / 0.12)",
  lg: "0 16px 40px oklch(0 0 0 / 0.18)",
} as const)
