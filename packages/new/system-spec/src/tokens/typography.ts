import { definePrimitiveTokens } from "../../../system-core/src/define.ts"

export const typography = definePrimitiveTokens.typography({
  body: {
    sm: {
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
      fontWeight: "400",
    },
    md: {
      fontSize: "1rem",
      lineHeight: "1.5rem",
      fontWeight: "400",
    },
  },
  label: {
    sm: {
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
      fontWeight: "500",
    },
    md: {
      fontSize: "1rem",
      lineHeight: "1.5rem",
      fontWeight: "600",
    },
  },
  title: {
    sm: {
      fontSize: "1.125rem",
      lineHeight: "1.5rem",
      fontWeight: "600",
    },
    md: {
      fontSize: "1.25rem",
      lineHeight: "1.75rem",
      fontWeight: "700",
    },
    lg: {
      fontSize: "1.5rem",
      lineHeight: "2rem",
      fontWeight: "700",
    },
  },
} as const)
