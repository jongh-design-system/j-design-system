import { defineSlotRecipe } from "../define.ts"

export const sliderRecipe = defineSlotRecipe({
  name: "slider",
  slots: ["root", "track", "range", "thumb"],
  base: {
    root: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      touchAction: "none",
      userSelect: "none",
    },
    track: {
      position: "relative",
      width: "100%",
      height: "0.5rem",
      flexGrow: "1",
      overflow: "hidden",
      borderRadius: "radius.full",
      backgroundColor: "color.bg.subtle",
    },
    range: {
      position: "absolute",
      height: "100%",
      backgroundColor: "color.bg.accent",
    },
    thumb: {
      display: "block",
      width: "1.25rem",
      height: "1.25rem",
      cursor: "pointer",
      borderRadius: "radius.full",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "color.focus.ring",
      backgroundColor: "color.bg.elevated",
      boxShadow: "shadow.sm",
      _disabled: {
        pointerEvents: "none",
        opacity: "0.5",
      },
    },
  },
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
})
