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
import { describe, expect, test } from "vitest"

import { compileSystem, emitFiles } from "../src/index.ts"

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
  name: "test-system",
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

describe("compileSystem", () => {
  test("compiles a system definition to the expected css files", () => {
    const document = compileSystem(system, {
      target: "css",
    })
    const result = emitFiles(document.layers, {})

    expect(result.files).toEqual([
      {
        path: "tokens.css",
        contentType: "text/css",
        content: `:root {
    --jds-spacing-1: 0.25rem;
    --jds-spacing-2: 0.5rem;
    --jds-radius-md: 0.375rem;
    --jds-shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.08);
    --jds-font-size-body-md: 1rem;
    --jds-font-weight-regular: 400;
    --jds-line-height-body-md: 1.5;
    --jds-letter-spacing-tight: -0.01em;
    --jds-color-slate-50: #f8fafc;
    --jds-color-slate-900: #0f172a;
    --jds-color-surface: var(--jds-color-slate-50);
    --jds-motion-duration-fast: 120ms;
    --jds-motion-easing-standard: ease
}
.dark {
    --jds-color-surface: var(--jds-color-slate-900)
}`,
      },
      {
        path: "keyframes.css",
        contentType: "text/css",
        content: `@keyframes fadeIn {
    from {
        opacity: 0
    }
    to {
        opacity: 1
    }
}`,
      },
      {
        path: "recipes.css",
        contentType: "text/css",
        content: `.jds-button {
    animation-name: fadeIn;
    animation-duration: var(--jds-motion-duration-fast);
    animation-timing-function: var(--jds-motion-easing-standard);
    animation-fill-mode: both;
    color: var(--jds-color-surface);
    padding: var(--jds-spacing-1);
    border-radius: var(--jds-radius-md);
    font-size: var(--jds-font-size-body-md);
    line-height: var(--jds-line-height-body-md);
    font-weight: var(--jds-font-weight-regular);
    letter-spacing: var(--jds-letter-spacing-tight)
}
.jds-button:hover {
    color: var(--jds-color-slate-900)
}
.jds-button--size_sm {
    padding: var(--jds-spacing-1)
}
.jds-button--size_md {
    padding: var(--jds-spacing-2)
}
.jds-button--size_md {
    border-radius: var(--jds-radius-md)
}
.jds-tabs__root {
    color: var(--jds-color-surface)
}
.jds-tabs__trigger--tone_solid {
    color: var(--jds-color-slate-900)
}`,
      },
    ])
  })

  test("uses emit options to choose output file paths", () => {
    const document = compileSystem(system, {
      target: "css",
    })
    const result = emitFiles(document.layers, {
      outputFiles: {
        tokens: "styles/variables.css",
        keyframes: "styles/keyframes.css",
        recipes: "styles/components.css",
      },
    })

    expect(result.files.map((file) => file.path)).toEqual([
      "styles/variables.css",
      "styles/keyframes.css",
      "styles/components.css",
    ])
  })

  test("throws a clear error for missing animation references", () => {
    const invalidRecipe = defineRecipe({
      name: "button",
      base: {
        animation: "animation.missing" as never,
      },
      variants: {},
      defaultVariants: {},
    })

    const invalidSystem = defineSystem({
      name: "invalid-system",
      prefix: "jds",
      theme: {
        primitiveTokens,
        semanticTokens,
        keyframes,
        composites: {
          animations,
        },
        recipes: {
          button: invalidRecipe,
        },
      },
    })

    expect(() =>
      compileSystem(invalidSystem, {
        target: "css",
      }),
    ).toThrow('Unknown animation reference "animation.missing"')
  })
})
