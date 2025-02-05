import { sva } from "@styled-system/css"

export const recipe = sva({
  className: "select",
  slots: [
    "root",
    "group",
    "value",
    "trigger",
    "viewport",
    "content",
    "label",
    "item",
    "itemIndicator",
    "separator",
  ],
  base: {
    trigger: {
      display: "flex",
      h: "10",
      w: "full",
      alignItems: "center",
      justifyContent: "space-between",
      rounded: "md",
      border: "input",
      bg: "transparent",
      px: "3",
      py: "2",
      textStyle: "sm",
      cursor: "pointer",
      ringColor: "background",

      _placeholder: {
        color: "muted.foreground",
      },

      _focus: {
        ringWidth: "1",
        ringColor: "ring",
        outlineOffset: "1",
      },

      _disabled: {
        cursor: "not-allowed",
        opacity: "0.5",
      },
    },
    viewport: {
      "&:is([data-position=popper])": {
        h: "var(--radix-select-trigger-height)",
        w: "full",
        minW: "var(--radix-select-trigger-width)",
      },
    },
    content: {
      position: "relative",
      zIndex: 50,
      minW: "full",
      overflow: "hidden",
      rounded: "md",
      border: "base",
      bg: "popover",
      color: "popover.foreground",
      shadow: "md",
      maxH: "96",

      "&:is([data-state=open])": {
        animationName: "fadeIn",
        animationState: "ease-in",
        animationDuration: "slowest",
      },

      "&:is(&[data-state=closed])": {
        animationName: "slideInDown",
        animationState: "ease-in",
        animationDuration: "slowest",
      },

      "&:is([data-position=popper])": {
        "&:is([data-side=top])": {
          translateY: "-1",
        },

        "&:is([data-side=bottom])": {
          translateY: "1",
        },

        "&:is([data-side=left])": {
          translateX: "-1",
        },

        "&:is([data-side=right])": {
          translateX: "1",
        },
      },
    },
    label: {
      py: "1.5",
      pl: "8",
      pr: "2",
      textStyle: "sm",
      fontWeight: "semibold",
    },
    item: {
      position: "relative",
      display: "flex",
      cursor: "default",
      userSelect: "none",
      alignItems: "center",
      rounded: "sm",
      py: "1.5",
      pl: "8",
      pr: "2",
      textStyle: "sm",

      _focus: {
        bg: "accent",
        color: "accent.foreground",
      },

      ["&[data-disabled]"]: {
        pointerEvents: "none",
        opacity: "0.5",
      },
    },
    itemIndicator: {
      position: "absolute",
      left: "2",
      display: "flex",
      h: "3.5",
      w: "3.5",
      alignItems: "center",
      justifyContent: "center",
    },
    separator: {
      mx: "-1",
      my: "1",
      h: "1",
      bg: "muted",
    },
  },
})
