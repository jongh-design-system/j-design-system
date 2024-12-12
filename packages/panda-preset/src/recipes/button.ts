import { defineRecipe } from "@pandacss/dev"
export const buttonRecipe = defineRecipe({
  className: "button",
  base: {
    textAlign: "center",
    borderRadius: "rounded",
    cursor: "pointer",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "normal",
    verticalAlign: "middle",
    minWidth: "44",
    minHeight: "44",
    whiteSpace: "nowrap",
    userSelect: "none",
    transition: "filter 0.2s ease",
    _disabled: {
      cursor: "not-allowed",
    },
  },
  variants: {
    size: {
      small: {
        height: "48",
        fontSize: "lg",
        paddingLeft: "8",
        paddingRight: "8",
      },
      medium: {
        height: "52",
        fontSize: "lg",
        paddingLeft: "10",
        paddingRight: "10",
      },
      large: {
        height: "56",
        fontSize: "xl",
        paddingLeft: "16",
        paddingRight: "16",
      },
      full: {
        width: "100%",
        fontSize: "2xl",
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
        backgroundColor: "primary",
        border: "none",
        color: "white",
        _hover: {
          filter: "brightness(0.95)",
        },
        _disabled: {
          backgroundColor: "muted",
          _hover: {
            filter: "brightness(0.9)",
          },
        },
        _active: {
          filter: "brightness(0.9)",
        },
      },
      text: {
        border: "2px solid",
        borderColor: "border",
        backgroundColor: "white",
        color: "foreground",
        _hover: {
          filter: "brightness(0.95)",
        },
        _disabled: {
          backgroundColor: "muted",
          cursor: "not-allowed",
        },
      },
    },
  },
  defaultVariants: {
    size: "small",
    variant: "primary",
    br: "normal",
  },
})
