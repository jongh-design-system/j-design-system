import { defineSlotRecipe } from "@pandacss/dev"
export const accordionRecipe = defineSlotRecipe({
  className: "accordion",
  slots: ["root", "content", "item", "trigger"],
  base: {
    root: {
      divideY: "1px",
      borderTopWidth: "1px",
      borderBottomWidth: "1px",
    },
    trigger: {
      alignItems: "center",
      cursor: "pointer",
      display: "flex",
      fontWeight: "semibold",
      gap: "10",
      justifyContent: "space-between",
      textStyle: "body",
      textAlign: "left",
      _disabled: {
        cursor: "not-allowed",
      },
    },
    content: {
      overflow: "hidden",
      transitionProperty: "padding-bottom",
      transitionDuration: "normal",
      transitionTimingFunction: "default",
      _open: {
        animation: "collapse-in",
      },
      _closed: {
        animation: "collapse-out",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      md: {
        trigger: {
          py: "4",
        },
        content: {
          pb: "6",
          pr: "8",
          _closed: {
            pb: "0",
          },
        },
      },
    },
  },
})
