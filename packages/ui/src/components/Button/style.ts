import { cva, RecipeVariantProps } from "jh-generated/css"
export const buttonCva = cva({
  base: {
    textAlign: "center",
    lineHeight: "20",
    borderRadius: "rounded",
    cursor: "pointer",
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "medium",
    width: "100%",
    minWidth: "44",
    minHeight: "44",
    _hover: {
      boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 15px",
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.5,
      color: "text_secondary",
    },
    color: "text_primary",
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
        paddingLeft: "16",
        paddingRight: "16",
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
        color: "text_primary",
      },
      text: {
        border: "1px solid",
        borderColor: "border_basic",
        backgroundColor: "white",
      },
    },
  },
  defaultVariants: {
    size: "medium",
    variant: "primary",
    br: "normal",
  },
})

export type ButtonVariants = RecipeVariantProps<typeof buttonCva>
