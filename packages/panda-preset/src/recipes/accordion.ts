import { defineSlotRecipe } from "@pandacss/dev"
export const accordionRecipe = defineSlotRecipe({
  className: "accordion",
  slots: ["root", "content", "item", "trigger"],
  base: {
    root: {
      width: "100%",
    },
    trigger: {
      alignItems: "center",
      cursor: "pointer",
      display: "flex",
      fontWeight: "semibold",
      gap: "10",
      padding: "5",
      justifyContent: "space-between",
      textStyle: "body",
      textAlign: "left",
      _disabled: {
        cursor: "not-allowed",
      },
    },
    item: {
      borderBottom: "1px solid",
      borderColor: "grey_300",
    },
    content: {
      overflow: "hidden",

      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDuration: "150ms",
      height: "var(--accordion-height)",
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
