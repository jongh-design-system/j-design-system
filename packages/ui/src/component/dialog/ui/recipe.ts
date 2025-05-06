import { sva } from "@styled-system/css"

export const recipe = sva({
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
      inset: "0",
      bg: "layer.overlay",
    },
    content: {
      bg: "layer.floating",
      color: "neutral.foreground",
      border: "input",
      borderRadius: "md",
      position: "fixed",
      top: "[50%]",
      left: "[50%]",
      transform: "translate(-50%,-50%)",
      width: "full",
      maxWidth: "[32rem]",
      maxHeight: "[85vh]",
      padding: "4",
      "&[data-state=open]": {
        animationName: "contentShow",
        animationDuration: "slow",
      },

      "&[data-state=closed]": {
        animationName: "fadeOut",
        animationDuration: "slow",
      },
    },
    close: {
      position: "absolute",
      right: "4",
      top: "4",
      rounded: "sm",
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
    },
    footer: {
      display: "flex",
      flexDirection: "column-reverse",
    },
    title: {
      textStyle: "heading1",
    },
    description: {
      textStyle: "body1",
    },
  },
})
