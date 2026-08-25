import { defineSlotRecipe } from "@pandacss/dev"

export const avatarRecipe = defineSlotRecipe({
  className: "avatar",
  slots: ["root", "image", "fallback"],
  base: {
    root: {
      position: "relative",
      display: "flex",
      h: "[3rem]",
      w: "[3rem]",
      flexShrink: "0",
      overflow: "hidden",
      rounded: "full",

      _after: {
        content: '""',
        position: "absolute",
        inset: "[0]",
        borderWidth: "[1px]",
        borderStyle: "solid",
        borderColor: "stroke.neutral.subtle",
        rounded: "full",
        pointerEvents: "none",
      },
    },
    image: {
      display: "block",
      aspectRatio: "square",
      h: "[100%]",
      w: "[100%]",
      objectFit: "cover",
    },
    fallback: {
      display: "flex",
      h: "[100%]",
      w: "[100%]",
      alignItems: "center",
      justifyContent: "center",
      rounded: "full",
      bg: "bg.neutral.weak",
      color: "fg.neutral",
    },
  },
})
