import { defineRecipe } from "@pandacss/dev"

export const centerRecipe = defineRecipe({
  className: "center",
  variants: {
    axis: {
      both: {
        alignItems: "center",
        justifyContent: "center",
      },
      horizontal: {
        justifyContent: "center",
      },
      vertical: {
        alignItems: "center",
      },
    },
  },
  defaultVariants: {
    axis: "both",
  },
})
