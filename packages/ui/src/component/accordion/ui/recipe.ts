import { sva } from "@styled-system/css"

export const recipe = sva({
  slots: ["root", "item", "header", "trigger", "content"],
  base: {
    root: {
      background: "neutral",
      borderRadius: "sm",
    },
    item: {
      borderBottom: "base",
    },
    header: {
      display: "flex",
    },
    trigger: {
      alignItems: "center",
      color: "foreground.emphasized",
      cursor: "pointer",
      display: "flex",
      flex: "1",
      justifyContent: "space-between",
      px: "1",
      py: "2",
      textStyle: "heading2",
      transition: "all",

      _hover: {
        color: "primary",
      },

      "& > svg": {
        flexShrink: "0",
        h: "4",
        transition: "transform",
        transitionDuration: "normal",
        w: "4",
      },

      "&[data-state=open] > svg": {
        transform: "rotate(180deg)",
      },
    },
    content: {
      color: "foreground.muted",
      overflow: "hidden",
      textStyle: "body2",
      transition: "all",

      "&[data-state=closed]": {
        animationDuration: "normal",
        animationName: "accordion-up_radix",
      },

      "&[data-state=open]": {
        animationDuration: "normal",
        animationName: "accordion-down_radix",
      },
    },
  },
})
