import { definePrimitiveTokens } from "../../../system-core/src/define.ts"

export const motion = definePrimitiveTokens.motion({
  duration: {
    fast: "120ms",
    normal: "180ms",
    slow: "280ms",
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    emphasized: "cubic-bezier(0.2, 0, 0, 1.1)",
  },
} as const)
