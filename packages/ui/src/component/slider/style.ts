import { defineSlotRecipe } from "@pandacss/dev"

export const sliderRecipe = defineSlotRecipe({
  className: "slider",
  slots: ["root", "track", "range", "thumb"],
  base: {
    root: {
      position: "relative",
      display: "flex",
      touchAction: "none",
      userSelect: "none",
      alignItems: "center",
    },
    track: {
      position: "relative",
      h: "[0.375rem]",
      w: "[100%]",
      flexGrow: "1",
      overflow: "hidden",
      rounded: "full",
      bg: "bg.neutral.weak",

      _disabled: {
        bg: "bg.disabled",
      },
    },
    range: {
      position: "absolute",
      h: "[100%]",
      bg: "bg.brand.solid",

      _disabled: {
        bg: "bg.disabled",
      },
    },
    thumb: {
      display: "block",
      h: "[1rem]",
      w: "[1rem]",
      cursor: "pointer",
      rounded: "full",
      bg: "palette.static.white",
      borderWidth: "[1px]",
      borderStyle: "solid",
      borderColor: "stroke.neutral.weak",
      shadow: "s1",

      _focusVisible: {
        outline: "2px solid",
        outlineColor: "stroke.focus.ring",
        outlineOffset: "0.5",
      },

      _disabled: {
        bg: "bg.disabled",
        pointerEvents: "none",
      },
    },
  },
})
