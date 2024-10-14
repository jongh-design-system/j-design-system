import { defineSlotRecipe } from "@pandacss/dev"

export const accordionRecipe = defineSlotRecipe({
  className: "accordion",
  slots: ["root", "content", "indicator", "trigger"],
  base: {
    root: {
      divideY: "1px",
      width: "full",
      borderTopWidth: "1px",
      borderBottomWidth: "1px",
    },
    trigger: {
      alignItems: "center",
      color: "",
      cursor: "pointer",
      display: "flex",
      fontWeight: "semibold",
      gap: "3",
      justifyContent: "space-between",
      textStyle: "lg",
      textAlign: "left",
      width: "full",
      _disabled: {
        color: "fg.disabled",
        cursor: "not-allowed",
      },
    },
    indicator: {
      color: "fg.muted",
      transformOrigin: "center",
      transitionDuration: "normal",
      transitionProperty: "transform",
      transitionTimingFunction: "default",
      _open: {
        transform: "rotate(-180deg)",
      },
    },
    content: {
      color: "fg.muted",
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
