import { defineSlotRecipe } from "@pandacss/dev"

export const selectRecipe = defineSlotRecipe({
  className: "select",
  slots: [
    "root",
    "group",
    "value",
    "trigger",
    "viewport",
    "content",
    "scrollUpButton",
    "scrollDownButton",
    "label",
    "item",
    "itemIndicator",
    "separator",
  ],
  base: {
    trigger: {
      display: "flex",
      h: "[2.5rem]",
      w: "[100%]",
      px: "2",
      alignItems: "center",
      justifyContent: "space-between",
      rounded: "r1_5",
      borderWidth: "[1px]",
      borderColor: "stroke.neutral.weak",

      textStyle: "t4.bold",
      cursor: "pointer",
      bg: "bg.layer",
      _placeholder: {
        color: "fg.placeholder",
      },
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "stroke.focus.ring",
        outlineOffset: "0.5",
      },

      _disabled: {
        cursor: "not-allowed",
        opacity: "0.5",
      },
    },
    viewport: {
      "&:is([data-position=popper])": {
        h: "var(--radix-select-trigger-height)",
        w: "[100%]",
        minW: "var(--radix-select-trigger-width)",
      },
    },
    content: {
      position: "relative",
      zIndex: "100",
      minW: "[100%]",
      overflow: "hidden",
      rounded: "r1_5",
      borderWidth: "[1px]",
      borderColor: "stroke.neutral.weak",
      boxShadow: "s2",
      bg: "bg.layer.floating",
      color: "fg.neutral",
      maxH: "[24rem]",
      py: "1",
      transformOrigin: "var(--radix-select-content-transform-origin)",
      "&:is([data-state=open])": {
        animationName: "selectContentShow",
        animationDuration: "d5",
        animationTimingFunction: "enter",
      },

      "&:is([data-state=closed])": {
        animationName: "selectContentHide",
        animationDuration: "d3",
        animationTimingFunction: "exit",
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
    scrollUpButton: {
      position: "absolute",
      top: "[0]",
      left: "[0]",
      right: "[0]",
      h: "[1.5rem]",
      zIndex: "1",
      _before: {
        content: '""',
        position: "absolute",
        inset: "[0]",
        background:
          "[linear-gradient(to bottom,var(--colors-bg-layer-floating),transparent)]",
        pointerEvents: "none",
      },
    },
    scrollDownButton: {
      position: "absolute",
      right: "[0]",
      bottom: "[0]",
      left: "[0]",
      h: "[1.5rem]",
      zIndex: "1",
      _before: {
        content: '""',
        position: "absolute",
        inset: "[0]",
        background:
          "[linear-gradient(to bottom,transparent,var(--colors-bg-layer-floating))]",
        pointerEvents: "none",
      },
    },
    label: {
      py: "1.5",
      pl: "8",
      pr: "2",
      textStyle: "t4.bold",
    },
    item: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      rounded: "r1",
      py: "1.5",
      pl: "8",
      pr: "2",
      textStyle: "t4.regular",

      _hover: {
        bgColor: "bg.layer.floating.pressed",
      },
      "&[data-highlighted]": {
        bgColor: "bg.layer.floating.pressed",
      },
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "stroke.focus.ring",
        outlineOffset: "-0.5",
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
      h: "[0.875rem]",
      w: "[0.875rem]",
      alignItems: "center",
      justifyContent: "center",
    },
    separator: {
      mx: "-1",
      my: "1",
      h: "[0.25rem]",
      bg: "stroke.neutral.subtle",
    },
  },
})
