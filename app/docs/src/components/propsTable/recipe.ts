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
      _last: {
        borderBottom: "none",
      },
    },
    th: {
      px: "4",
      py: "3",
      textAlign: "left",
      fontWeight: "semibold",
      color: "foreground",
      textStyle: "label1",
      borderRight: "1px solid",
      borderRightColor: "border",
      _last: {
        borderRight: "none",
      },
    },
    td: {
      px: "4",
      py: "3",
      color: "foreground",
      textStyle: "body2",
      verticalAlign: "top",
      borderRight: "1px solid",
      borderRightColor: "border",
      _last: {
        borderRight: "none",
      },
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
