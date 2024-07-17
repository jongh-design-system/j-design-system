import { define } from "dev"
export const buttonRecipe = define.recipe({
  className: "button",
  base: {
    textAlign: "center",
    lineHeight: "20",
    borderRadius: "rounded",
    cursor: "pointer",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "medium",
    width: "100%",
    minWidth: "44",
    minHeight: "44",
    gap: "5px",
    _hover: {
      boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 3px",
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.5,
      color: "text_secondary",
    },
    color: "white",
  },
  variants: {
    size: {
      small: {
        height: "44",
        fontSize: "sm",
        paddingLeft: "8",
        paddingRight: "8",
      },
      medium: {
        height: "44",
        fontSize: "lg",
        paddingLeft: "10",
        paddingRight: "10",
      },
      large: {
        height: "48",
        fontSize: "lg",
        paddingLeft: "16",
        paddingRight: "16",
      },
    },
    br: {
      normal: {
        borderRadius: "sm",
      },
      rounded: {
        borderRadius: "rounded",
      },
    },
    variant: {
      primary: {
        backgroundColor: "blue_300",
        border: "none",
        color: "white",
      },
      text: {
        border: "2px solid",
        borderColor: "border_basic",
        backgroundColor: "white",
        color: "text_secondary",
      },
    },
  },
  defaultVariants: {
    size: "medium",
    variant: "primary",
    br: "normal",
  },
})
