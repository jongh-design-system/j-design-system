import { define } from "../../../dev"

export const accordion = define.slotRecipe({
  className: "accordion",
  slots: ["root", "content", "indicator", "trigger"],
  base: {
    root: {
      divideY: "1px",
      width: "auto",
      borderTopWidth: "1px",
      borderBottomWidth: "1px",
    },
    trigger: {
      alignItems: "center",
      cursor: "pointer",
      display: "flex",
      fontWeight: "semibold",
      gap: "3",
      justifyContent: "space-between",
      textAlign: "left",
      _disabled: {
        color: "grey_200",
        cursor: "not-allowed",
      },
    },
    indicator: {
      color: "blue_200",
      transformOrigin: "center",
      transitionDuration: "normal",
      transitionProperty: "transform",
      transitionTimingFunction: "default",
      _open: {
        transform: "rotate(-180deg)",
      },
    },
    content: {
      color: "white",
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
