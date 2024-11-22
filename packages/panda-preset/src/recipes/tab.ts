import { defineSlotRecipe } from "@pandacss/dev"

export const tabRecipe = defineSlotRecipe({
  className: "tabs",
  slots: ["root", "list", "item", "content", "indicator"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    list: {
      display: "flex",
      flexDirection: "row",
      overflow: "auto",
      position: "relative",
      scrollbarWidth: "none",
      flexShrink: 0,
      boxShadow: "inset 0 -1px 0 0 {colors.border_basic}",
      gap: "5px",
    },
    indicator: {
      width: "var(--indicator-width)",
      height: "0.2rem",
      position: "absolute",
      bottom: 0,
      left: `var(--indicator-left)`,
      background: "{colors.grey_500}",
    },
    item: {
      whiteSpace: "nowrap",
    },
  },
  variants: {
    layout: {
      scroll: {
        item: {
          flex: "0 0 50px",
        },
      },
      stretch: {
        item: {
          flex: 1,
        },
      },
    },
  },
})
