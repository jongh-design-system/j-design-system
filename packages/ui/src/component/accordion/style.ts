import { defineSlotRecipe } from "@pandacss/dev"

export const accordionRecipe = defineSlotRecipe({
  className: "accordion",
  slots: ["root", "item", "header", "trigger", "content", "contentWrapper"],
  base: {
    root: {},
    item: {},
    header: {
      display: "flex",
    },
    trigger: {
      alignItems: "center",
      color: "fg.neutral",
      cursor: "pointer",
      display: "flex",
      flex: "1",
      justifyContent: "space-between",
      px: "1",
      py: "2",
      textStyle: "t5.bold",
      transitionProperty: "[color,background-color]",
      transitionDuration: "d3",
      transitionTimingFunction: "easing",

      _focusVisible: {
        outline: "2px solid",
        outlineColor: "stroke.focus.ring",
        outlineOffset: "0.5",
      },

      _disabled: {
        color: "fg.disabled",
        cursor: "not-allowed",
      },

      "& > svg": {
        color: "fg.neutral.subtle",
        flexShrink: "0",
        h: "[1rem]",
        transition: "transform",
        w: "[1rem]",
      },

      "&[data-state=open] > svg": {
        transform: "rotate(180deg)",
        transitionDuration: "d4",
        transitionTimingFunction: "enter",
      },

      "&[data-state=closed] > svg": {
        transitionDuration: "d3",
        transitionTimingFunction: "exit",
      },
    },
    content: {
      color: "fg.neutral.subtle",
      overflow: "hidden",
      textStyle: "t4.regular",

      "&[data-state=closed]": {
        animationDuration: "d3",
        animationName: "accordion-up_radix",
        animationTimingFunction: "exit",
      },

      "&[data-state=open]": {
        animationDuration: "d4",
        animationName: "accordion-down_radix",
        animationTimingFunction: "enter",
      },
    },
    contentWrapper: {
      px: "1",
      py: "1",
    },
  },
  variants: {
    variant: {
      outline: {
        trigger: {
          "@media (hover: hover) and (pointer: fine)": {
            _hover: {
              bg: "bg.transparent.pressed",
            },
          },
          _active: {
            bg: "bg.transparent.pressed",
          },
        },
        item: {
          borderBottomWidth: "[1px]",
          borderColor: "stroke.neutral.subtle",
        },
      },
      subtle: {
        item: {
          borderRadius: "r1_5",
        },
        header: {
          borderRadius: "r1_5",
        },
        trigger: {
          borderRadius: "r1_5",
          "@media (hover: hover) and (pointer: fine)": {
            _hover: {
              bg: "bg.transparent.pressed",
              borderRadius: "r1_5",
            },
          },
          _active: {
            bg: "bg.transparent.pressed",
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: "outline",
  },
})
