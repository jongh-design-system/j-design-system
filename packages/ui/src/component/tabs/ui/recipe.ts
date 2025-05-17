import { sva } from "@styled-system/css"

export const recipe = sva({
  slots: ["root", "list", "trigger", "content"],
  base: {
    list: {
      display: "inline-flex",
      h: "10",
      alignItems: "center",
      justifyContent: "center",
      rounded: "md",
      bg: "layer.floating",
      p: "1",
      color: "foreground.emphasized",
    },
    trigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      whiteSpace: "nowrap",
      rounded: "sm",
      px: "3",
      py: "1.5",
      textStyle: "sm",
      fontWeight: "medium",
      transition: "all",
      cursor: "pointer",

      _disabled: {
        pointerEvents: "none",
        opacity: "50%",
      },

      "&:is([data-state=active])": {
        bg: "background",
        color: "foreground",
        shadow: "sm",
      },
    },
    content: {
      mt: "2",
    },
  },
})
