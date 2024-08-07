import { define } from "../../../dev"

export const sliderRecipe = define.recipe({
  className: "slider",
  base: {
    WebkitAppearance: "none",
    height: "4px",
    borderRadius: "lg",
    backgroundColor: "grey_300",
    backgroundImage: "linear-gradient(#7DD3FC, #7DD3FC)",
    backgroundSize: "var(--range-size)",
    backgroundRepeat: "no-repeat",
    "&::-webkit-slider-thumb": {
      WebkitAppearance: "none",
      width: "20px",
      height: "20px",
      backgroundColor: "grey_300",
      borderRadius: "rounded",
      border: "none",
      cursor: "pointer",
    },
    "&::-moz-range-thumb": {
      WebkitAppearance: "none",
      width: "20px",
      height: "20px",
      backgroundColor: "grey_300",
      borderRadius: "rounded",
      border: "none",
      cursor: "pointer",
    },
  },
  variants: {
    orientation: {
      horizontal: {
        writingMode: "horizontal-tb",
      },
      vertical: {
        writingMode: "vertical-rl",
      },
    },
  },
})
