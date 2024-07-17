import { define } from "../../../dev"
export const tagButtonRecipe = define.recipe({
  className: "tagButton",
  base: {
    textAlign: "center",
    borderRadius: "rounded",
    padding: "4px 10px",
    fontWeight: "normal",
    cursor: "pointer",
    border: "1px solid black",
    color: "text_primary",
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 3px",
    _invalid: {
      cursor: "not-allowed",
    },
    _pressed: {
      borderWidth: "3px",
      borderColor: "blue_300",
      fontWeight: "bold",
    },
    maxWidth: "screen",
  },
  variants: {
    size: {
      small: {
        fontSize: "sm",
      },
      large: {
        fontSize: "lg",
      },
    },
  },
  defaultVariants: {
    size: "small",
  },
})
