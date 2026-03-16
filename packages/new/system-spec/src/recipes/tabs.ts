import { defineSlotRecipe } from "../define.ts"

export const tabsRecipe = defineSlotRecipe({
  name: "tabs",
  slots: ["root", "list", "trigger", "content"],
  base: {
    root: {
      width: "100%",
    },
    list: {
      display: "inline-flex",
      alignItems: "center",
      gap: "spacing.1",
      padding: "spacing.1",
      borderRadius: "radius.md",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "color.stroke.subtle",
      backgroundColor: "color.bg.surface",
    },
    trigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "2.25rem",
      paddingInline: "spacing.3",
      borderRadius: "radius.sm",
      color: "color.fg.muted",
      cursor: "pointer",
      textStyle: "typography.label.sm",
      transitionProperty: "background-color, color, box-shadow",
      transitionDuration: "motion.duration.fast",
      transitionTimingFunction: "motion.easing.standard",
      "&[data-state='active']": {
        backgroundColor: "color.bg.canvas",
        color: "color.fg.default",
        boxShadow: "shadow.sm",
      },
    },
    content: {
      marginTop: "spacing.4",
      color: "color.fg.default",
      textStyle: "typography.body.md",
    },
  },
  variants: {
    size: {
      sm: {
        trigger: {
          minHeight: "2rem",
          paddingInline: "spacing.2",
          textStyle: "typography.label.sm",
        },
      },
      md: {},
    },
    tone: {
      neutral: {},
      accent: {
        trigger: {
          "&[data-state='active']": {
            color: "color.fg.accent",
          },
        },
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "md",
    tone: "neutral",
  },
})
