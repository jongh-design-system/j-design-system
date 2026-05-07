import { assertType, expectTypeOf, test } from "vitest"

import {
  type AnimationReference,
  defineAnimations,
  defineKeyframes,
  definePreset,
  definePrimitiveTokens,
  defineRecipe,
  defineSemanticTokens,
  defineSlotRecipe,
  defineSystem,
  defineTextStyles,
  type KeyframesReference,
  type PrimitiveFamilyPath,
  type PrimitiveTokenPath,
  type StyleObject,
  type SystemDefinition,
  type TextStyleReference,
  type TokenSource,
} from "../src/index.ts"

const primitiveTokens = definePrimitiveTokens({
  color: {
    transparent: "transparent",
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
    sm: "0 1px 2px rgba(0, 0, 0, 0.08)",
  },
  motion: {
    duration: {
      fast: "120ms",
      slow: "400ms",
    },
    easing: {
      standard: "ease",
      emphasized: "cubic-bezier(0.2, 0, 0, 1)",
    },
  },
  fontSize: {
    bodyMd: "1rem",
    titleLg: "1.5rem",
  },
  fontWeight: {
    regular: "400",
    bold: "700",
  },
  lineHeight: {
    bodyMd: "1.5",
    titleLg: "1.2",
  },
  letterSpacing: {
    tight: "-0.01em",
  },
})

const semanticTokens = defineSemanticTokens({
  color: {
    surface: {
      base: "color.slate.50",
      contrast: "color.slate.900",
      raw: "#ffffff",
    },
  },
  spacing: {
    layout: {
      base: 12,
      compact: "0.75rem",
    },
  },
})

const textStyles = defineTextStyles({
  body: {
    md: {
      fontSize: "fontSize.bodyMd",
      lineHeight: "lineHeight.bodyMd",
      fontWeight: "fontWeight.regular",
      letterSpacing: "letterSpacing.tight",
    },
  },
  title: {
    lg: {
      fontSize: "1.5rem",
      lineHeight: 1.2,
      fontWeight: 700,
    },
  },
})

const keyframes = defineKeyframes({
  fadeIn: {
    from: {
      opacity: "0",
    },
    "50%": {
      opacity: "0.5",
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
  rawFade: {
    keyframes: "fade-in",
    duration: "120ms",
    easing: "ease",
    iterationCount: 2,
  },
})

const buttonRecipe = defineRecipe({
  name: "button",
  base: {
    animation: "animation.fadeInFast",
    color: "#0f172a",
    p: "spacing.2",
    rounded: "radius.md",
    textStyle: "textStyle.body.md",
    _hover: {
      color: "color.surface",
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
    tone: {
      solid: {
        color: "color.surface",
      },
      ghost: {
        color: "currentColor",
      },
    },
  },
  compoundVariants: [
    {
      when: {
        size: "md",
        tone: "solid",
      },
      css: {
        fontSize: "fontSize.bodyMd",
      },
    },
  ],
  defaultVariants: {
    size: "sm",
    tone: "solid",
  },
})

const tabsRecipe = defineSlotRecipe({
  name: "tabs",
  slots: ["root", "trigger", "content"],
  base: {
    root: {
      color: "color.surface",
    },
    trigger: {
      p: "spacing.1",
    },
  },
  variants: {
    tone: {
      solid: {
        trigger: {
          color: "color.slate.900",
        },
        content: {
          textStyle: "textStyle.body.md",
        },
      },
    },
  },
  compoundVariants: [
    {
      when: {
        tone: "solid",
      },
      css: {
        trigger: {
          fontWeight: "700",
        },
      },
    },
  ],
  defaultVariants: {
    tone: "solid",
  },
})

const colorOnlyPrimitiveTokens = definePrimitiveTokens({
  color: {
    slate: {
      50: "#f8fafc",
    },
  },
})

test("primitive token types preserve literals, allow partial families, and reject malformed token trees", () => {
  expectTypeOf(primitiveTokens.color.slate[50]).toEqualTypeOf<"#f8fafc">()
  expectTypeOf(primitiveTokens.motion.duration.fast).toEqualTypeOf<"120ms">()
  expectTypeOf(
    colorOnlyPrimitiveTokens.color.slate[50],
  ).toEqualTypeOf<"#f8fafc">()
  expectTypeOf<
    PrimitiveFamilyPath<typeof primitiveTokens, "spacing">
  >().toEqualTypeOf<"spacing.1" | "spacing.2">()
  expectTypeOf<
    PrimitiveTokenPath<typeof colorOnlyPrimitiveTokens>
  >().toEqualTypeOf<"color.slate.50">()
  expectTypeOf<PrimitiveTokenPath<typeof primitiveTokens>>().toEqualTypeOf<
    | "color.transparent"
    | "color.slate.50"
    | "color.slate.900"
    | "spacing.1"
    | "spacing.2"
    | "radius.md"
    | "shadow.sm"
    | "motion.duration.fast"
    | "motion.duration.slow"
    | "motion.easing.standard"
    | "motion.easing.emphasized"
    | "fontSize.bodyMd"
    | "fontSize.titleLg"
    | "fontWeight.regular"
    | "fontWeight.bold"
    | "lineHeight.bodyMd"
    | "lineHeight.titleLg"
    | "letterSpacing.tight"
  >()

  assertType(
    definePrimitiveTokens({
      color: {
        // @ts-expect-error primitive token leaf values must be css-compatible scalars
        invalid: false,
      },
    }),
  )
})

test("semantic tokens keep authored values and reject invalid mode values", () => {
  expectTypeOf(
    semanticTokens.color.surface.base,
  ).toEqualTypeOf<"color.slate.50">()
  expectTypeOf(semanticTokens.color.surface.raw).toEqualTypeOf<"#ffffff">()
  expectTypeOf(semanticTokens.spacing.layout.base).toEqualTypeOf<12>()

  assertType(
    defineSemanticTokens({
      color: {
        surface: {
          // @ts-expect-error semantic mode values must be strings
          base: false,
        },
      },
    }),
  )
})

test("text style types support token references and raw values while enforcing shape", () => {
  expectTypeOf(textStyles.body.md.fontSize).toEqualTypeOf<"fontSize.bodyMd">()
  expectTypeOf(textStyles.title.lg.lineHeight).toEqualTypeOf<1.2>()
  expectTypeOf<TextStyleReference<typeof textStyles>>().toEqualTypeOf<
    "textStyle.body.md" | "textStyle.title.lg"
  >()

  assertType(
    defineTextStyles({
      body: {
        // @ts-expect-error text styles require fontSize, lineHeight, and fontWeight
        md: {
          fontSize: "fontSize.bodyMd",
          lineHeight: "lineHeight.bodyMd",
        },
      },
    }),
  )

  assertType(
    defineTextStyles({
      body: {
        md: {
          fontSize: "fontSize.bodyMd",
          lineHeight: "lineHeight.bodyMd",
          // @ts-expect-error text style values must be string or number
          fontWeight: false,
        },
      },
    }),
  )
})

test("keyframes and animations preserve references and reject invalid shapes", () => {
  expectTypeOf(keyframes.fadeIn["50%"]?.opacity).toEqualTypeOf<"0.5">()
  expectTypeOf<
    KeyframesReference<typeof keyframes>
  >().toEqualTypeOf<"keyframes.fadeIn">()
  expectTypeOf(
    animations.fadeInFast.keyframes,
  ).toEqualTypeOf<"keyframes.fadeIn">()
  expectTypeOf<AnimationReference<typeof animations>>().toEqualTypeOf<
    "animation.fadeInFast" | "animation.rawFade"
  >()

  assertType(
    defineKeyframes({
      fadeIn: {
        // @ts-expect-error keyframe selectors are from, to, or percentages
        middle: {
          opacity: "0.5",
        },
      },
    }),
  )

  assertType(
    defineKeyframes({
      fadeIn: {
        from: {
          // @ts-expect-error keyframe declaration values must be strings
          opacity: 0,
        },
      },
    }),
  )

  assertType(
    defineAnimations({
      // @ts-expect-error animations require keyframes, duration, and easing
      invalid: {
        keyframes: "keyframes.fadeIn",
        duration: "120ms",
      },
    }),
  )

  assertType(
    defineAnimations({
      invalid: {
        keyframes: "keyframes.fadeIn",
        duration: "120ms",
        easing: "ease",
        // @ts-expect-error animation values must be string or number
        delay: false,
      },
    }),
  )
})

test("style object values accept css values and token references for the matching property category", () => {
  assertType<StyleObject>({
    animation: "animation.fadeInFast",
    animationDuration: "motion.duration.fast",
    animationTimingFunction: "motion.easing.standard",
    backgroundColor: "#ffffff",
    bg: "var(--surface)",
    borderColor: "rgb(15 23 42)",
    borderRadius: "999px",
    boxShadow: "shadow.sm",
    color: "color.slate.900",
    fontSize: "fontSize.bodyMd",
    margin: "2rem",
    p: "spacing.1",
    rounded: "radius.md",
    textStyle: "textStyle.body.md",
    transitionDuration: "120ms",
    transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
    width: "calc(100% - 1rem)",
    _hover: {
      color: "#ffffff",
      p: "0",
    },
    "@media (min-width: 768px)": {
      p: "2rem",
    },
  })
})

test("style object values reject values from the wrong property category", () => {
  assertType<StyleObject>({
    // @ts-expect-error color accepts css colors or color token references only
    color: "spacing.1",
  })

  assertType<StyleObject>({
    // @ts-expect-error color does not accept numbers
    color: 12,
  })

  assertType<StyleObject>({
    // @ts-expect-error color does not accept arbitrary non-color strings
    color: "not-a-color",
  })

  assertType<StyleObject>({
    // @ts-expect-error spacing properties accept css dimensions or spacing token references only
    p: "color.slate.50",
  })

  assertType<StyleObject>({
    // @ts-expect-error spacing properties do not accept raw numbers
    p: 12,
  })

  assertType<StyleObject>({
    // @ts-expect-error radius properties accept css radius values or radius token references only
    rounded: "spacing.1",
  })

  assertType<StyleObject>({
    // @ts-expect-error duration properties accept css time values or duration token references only
    animationDuration: "motion.easing.standard",
  })

  assertType<StyleObject>({
    // @ts-expect-error easing properties accept css timing functions or easing token references only
    animationTimingFunction: "motion.duration.fast",
  })

  assertType<StyleObject>({
    // @ts-expect-error fontSize accepts css font sizes or fontSize token references only
    fontSize: "color.slate.50",
  })

  assertType<StyleObject>({
    // @ts-expect-error textStyle accepts textStyle references only
    textStyle: "color.slate.50",
  })

  assertType<StyleObject>({
    // @ts-expect-error unknown style properties are rejected
    unknownProperty: "value",
  })

  assertType<StyleObject>({
    // @ts-expect-error zIndex accepts number-like values only
    zIndex: "top",
  })
})

test("recipe types preserve variants and reject invalid variant selections", () => {
  expectTypeOf(buttonRecipe.name).toEqualTypeOf<"button">()
  expectTypeOf(buttonRecipe.base.p).toEqualTypeOf<"spacing.2">()
  expectTypeOf(buttonRecipe.variants.size.sm.p).toEqualTypeOf<"spacing.1">()
  expectTypeOf(buttonRecipe.defaultVariants.size).toEqualTypeOf<"sm">()
  expectTypeOf<
    NonNullable<typeof buttonRecipe.compoundVariants>[number]["when"]["tone"]
  >().toEqualTypeOf<"solid">()

  assertType(
    defineRecipe({
      name: "invalid-button",
      base: {},
      variants: {
        size: {
          sm: {},
        },
      },
      defaultVariants: {
        // @ts-expect-error defaultVariants only accepts declared variant values
        size: "md",
      },
    }),
  )

  assertType(
    defineRecipe({
      name: "invalid-button",
      base: {},
      variants: {
        size: {
          sm: {},
        },
      },
      defaultVariants: {
        // @ts-expect-error defaultVariants only accepts declared variant keys
        tone: "solid",
      },
    }),
  )

  assertType(
    defineRecipe({
      name: "invalid-button",
      base: {},
      variants: {
        size: {
          sm: {},
        },
      },
      compoundVariants: [
        {
          when: {
            // @ts-expect-error compoundVariants only accepts declared variant values
            size: "lg",
          },
          css: {},
        },
      ],
      defaultVariants: {
        size: "sm",
      },
    }),
  )
})

test("slot recipe types preserve slots and reject unknown slot names", () => {
  expectTypeOf<(typeof tabsRecipe.slots)[number]>().toEqualTypeOf<
    "root" | "trigger" | "content"
  >()
  expectTypeOf(
    tabsRecipe.variants.tone.solid.content?.textStyle,
  ).toEqualTypeOf<"textStyle.body.md">()

  assertType(
    defineSlotRecipe({
      name: "invalid-tabs",
      slots: ["root", "trigger"],
      base: {
        // @ts-expect-error base only accepts declared slots
        content: {},
      },
      variants: {},
      defaultVariants: {},
    }),
  )

  assertType(
    defineSlotRecipe({
      name: "invalid-tabs",
      slots: ["root", "trigger"],
      base: {},
      variants: {
        tone: {
          solid: {
            // @ts-expect-error variants only accepts declared slots
            content: {},
          },
        },
      },
      defaultVariants: {
        tone: "solid",
      },
    }),
  )

  assertType(
    defineSlotRecipe({
      name: "invalid-tabs",
      slots: ["root", "trigger"],
      base: {},
      variants: {
        tone: {
          solid: {
            trigger: {},
          },
        },
      },
      defaultVariants: {
        // @ts-expect-error slot recipe defaultVariants only accepts declared variant values
        tone: "ghost",
      },
    }),
  )
})

test("system types preserve authored sections and reject missing required system fields", () => {
  const preset = definePreset({
    semanticTokens,
    keyframes,
    composites: {
      textStyles,
      animations,
    },
    recipes: {
      button: buttonRecipe,
    },
  })

  const system = defineSystem({
    name: "test-system",
    prefix: "jds",
    presets: [preset],
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

  type Source = {
    primitiveTokens: typeof primitiveTokens
    semanticTokens: typeof semanticTokens
  }

  expectTypeOf<Source>().toExtend<TokenSource>()
  expectTypeOf(system).toExtend<SystemDefinition>()
  expectTypeOf(system.name).toEqualTypeOf<"test-system">()
  expectTypeOf(
    system.theme.composites.textStyles.body.md.fontSize,
  ).toEqualTypeOf<"fontSize.bodyMd">()
  expectTypeOf(system.theme.recipes.tabs).toExtend<typeof tabsRecipe>()

  assertType(
    // @ts-expect-error systems require name, prefix, and theme
    defineSystem({
      name: "missing-prefix",
      theme: {},
    }),
  )
})
