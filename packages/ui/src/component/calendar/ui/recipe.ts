import { sva } from "@styled-system/css"

export const recipe = sva({
  slots: [
    "root",
    "header",
    "title",
    "navButton",
    "weekday",
    "daysGrid",
    "weekRow",
    "dayCell",
  ],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      borderRadius: "md",
      boxShadow: "sm",
      bg: "white",
      color: "black",
      overflow: "hidden",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "3",
    },
    title: {
      textStyle: "xl",
    },
    navButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "8",
      height: "8",
      borderRadius: "full",
      color: "gray.500",
      cursor: "pointer",
      _hover: {
        opacity: 0.8,
        bg: "gray.100",
      },
      _active: {
        opacity: 0.6,
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
        _hover: {
          bg: "transparent",
        },
      },
      "& svg": {
        width: "4",
        height: "4",
      },
    },
    weekday: {
      display: "flex",
      justifyContent: "space-between",
      padding: "2",
    },
    daysGrid: {
      display: "flex",
      flexDirection: "column",
      padding: "2",
    },
    weekRow: {
      display: "flex",
      width: "full",
      justifyContent: "space-between",
      marginBottom: "1",
      "&:last-child": {
        marginBottom: "0",
      },
    },
    dayCell: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "4",
      minHeight: "4",
      borderRadius: "md",
      fontSize: "sm",
      cursor: "pointer",
      _hover: {
        opacity: 0.8,
        bg: "gray.100",
      },
      _active: {
        opacity: 0.6,
      },
    },
  },
})
