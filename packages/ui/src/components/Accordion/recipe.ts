import { defineSafe } from "@utils/defineSafe"

export const accordionRecipe = defineSafe.slotRecipe({
  className: "accordion",
  slots: ["root", "content", "item", "trigger"],
  base: {
    root: {
      divideY: "1px",
      width: "full",
      borderTopWidth: "1px",
      borderBottomWidth: "1px",
      borderColor: "border",
    },
    trigger: {
      fontWeight: "bold",
      fontSize: "lg",
      color: "foreground",

      textAlign: "left",
      borderColor: "border",
    },
    item: {
      padding: "5",
      gap: "5",
      display: "flex",

      textAlign: "left",
      _disabled: {
        cursor: "not-allowed",
      },
      flexDirection: "column",
      borderColor: "border",
    },
    content: {
      overflow: "hidden",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDuration: "150ms",
      height: "var(--accordion-height)",
      color: "foreground",
      fontWeight: "normal",
      fontSize: "sm",
    },
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
