import { sva } from "@styled-system/css"

export const checkboxRecipe = sva({
  slots: ["root", "icon", "indeterminateLine"],
  base: {
    root: {
      alignItems: "center",
      border: "input",
      borderRadius: "sm",
      cursor: "pointer",
      display: "inline-flex",
      justifyContent: "center",
      position: "relative",
      _disabled: {
        cursor: "not-allowed",
        opacity: "0.5",
      },
    },
    icon: {
      alignItems: "center",
      color: "primary.foreground",
      display: "flex",
      flexShrink: "0",
      justifyContent: "center",
    },
    indeterminateLine: {
      bg: "primary.foreground",
      height: "0.5",
      width: "3",
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          height: "4",
          p: "1",
          width: "4",
        },
        icon: {
          height: "3.5",
          width: "3.5",
        },
      },
      md: {
        root: {
          height: "5",
          p: "1.5",
          width: "5",
        },
        icon: {
          height: "3",
          width: "3",
        },
      },
    },
    state: {
      checked: {
        root: {
          bg: "primary",
          borderColor: "primary",
        },
      },
      indeterminate: {
        root: {
          bg: "primary",
        },
        indeterminateLine: {
          display: "block",
        },
      },
      unchecked: {
        root: {
          bg: "transparent",
          _hover: {
            bg: "layer.active",
            borderColor: "primary",
          },
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    state: "unchecked",
  },
})
