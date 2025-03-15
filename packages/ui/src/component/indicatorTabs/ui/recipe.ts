import { sva } from "@styled-system/css"

export const recipe = sva({
  slots: ["root", "list", "trigger", "content", "indicator"],
  base: {
    list: {
      display: "inline-flex",
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      gap: "6",
      width: "full",
      borderBottom: "input",
    },
    trigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      whiteSpace: "nowrap",
      px: "1",
      py: "3",
      pb: "2",
      textStyle: "md",
      cursor: "pointer",
      position: "relative",

      _hover: {
        fontWeight: "semibold",
      },

      "&:is([data-state=active])": {
        color: "secondary",
        fontWeight: "semibold",
      },
    },
    content: {
      mt: "4",
    },
    indicator: {
      position: "absolute",
      bottom: "0",
      left: "0",
      height: "[2px]",
      width: "var(--indicator-width)",
      transform: "translateX(var(--indicator-left))",
      background: "secondary",
      borderRadius: "sm",
      transition: "transform",
      transitionTimingFunction: "linear",
    },
  },
})
