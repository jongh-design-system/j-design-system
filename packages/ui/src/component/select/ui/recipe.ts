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
      px: "2",
      alignItems: "center",
      justifyContent: "space-between",
      rounded: "md",
      border: "input",

      textStyle: "label1",
      cursor: "pointer",
      bg: "layer",
      _placeholder: {
        color: "foreground.emphasized",
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
      zIndex: "100",
      minW: "full",
      overflow: "hidden",
      rounded: "md",
      border: "base",
      boxShadow: "lg",
      bg: "layer",
      color: "foreground.emphasized",
      shadow: "md",
      maxH: "96",
      py: "1",
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
      textStyle: "label1",
    },
    item: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      rounded: "sm",
      py: "1.5",
      pl: "8",
      pr: "2",
      textStyle: "sm",

      _hover: {
        bgColor: "layer.active",
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
      bg: "stroke",
    },
  },
})
