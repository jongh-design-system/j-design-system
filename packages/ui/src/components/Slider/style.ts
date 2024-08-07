import { define } from "../../../dev"

export const sliderRecipe = define.recipe({
  className: "slider",
  variants: {
    orientation: {
      horizontal: {
        writingMode: "vertical-rl",
      },
      vertical: {
        writingMode: "vertical-rl",
      },
    },
  },
})
