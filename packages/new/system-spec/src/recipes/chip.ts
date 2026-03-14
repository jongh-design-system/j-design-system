import { defineRecipe } from "../define.ts"

export const chipRecipe = defineRecipe({
  name: "chip",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "spacing.2",
    flexShrink: 0,
    borderRadius: "radius.full",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "transparent",
    cursor: "pointer",
    whiteSpace: "nowrap",
    textDecoration: "none",
    transitionProperty: "background-color, border-color, color, box-shadow",
    transitionDuration: "motion.duration.fast",
    transitionTimingFunction: "motion.easing.standard",
    "& svg": {
      flexShrink: 0,
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
  variants: {
    variant: {
      filled: {
        backgroundColor: "color.bg.surface",
        color: "color.fg.default",
        borderColor: "color.stroke.subtle",
        _hover: {
          backgroundColor: "color.bg.subtle",
        },
      },
      outlined: {
        backgroundColor: "transparent",
        color: "color.fg.default",
        borderColor: "color.stroke.default",
        _hover: {
          backgroundColor: "color.bg.subtle",
        },
      },
    },
    size: {
      sm: {
        minHeight: "2rem",
        paddingInline: "spacing.2",
        textStyle: "typography.label.sm",
        "& svg": {
          width: "0.875rem",
          height: "0.875rem",
        },
      },
      md: {
        minHeight: "2.25rem",
        paddingInline: "spacing.3",
        textStyle: "typography.label.md",
        "& svg": {
          width: "1rem",
          height: "1rem",
        },
      },
    },
    layout: {
      withText: {},
      iconOnly: {
        paddingInline: "0",
      },
    },
  },
  compoundVariants: [
    {
      when: {
        layout: "iconOnly",
        size: "sm",
      },
      css: {
        width: "2rem",
        minHeight: "2rem",
      },
    },
    {
      when: {
        layout: "iconOnly",
        size: "md",
      },
      css: {
        width: "2.25rem",
        minHeight: "2.25rem",
      },
    },
    {
      when: {
        variant: "outlined",
        layout: "withText",
        size: "sm",
      },
      css: {
        paddingBlock: "spacing.1",
      },
    },
  ],
  defaultVariants: {
    variant: "filled",
    size: "md",
    layout: "withText",
  },
})
