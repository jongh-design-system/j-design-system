import { defineSafe } from "@utils/defineSafe"

export const sliderRecipe = defineSafe.slotRecipe({
  className: "slider",
  description: "Styles for the Slider component",
  slots: ["root", "track", "range", "thumb"],
  base: {
    root: {
      position: "relative",
      display: "flex",
      w: "200px",
      touchAction: "none",
      userSelect: "none",
      alignItems: "center",
    },
    track: {
      position: "relative",
      h: "5",
      w: "100%",
      flexGrow: "1",
      overflow: "hidden",
      bg: "grey_300",
      borderRadius: "rounded",
    },
    range: {
      position: "absolute",
      h: "100%",
      bgColor: "grey_300",
    },
    thumb: {
      display: "block",
      h: "1rem",
      w: "1rem",
      cursor: "pointer",
      rounded: "999px",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "black",
      bg: "white",
      transition: "colors",
      zIndex: "1",
      _focusVisible: {
        outline: "2px solid transparent",
        outlineOffset: "2px",
      },

      _disabled: {
        pointerEvents: "none",
        opacity: "0.5",
      },
    },
  },
})
