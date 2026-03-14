import { defineSlotRecipe } from "../define.ts"

export const toastRecipe = defineSlotRecipe({
  name: "toast",
  slots: ["container", "item", "close"],
  base: {
    container: {
      position: "fixed",
      zIndex: "1000",
      display: "flex",
      flexDirection: "column",
      gap: "spacing.2",
      pointerEvents: "none",
    },
    item: {
      display: "flex",
      alignItems: "center",
      gap: "spacing.2",
      maxWidth: "24rem",
      paddingInline: "spacing.4",
      paddingBlock: "spacing.3",
      borderRadius: "radius.xl",
      boxShadow: "shadow.lg",
      pointerEvents: "auto",
      animationName: "fade-in",
      animationDuration: "motion.duration.fast",
      animationFillMode: "both",
      textStyle: "typography.body.sm",
    },
    close: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
      marginLeft: "auto",
      borderRadius: "radius.sm",
      opacity: "0.7",
      cursor: "pointer",
      transitionProperty: "opacity",
      transitionDuration: "motion.duration.fast",
      transitionTimingFunction: "motion.easing.standard",
      _hover: {
        opacity: "1",
      },
    },
  },
  variants: {
    position: {
      "top-left": {
        container: {
          top: "spacing.4",
          left: "spacing.4",
        },
      },
      "top-center": {
        container: {
          top: "spacing.4",
          left: "50%",
          transform: "translateX(-50%)",
          alignItems: "center",
        },
      },
      "top-right": {
        container: {
          top: "spacing.4",
          right: "spacing.4",
        },
      },
      "bottom-left": {
        container: {
          bottom: "spacing.4",
          left: "spacing.4",
          flexDirection: "column-reverse",
        },
      },
      "bottom-center": {
        container: {
          bottom: "spacing.4",
          left: "50%",
          transform: "translateX(-50%)",
          alignItems: "center",
          flexDirection: "column-reverse",
        },
      },
      "bottom-right": {
        container: {
          bottom: "spacing.4",
          right: "spacing.4",
          flexDirection: "column-reverse",
        },
      },
    },
    variant: {
      default: {
        item: {
          backgroundColor: "color.bg.elevated",
          color: "color.fg.default",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "color.stroke.subtle",
        },
        close: {
          color: "color.icon.muted",
        },
      },
      destructive: {
        item: {
          backgroundColor: "color.danger.default",
          color: "color.fg.inverse",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "color.danger.default",
        },
        close: {
          color: "color.fg.inverse",
        },
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    position: "bottom-right",
    variant: "default",
  },
})
