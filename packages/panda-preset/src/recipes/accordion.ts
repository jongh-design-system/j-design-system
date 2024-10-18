import { defineSlotRecipe } from "@pandacss/dev"

export const accordionRecipe = defineSlotRecipe({
  className: "accordion",
  slots: ["root", "content", "item", "trigger"],
  base: {
    root: {
      divideY: "1px",
      width: "100%",
      borderTopWidth: "1px",
      borderBottomWidth: "1px",
    },
    trigger: {
      alignItems: "center",
      color: "grey_300",
      borderColor: "border_basic",
      cursor: "pointer",
      display: "flex",
      fontWeight: "bold",
      justifyContent: "space-between",
      textStyle: "body",
      textAlign: "left",
      width: "100%",
      _disabled: {
        cursor: "not-allowed",
      },
    },
    //   indicator: {
    //     color: "fg.muted",
    //     transformOrigin: "center",
    //     transitionDuration: "normal",
    //     transitionProperty: "transform",
    //     transitionTimingFunction: "default",
    //     _open: {
    //       transform: "rotate(-180deg)",
    //     },
    //   },
    content: {
      display: "none",
      overflow: "hidden",
      _open: {
        display: "block",
        animation: `accordionDown 0.2s cubic-bezier(.4,0,.2,1)`,
      },
      _closed: {
        display: "none",
        animation: `accordionUp 0.2s cubic-bezier(.4,0,.2,1)`,
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
          pl: "4",
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
