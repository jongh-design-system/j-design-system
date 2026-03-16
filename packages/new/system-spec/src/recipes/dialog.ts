import { defineSlotRecipe } from "../define.ts"

export const dialogRecipe = defineSlotRecipe({
  name: "dialog",
  slots: [
    "trigger",
    "overlay",
    "content",
    "close",
    "header",
    "title",
    "description",
    "footer",
  ],
  base: {
    trigger: {},
    overlay: {
      position: "fixed",
      inset: "0",
      backgroundColor: "color.overlay.default",
      opacity: "0.55",
    },
    content: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "min(32rem, calc(100vw - 2rem))",
      padding: "spacing.6",
      borderRadius: "radius.lg",
      backgroundColor: "color.bg.elevated",
      color: "color.fg.default",
      boxShadow: "shadow.lg",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "color.stroke.subtle",
      zIndex: "1000",
      overflow: "auto",
    },
    close: {
      position: "absolute",
      top: "spacing.4",
      right: "spacing.4",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "2rem",
      height: "2rem",
      borderRadius: "radius.sm",
      color: "color.icon.muted",
      cursor: "pointer",
      transitionProperty: "background-color, color, opacity",
      transitionDuration: "motion.duration.fast",
      transitionTimingFunction: "motion.easing.standard",
      _hover: {
        backgroundColor: "color.bg.subtle",
        color: "color.icon.default",
      },
      _disabled: {
        pointerEvents: "none",
        opacity: "0.5",
      },
    },
    header: {
      display: "grid",
      gap: "spacing.2",
    },
    title: {
      textStyle: "typography.title.md",
    },
    description: {
      color: "color.fg.muted",
      textStyle: "typography.body.md",
    },
    footer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "spacing.3",
      marginTop: "spacing.6",
    },
  },
  variants: {
    tone: {
      default: {},
      accent: {
        content: {
          borderColor: "color.stroke.accent",
        },
        title: {
          color: "color.fg.accent",
        },
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    tone: "default",
  },
})
