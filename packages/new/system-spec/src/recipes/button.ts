import { defineRecipe } from "../define.ts"

export const buttonRecipe = defineRecipe({
  name: "button",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "spacing.2",
    minHeight: "2.5rem",
    paddingInline: "spacing.4",
    borderRadius: "radius.md",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "color.stroke.default",
    backgroundColor: "color.bg.surface",
    color: "color.fg.default",
    textStyle: "typography.label.md",
    transitionDuration: "motion.duration.fast",
    transitionTimingFunction: "motion.easing.standard",
    transitionProperty: "background-color, border-color, color, box-shadow",
    _hover: {
      backgroundColor: "color.bg.subtle",
    },
    _focusVisible: {
      outline: "2px solid var(--jds-color-focus-ring)",
      outlineOffset: "2px",
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: "0.5",
    },
  },
  variants: {
    size: {
      sm: {
        minHeight: "2.25rem",
        paddingInline: "spacing.3",
        textStyle: "typography.label.sm",
        "& svg": {
          width: "0.875rem",
          height: "0.875rem",
        },
      },
      md: {
        "& svg": {
          width: "1rem",
          height: "1rem",
        },
      },
      lg: {
        minHeight: "3rem",
        paddingInline: "spacing.5",
        "& svg": {
          width: "1.25rem",
          height: "1.25rem",
        },
      },
    },
    variant: {
      primary: {
        backgroundColor: "color.bg.accent",
        color: "color.fg.inverse",
        borderColor: "color.bg.accent",
        _hover: {
          backgroundColor: "color.bg.accent-hovered",
        },
      },
      secondary: {
        backgroundColor: "color.bg.surface",
        color: "color.fg.default",
        borderColor: "color.stroke.default",
        _hover: {
          backgroundColor: "color.bg.subtle",
        },
      },
      destructive: {
        backgroundColor: "color.danger.default",
        color: "color.fg.inverse",
        borderColor: "color.danger.default",
        _hover: {
          opacity: "0.92",
        },
      },
      outline: {
        backgroundColor: "transparent",
        color: "color.fg.default",
        borderColor: "color.stroke.default",
        _hover: {
          backgroundColor: "color.bg.subtle",
        },
      },
      link: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        color: "color.fg.accent",
        minHeight: "auto",
        paddingInline: "0",
        textDecoration: "none",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
})
