import { defineKeyframes } from "@pandacss/dev"

export const keyframes = defineKeyframes({
  accordionDown: {
    from: { height: 0 },
    to: { height: "var(--accordion-height)" },
  },
  accordionUp: {
    from: { height: "var(--accordion-height)" },
    to: { height: 0 },
  },
})
