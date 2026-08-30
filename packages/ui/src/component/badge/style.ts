import { defineSlotRecipe } from "@pandacss/dev"

export const badgeRecipe = defineSlotRecipe({
  className: "badge",
  slots: ["root", "label"],
  base: {
    root: {
      alignItems: "center",
      boxSizing: "border-box",
      display: "inline-flex",
      flexShrink: 0,
      textAlign: "start",
      userSelect: "none",
    },
    label: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          borderRadius: "r1",
          maxWidth: "[6.75rem]",
          minHeight: "[1.25rem]",
          paddingBlock: "0.5",
          paddingInline: "1.5",
          textStyle: "t1.medium",
        },
      },
      md: {
        root: {
          borderRadius: "r1_5",
          maxWidth: "[7.5rem]",
          minHeight: "[1.5rem]",
          paddingBlock: "1",
          paddingInline: "2",
          textStyle: "t2.medium",
        },
      },
    },
    variant: {
      weak: {},
      outline: {
        root: {
          borderStyle: "solid",
          borderWidth: "[1px]",
          fontWeight: "bold",
        },
      },
    },
    tone: {
      neutral: {},
      brand: {},
      informative: {},
      positive: {},
      warning: {},
      critical: {},
    },
  },
  compoundVariants: [
    {
      tone: "neutral",
      variant: "weak",
      css: {
        root: {
          bg: "bg.neutral.weak",
          color: "fg.neutral.muted",
        },
      },
    },
    {
      tone: "neutral",
      variant: "outline",
      css: {
        root: {
          borderColor: "stroke.neutral.muted",
          color: "fg.neutral.muted",
        },
      },
    },
    {
      tone: "brand",
      variant: "weak",
      css: {
        root: {
          bg: "bg.brand.weak",
          color: "fg.brand.contrast",
        },
      },
    },
    {
      tone: "brand",
      variant: "outline",
      css: {
        root: {
          borderColor: "stroke.brand.weak",
          color: "fg.brand",
        },
      },
    },
    {
      tone: "informative",
      variant: "weak",
      css: {
        root: {
          bg: "bg.informative.weak",
          color: "fg.informative.contrast",
        },
      },
    },
    {
      tone: "informative",
      variant: "outline",
      css: {
        root: {
          borderColor: "stroke.informative.weak",
          color: "fg.informative",
        },
      },
    },
    {
      tone: "positive",
      variant: "weak",
      css: {
        root: {
          bg: "bg.positive.weak",
          color: "fg.positive.contrast",
        },
      },
    },
    {
      tone: "positive",
      variant: "outline",
      css: {
        root: {
          borderColor: "stroke.positive.weak",
          color: "fg.positive",
        },
      },
    },
    {
      tone: "warning",
      variant: "weak",
      css: {
        root: {
          bg: "bg.warning.weak",
          color: "fg.warning.contrast",
        },
      },
    },
    {
      tone: "warning",
      variant: "outline",
      css: {
        root: {
          borderColor: "stroke.warning.weak",
          color: "fg.warning",
        },
      },
    },
    {
      tone: "critical",
      variant: "weak",
      css: {
        root: {
          bg: "bg.critical.weak",
          color: "fg.critical.contrast",
        },
      },
    },
    {
      tone: "critical",
      variant: "outline",
      css: {
        root: {
          borderColor: "stroke.critical.weak",
          color: "fg.critical",
        },
      },
    },
  ],
  defaultVariants: {
    size: "sm",
    variant: "weak",
    tone: "neutral",
  },
})
