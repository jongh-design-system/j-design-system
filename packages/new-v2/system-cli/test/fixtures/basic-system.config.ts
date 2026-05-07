import {
  defineAnimations,
  defineKeyframes,
  definePrimitiveTokens,
  defineRecipe,
  defineSemanticTokens,
  defineSlotRecipe,
  defineSystem,
  defineTextStyles,
} from "@jongh/new-v2-system-core"

const primitiveTokens = definePrimitiveTokens({
  color: {
    slate: {
      50: "#f8fafc",
      900: "#0f172a",
    },
  },
  spacing: {
    1: "0.25rem",
    2: "0.5rem",
  },
  radius: {
    md: "0.375rem",
  },
  shadow: {
    sm: "0 1px 2px rgba(15, 23, 42, 0.08)",
  },
  motion: {
    duration: {
      fast: "120ms",
    },
    easing: {
      standard: "ease",
    },
  },
  fontSize: {
    bodyMd: "1rem",
  },
  fontWeight: {
    regular: "400",
  },
  lineHeight: {
    bodyMd: "1.5",
  },
  letterSpacing: {
    tight: "-0.01em",
  },
})

const semanticTokens = defineSemanticTokens({
  color: {
    surface: {
      base: "color.slate.50",
      dark: "color.slate.900",
    },
  },
})

const textStyles = defineTextStyles({
  bodyMd: {
    fontSize: "fontSize.bodyMd",
    lineHeight: "lineHeight.bodyMd",
    fontWeight: "fontWeight.regular",
    letterSpacing: "letterSpacing.tight",
  },
})

const keyframes = defineKeyframes({
  fadeIn: {
    from: {
      opacity: "0",
    },
    to: {
      opacity: "1",
    },
  },
})

const animations = defineAnimations({
  fadeInFast: {
    keyframes: "keyframes.fadeIn",
    duration: "motion.duration.fast",
    easing: "motion.easing.standard",
    fillMode: "both",
  },
})

const buttonRecipe = defineRecipe({
  name: "button",
  base: {
    animation: "animation.fadeInFast",
    color: "color.surface",
    p: "spacing.1",
    rounded: "radius.md",
    textStyle: "textStyle.bodyMd",
    _hover: {
      color: "color.slate.900",
    },
  },
  variants: {
    size: {
      sm: {
        p: "spacing.1",
      },
      md: {
        p: "spacing.2",
      },
    },
  },
  compoundVariants: [
    {
      when: {
        size: "md",
      },
      css: {
        rounded: "radius.md",
      },
    },
  ],
  defaultVariants: {
    size: "sm",
  },
})

const tabsRecipe = defineSlotRecipe({
  name: "tabs",
  slots: ["root", "trigger"] as const,
  base: {
    root: {
      color: "color.surface",
    },
  },
  variants: {
    tone: {
      solid: {
        trigger: {
          color: "color.slate.900",
        },
      },
    },
  },
  defaultVariants: {
    tone: "solid",
  },
})

const system = defineSystem({
  name: "basic-system",
  prefix: "jds",
  theme: {
    primitiveTokens,
    semanticTokens,
    keyframes,
    composites: {
      textStyles,
      animations,
    },
    recipes: {
      button: buttonRecipe,
      tabs: tabsRecipe,
    },
  },
})

export default {
  system,
  outdir: "styled-system",
  options: {
    outputFiles: {
      tokens: "variables.css",
      keyframes: "motion.css",
      recipes: "components.css",
    },
  },
}
