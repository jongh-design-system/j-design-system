import {
  defineKeyframes,
  definePrimitiveTokens,
  defineRecipe,
  defineSemanticTokens,
  defineSystem,
  defineTextStyles,
} from "@jongh/new-v2-system-core"
import { describe, expect, test } from "vitest"
import { ZodError } from "zod"

import { normalizeSystem } from "./system.ts"

const primitiveTokens = definePrimitiveTokens({
  color: {
    slate: {
      50: "#f8fafc",
      900: "#0f172a",
    },
  },
  spacing: {
    1: "0.25rem",
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

const buttonRecipe = defineRecipe({
  name: "button",
  base: {
    p: "spacing.1",
    _hover: {
      color: "color.slate.900",
    },
    "@media (min-width: 768px)": {
      p: "spacing.1",
    },
  },
  variants: {
    size: {
      sm: {
        p: "spacing.1",
      },
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

describe("normalizeSystem", () => {
  test("normalizes a system authored with core defineSystem", () => {
    const system = defineSystem({
      name: "test-system",
      prefix: "jds",
      theme: {
        primitiveTokens,
        semanticTokens,
        keyframes,
        composites: {
          textStyles,
        },
        recipes: {
          button: buttonRecipe,
        },
      },
    })

    expect(normalizeSystem(system)).toEqual({
      name: "test-system",
      prefix: "jds",
      tokens: {
        primitive: [
          {
            family: "spacing",
            path: "spacing.1",
            value: "0.25rem",
          },
          {
            family: "radius",
            path: "radius.md",
            value: "0.375rem",
          },
          {
            family: "shadow",
            path: "shadow.sm",
            value: "0 1px 2px rgba(15, 23, 42, 0.08)",
          },
          {
            family: "fontSize",
            path: "fontSize.bodyMd",
            value: "1rem",
          },
          {
            family: "fontWeight",
            path: "fontWeight.regular",
            value: "400",
          },
          {
            family: "lineHeight",
            path: "lineHeight.bodyMd",
            value: "1.5",
          },
          {
            family: "letterSpacing",
            path: "letterSpacing.tight",
            value: "-0.01em",
          },
          {
            family: "color",
            path: "color.slate.50",
            value: "#f8fafc",
          },
          {
            family: "color",
            path: "color.slate.900",
            value: "#0f172a",
          },
          {
            family: "motion",
            path: "motion.duration.fast",
            value: "120ms",
          },
          {
            family: "motion",
            path: "motion.easing.standard",
            value: "ease",
          },
        ],
        semantic: [
          {
            family: "color",
            path: "color.surface",
            modes: {
              base: "color.slate.50",
              dark: "color.slate.900",
            },
          },
        ],
      },
      keyframes: [
        {
          name: "fadeIn",
          frames: [
            {
              selector: "from",
              declarations: [{ property: "opacity", value: "0" }],
            },
            {
              selector: "to",
              declarations: [{ property: "opacity", value: "1" }],
            },
          ],
        },
      ],
      composites: {
        textStyles: [
          {
            name: "bodyMd",
            fontSize: "fontSize.bodyMd",
            lineHeight: "lineHeight.bodyMd",
            fontWeight: "fontWeight.regular",
            letterSpacing: "letterSpacing.tight",
          },
        ],
        animations: [],
      },
      recipes: [
        {
          kind: "recipe",
          name: "button",
          base: [
            {
              scope: [],
              property: "p",
              value: "spacing.1",
            },
            {
              scope: [
                {
                  kind: "selector",
                  value: "_hover",
                },
              ],
              property: "color",
              value: "color.slate.900",
            },
            {
              scope: [
                {
                  kind: "atRule",
                  name: "media",
                  params: "(min-width: 768px)",
                },
              ],
              property: "p",
              value: "spacing.1",
            },
          ],
          variants: [
            {
              name: "size",
              value: "sm",
              style: [
                {
                  scope: [],
                  property: "p",
                  value: "spacing.1",
                },
              ],
            },
          ],
          compoundVariants: [],
          defaultVariants: {
            size: "sm",
          },
        },
      ],
    })
  })

  test("throws a ZodError when normalized data does not match the schema", () => {
    const invalidSystem = defineSystem({
      name: "invalid-system",
      prefix: "jds",
      theme: {
        keyframes: {
          fadeIn: {
            middle: {
              opacity: "0.5",
            },
          },
        },
      },
    })

    expect(() => normalizeSystem(invalidSystem)).toThrow(ZodError)
  })
})
