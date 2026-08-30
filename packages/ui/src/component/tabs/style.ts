import { defineSlotRecipe } from "@pandacss/dev"

export const tabsRecipe = defineSlotRecipe({
  className: "tabs",
  slots: ["root", "list", "trigger", "indicator", "content"],
  base: {
    list: {
      position: "relative",
      display: "flex",
      minH: "[2.5rem]",
      alignItems: "center",
      overflowX: "auto",
      bg: "bg.layer",
      borderBottomWidth: "[1px]",
      borderColor: "stroke.neutral.muted",
      scrollbarWidth: "[none]",

      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    trigger: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minH: "[2.5rem]",
      whiteSpace: "nowrap",
      px: "2.5",
      py: "2.5",
      color: "fg.neutral.subtle",
      textStyle: "t4.bold",
      outline: "2px solid transparent",
      outlineOffset: "[-2px]",
      transitionProperty: "[outline-color]",
      transitionDuration: "d3",
      transitionTimingFunction: "easing",
      cursor: "pointer",

      _focusVisible: {
        outlineColor: "stroke.focus.ring",
      },

      _disabled: {
        pointerEvents: "none",
        color: "fg.disabled",
      },

      "&:is([data-state=active])": {
        color: "fg.neutral",
      },
    },
    indicator: {
      position: "absolute",
      bottom: "[0]",
      left: "[var(--tabs-indicator-left)]",
      w: "[var(--tabs-indicator-width)]",
      h: "[2px]",
      bg: "fg.neutral",
      pointerEvents: "none",
      transitionProperty: "[left,width]",
      transitionDuration: "d4",
      transitionTimingFunction: "easing",
    },
    content: {
      mt: "2",
    },
  },
})
