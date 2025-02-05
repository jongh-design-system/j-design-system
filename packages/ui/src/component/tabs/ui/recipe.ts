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
      bg: "muted",
      p: "1",
      color: "muted.foreground",
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
      ringColor: "background",

      _focusVisible: {
        ringWidth: "1",
        ringColor: "ring",
        ringOffset: "1",
      },

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
      ringColor: "background",

      _focusVisible: {
        outlineWidth: "2",
        outlineOffset: "2",
        ringWidth: "2",
        ringColor: "ring",
      },
    },
  },
})
