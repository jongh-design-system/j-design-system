import { defineSlotRecipe } from "@pandacss/dev"

export const dialogRecipe = defineSlotRecipe({
  className: "dialog",
  slots: [
    "root",
    "trigger",
    "portal",
    "overlay",
    "close",
    "content",
    "header",
    "footer",
    "title",
    "description",
  ],
  base: {
    overlay: {
      position: "fixed",
      inset: "[0]",
      bg: "bg.overlay",
      "&[data-state=open]": {
        animationName: "fadeIn",
        animationDuration: "d5",
        animationTimingFunction: "enter",
      },
      "&[data-state=closed]": {
        animationName: "fadeOut",
        animationDuration: "d3",
        animationTimingFunction: "exit",
      },
    },
    content: {
      bg: "bg.layer.floating",
      color: "fg.neutral",
      border: "[1px_solid]",
      borderColor: "stroke.neutral.weak",
      borderRadius: "r1_5",
      position: "fixed",
      top: "[50%]",
      left: "[50%]",
      transform: "translate(-50%,-50%)",
      width: "[100%]",
      maxWidth: "[32rem]",
      maxHeight: "[85vh]",
      zIndex: "1000",
      padding: "4",
      overflow: "auto",
      overscrollBehavior: "contain",
      "&[data-state=open]": {
        animationName: "contentShow",
        animationDuration: "d5",
        animationTimingFunction: "enter",
      },

      "&[data-state=closed]": {
        animationName: "contentHide",
        animationDuration: "d3",
        animationTimingFunction: "exit",
      },
    },
    close: {
      position: "absolute",
      right: "4",
      top: "4",
      rounded: "r1",
      opacity: "0.7",
      transition: "opacity",
      cursor: "pointer",
      _hover: {
        opacity: "1",
      },

      _disabled: {
        pointerEvents: "none",
      },
    },
    header: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
      color: "fg.neutral",
      textStyle: "t5.bold",
    },
    footer: {
      display: "flex",
      flexDirection: "column-reverse",
      color: "fg.neutral.muted",
    },
    title: {
      textStyle: "t6.bold",
    },
    description: {
      textStyle: "t5.regular",
      color: "fg.neutral",
    },
  },
})
