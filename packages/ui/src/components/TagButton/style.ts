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
    _hover: { boxShadow: "0px 0px 3px", boxShadowColor: "grey_300" },
    _invalid: {
      cursor: "not-allowed",
    },
    _pressed: {
      borderWidth: "2px",
      borderColor: "blue_300",
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
