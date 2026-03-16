import { defineSlotRecipe } from "../define.ts"

export const avatarRecipe = defineSlotRecipe({
  name: "avatar",
  slots: ["root", "image", "fallback"],
  base: {
    root: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      overflow: "hidden",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "color.stroke.subtle",
      borderRadius: "radius.full",
      backgroundColor: "color.bg.subtle",
      color: "color.fg.default",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    fallback: {
      display: "flex",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "color.bg.subtle",
      color: "color.fg.muted",
      textStyle: "typography.label.md",
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          width: "2rem",
          height: "2rem",
        },
        fallback: {
          textStyle: "typography.label.sm",
        },
      },
      md: {
        root: {
          width: "3rem",
          height: "3rem",
        },
      },
      lg: {
        root: {
          width: "4rem",
          height: "4rem",
        },
        fallback: {
          textStyle: "typography.title.sm",
        },
      },
    },
    shape: {
      circle: {},
      rounded: {
        root: {
          borderRadius: "radius.lg",
        },
        fallback: {
          borderRadius: "radius.lg",
        },
      },
    },
    tone: {
      neutral: {},
      accent: {
        root: {
          borderColor: "color.stroke.accent",
          backgroundColor: "color.bg.accent",
          color: "color.fg.inverse",
        },
        fallback: {
          backgroundColor: "color.bg.accent",
          color: "color.fg.inverse",
        },
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "md",
    shape: "circle",
    tone: "neutral",
  },
})
