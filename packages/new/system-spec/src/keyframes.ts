export const keyframes = {
  "accordion-down_radix": {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up_radix": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
  "fade-in": {
    from: { opacity: "0" },
    to: { opacity: "1" },
  },
} as const
