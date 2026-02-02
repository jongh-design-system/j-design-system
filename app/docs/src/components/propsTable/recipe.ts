import { sva } from "@styled-system/css"

export const propsTableRecipe = sva({
  slots: ["container", "table", "thead", "tbody", "tr", "th", "td", "code"],
  base: {
    container: {
      width: "100%",
      overflowX: "auto",
      my: "6",
      border: "1px solid",
      borderColor: "border",
      rounded: "lg",
      overflow: "hidden",
      shadow: "card",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "sm",
    },
    thead: {
      bg: "muted",
    },
    tbody: {
      bg: "card",
    },
    tr: {
      borderBottom: "1px solid",
      borderBottomColor: "border",
      transition: "background",
      transitionDuration: "fast",
      _last: {
        borderBottom: "none",
      },
      _hover: {
        bg: "muted/30",
      },
    },
    th: {
      px: "4",
      py: "3",
      textAlign: "left",
      fontWeight: "semibold",
      color: "foreground",
      textStyle: "label1",
    },
    td: {
      px: "4",
      py: "3",
      color: "foreground",
      textStyle: "body2",
      verticalAlign: "top",
    },
    code: {
      bg: "muted",
      color: "primary",
      px: "1.5",
      py: "0.5",
      rounded: "sm",
      fontSize: "0.875em",
      fontFamily: "mono",
      fontWeight: "medium",
    },
  },
})
