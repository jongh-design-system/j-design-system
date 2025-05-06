import { RecipeVariantProps, sva } from "@styled-system/css"

export const recipe = sva({
  slots: ["root", "heading", "container", "input", "trailingButton", "helper"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
      width: "full",
    },
    heading: {
      textStyle: "label1",
      "& label.required": {
        "&::after": {
          color: "destructive",
          content: "'*'",
          fontSize: "sm",
          marginLeft: "0.5",
        },
      },
    },
    container: {
      alignItems: "center",
      border: "input",
      borderRadius: "md",
      shadow: "sm",
      display: "flex",
      gap: "1.5",
      minHeight: "12",
      padding: "3",
      width: "full",
      transition: "colors",
      transitionTimingFunction: "in",
      transitionDuration: "fast",
      _disabled: {
        cursor: "not-allowed",
      },
      _focusWithin: {
        borderColor: "primary",
      },
    },
    input: {
      border: "none",
      outline: "none",
      flex: "1",
      _disabled: {
        cursor: "not-allowed",
      },
    },
    trailingButton: {
      display: "flex",
      alignItems: "center",
      whiteSpace: "nowrap",
      maxHeight: "2",
    },
    helper: {
      alignSelf: "stretch",
      color: "neutral.foreground",
      textStyle: "caption2",
    },
  },
  variants: {
    status: {
      normal: {},
      negative: {
        container: {
          borderColor: "destructive",
          _focusWithin: {
            borderColor: "destructive",
          },
        },
        helper: {
          color: "destructive",
        },
      },
    },
  },
  defaultVariants: {
    status: "normal",
  },
})

export type TextFieldVariantProps = RecipeVariantProps<typeof recipe>
