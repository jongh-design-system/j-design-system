import { definePrimitiveTokens } from "@jongh/new-system-core/define"

import {
  defineRecipe,
  defineSemanticTokens,
  defineSlotRecipe,
} from "./define.ts"

export const typeSafetyValidRecipe = defineRecipe({
  name: "type-safety-valid-recipe",
  base: {
    backgroundColor: "color.bg.surface",
    color: "color.fg.default",
    textStyle: "typography.body.md",
    borderRadius: "radius.md",
    gap: "spacing.2",
    transitionDuration: "motion.duration.fast",
  },
  variants: {},
  defaultVariants: {},
})

export const typeSafetyValidSlotRecipe = defineSlotRecipe({
  name: "type-safety-valid-slot-recipe",
  slots: ["root"],
  base: {
    root: {
      backgroundColor: "color.bg.subtle",
      color: "#111111",
    },
  },
  variants: {},
  defaultVariants: {},
})

export const typeSafetyInvalidColorTokenRecipe = defineRecipe({
  name: "type-safety-invalid-color-token",
  base: {
    // @ts-expect-error unknown semantic color token must fail at authoring time
    backgroundColor: "color.bg.missing",
  },
  variants: {},
  defaultVariants: {},
})

export const typeSafetyInvalidColorLiteralRecipe = defineRecipe({
  name: "type-safety-invalid-color-literal",
  base: {
    // @ts-expect-error arbitrary strings are not accepted as color values
    backgroundColor: "definitely-not-a-color",
  },
  variants: {},
  defaultVariants: {},
})

export const typeSafetyInvalidTextStyleRecipe = defineRecipe({
  name: "type-safety-invalid-text-style",
  base: {
    // @ts-expect-error unknown typography token must fail at authoring time
    textStyle: "typography.body.xl",
  },
  variants: {},
  defaultVariants: {},
})

export const typeSafetyInvalidSlotColorRecipe = defineSlotRecipe({
  name: "type-safety-invalid-slot-color",
  slots: ["root"],
  base: {
    root: {
      // @ts-expect-error invalid slot color token must fail at authoring time
      color: "color.fg.ghost",
    },
  },
  variants: {},
  defaultVariants: {},
})

export const typeSafetyValidPrimitiveRadiusTokens =
  definePrimitiveTokens.radius({
    sm: "0.25rem",
    md: "0.5rem",
  })

export const typeSafetyInvalidPrimitiveTypographyTokens =
  definePrimitiveTokens.typography({
    body: {
      // @ts-expect-error typography leaf must include fontWeight
      md: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
      },
    },
  })

export const typeSafetyValidSemanticColorTokens = defineSemanticTokens.color({
  surface: {
    light: "color.slate.100",
    dark: "color.slate.900",
  },
})

export const typeSafetyInvalidSemanticColorPath = defineSemanticTokens.color({
  broken: {
    // @ts-expect-error unknown primitive color token must fail at authoring time
    light: "color.sky.999",
    dark: "color.sky.500",
  },
})

export const typeSafetyInvalidSemanticFamilyReference =
  defineSemanticTokens.spacing({
    inline: {
      md: {
        // @ts-expect-error semantic spacing token cannot reference radius tokens
        light: "radius.md",
        dark: "spacing.4",
      },
    },
  })
