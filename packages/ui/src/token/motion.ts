import { defineTokens } from "@pandacss/dev"

export const durationTokens = defineTokens.durations({
  d1: {
    value: "50ms",
  },
  d2: {
    value: "100ms",
  },
  d3: {
    value: "150ms",
  },
  d4: {
    value: "200ms",
  },
  d5: {
    value: "250ms",
  },
  d6: {
    value: "300ms",
  },
  color: {
    transition: {
      value: "{durations.d3}",
    },
  },
  pressed: {
    scale: {
      value: "{durations.d3}",
    },
  },
})

export const easingTokens = defineTokens.easings({
  linear: {
    value: [0, 0, 1, 1],
  },
  easing: {
    value: [0.35, 0, 0.35, 1],
  },
  enter: {
    DEFAULT: {
      value: [0, 0, 0.15, 1],
    },
    expressive: {
      value: [0.03, 0.4, 0.1, 1],
    },
  },
  exit: {
    DEFAULT: {
      value: [0.35, 0, 1, 1],
    },
    expressive: {
      value: [0.35, 0, 0.95, 0.55],
    },
  },
  pressed: {
    scale: {
      value: [0, 0, 0.15, 1],
    },
  },
})
