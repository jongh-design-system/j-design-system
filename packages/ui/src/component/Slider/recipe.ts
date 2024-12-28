import { defineSafe } from "@utils/defineSafe"

export const sliderRecipe = defineSafe.slotRecipe({
  className: "slider",
  description: "Styles for the Slider component",
  slots: ["root", "track", "range", "thumb"],
  base: {
    root: {
      position: "relative",
      display: "flex",
      w: "full",
      touchAction: "none",
      userSelect: "none",
      alignItems: "center",
    },
    track: {
      position: "relative",
      h: "2",
      w: "full",
      flexGrow: "1",
      overflow: "hidden",
      rounded: "full",
      bg: "secondary",
    },
    range: {
      position: "absolute",
      h: "full",
      bg: "primary",
    },
    thumb: {
      display: "block",
      h: "5",
      w: "5",
      cursor: "pointer",
      rounded: "full",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "primary",
      bg: "background",
      ringColor: "background",
      transition: "colors",

      _focusVisible: {
        outline: "primary",
        outlineOffset: "2",
        ringWidth: "2",
        ringColor: "ring",
        ringOffset: "2",
      },

      _disabled: {
        pointerEvents: "none",
        opacity: "0.5",
      },
    },
  },
})
