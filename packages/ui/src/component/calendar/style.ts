import { defineSlotRecipe } from "@pandacss/dev"

export const calendarRecipe = defineSlotRecipe({
  className: "calendar",
  slots: [
    "root",
    "header",
    "title",
    "navButton",
    "weekdayRow",
    "weekday",
    "daysGrid",
    "weekRow",
    "dayWrapper",
    "dayCell",
  ],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      borderRadius: "r1_5",
      boxShadow: "s1",
      bg: "bg.layer.floating",
      color: "fg.neutral",
      overflow: "hidden",
      width: "[21rem]",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "3",
    },
    title: {
      textStyle: "t5.bold",
    },
    navButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "[2rem]",
      height: "[2rem]",
      borderRadius: "full",
      color: "fg.neutral.muted",
      cursor: "pointer",
      outline: "2px solid transparent",
      outlineOffset: "[-2px]",
      "@media (hover: hover) and (pointer: fine)": {
        _hover: {
          bg: "bg.transparent.pressed",
        },
      },
      _active: {
        bg: "bg.transparent.pressed",
      },
      _focusVisible: {
        outlineColor: "stroke.focus.ring",
      },
      _disabled: {
        color: "fg.disabled",
        cursor: "not-allowed",
      },
      "& svg": {
        width: "[1rem]",
        height: "[1rem]",
      },
    },
    weekdayRow: {
      display: "grid",
      gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    },
    weekday: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "[3rem]",
      color: "fg.neutral.subtle",
      textStyle: "t4.medium",
    },
    daysGrid: {
      width: "[100%]",
      borderCollapse: "collapse",
      tableLayout: "fixed",
    },
    weekRow: {
      width: "[100%]",
    },
    dayWrapper: {
      width: "[3rem]",
      height: "[3rem]",
      padding: "[0]",
      textAlign: "center",
    },
    dayCell: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "[2.625rem]",
      height: "[2.625rem]",
      borderRadius: "full",
      color: "fg.neutral.muted",
      textStyle: "t5.medium",
      cursor: "pointer",
      outline: "2px solid transparent",
      outlineOffset: "[-2px]",
      "@media (hover: hover) and (pointer: fine)": {
        _hover: {
          bg: "bg.transparent.pressed",
        },
      },
      _active: {
        bg: "bg.transparent.pressed",
      },
      _focusVisible: {
        outlineColor: "stroke.focus.ring",
      },
      "&[data-today=true]": {
        bg: "bg.neutral.weak",
      },
      "&[data-in-range=true]": {
        bg: "bg.neutral.weak",
      },
      "&[data-selected=true]": {
        bg: "bg.neutral.inverted",
        color: "fg.neutral.inverted",
      },
      "&[data-outside-month=true]": {
        color: "fg.neutral.subtle",
      },
      _disabled: {
        color: "fg.disabled",
        cursor: "default",
      },
    },
  },
})
