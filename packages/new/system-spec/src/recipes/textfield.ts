import { defineSlotRecipe } from "../define.ts"

export const textfieldRecipe = defineSlotRecipe({
  name: "textfield",
  slots: ["root", "heading", "container", "input", "trailingButton", "helper"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "spacing.2",
      width: "100%",
    },
    heading: {
      color: "color.fg.default",
      textStyle: "typography.label.sm",
    },
    container: {
      display: "flex",
      width: "100%",
      minHeight: "3rem",
      alignItems: "center",
      gap: "spacing.2",
      paddingInline: "spacing.3",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "color.stroke.default",
      borderRadius: "radius.md",
      backgroundColor: "color.bg.elevated",
      boxShadow: "shadow.sm",
      transitionProperty: "border-color, box-shadow, background-color",
      transitionDuration: "motion.duration.fast",
      transitionTimingFunction: "motion.easing.standard",
      "&:focus-within": {
        borderColor: "color.stroke.accent",
      },
      "&[data-disabled], &:has(input:disabled)": {
        cursor: "not-allowed",
        opacity: 0.7,
      },
    },
    input: {
      width: "100%",
      flex: 1,
      minWidth: "0",
      border: "none",
      outline: "none",
      backgroundColor: "transparent",
      color: "color.fg.default",
      textStyle: "typography.body.md",
      "&::placeholder": {
        color: "color.fg.subtle",
      },
      _disabled: {
        cursor: "not-allowed",
      },
    },
    trailingButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "color.icon.muted",
    },
    helper: {
      color: "color.fg.muted",
      textStyle: "typography.body.sm",
    },
  },
  variants: {
    status: {
      normal: {},
      negative: {
        container: {
          borderColor: "color.danger.default",
          "&:focus-within": {
            borderColor: "color.danger.default",
            boxShadow: "0 0 0 1px var(--jds-color-danger-default)",
          },
        },
        helper: {
          color: "color.danger.default",
        },
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    status: "normal",
  },
})
