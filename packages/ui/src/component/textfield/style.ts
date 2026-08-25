import { defineSlotRecipe } from "@pandacss/dev"

export const textfieldRecipe = defineSlotRecipe({
  className: "textfield",
  slots: ["root", "heading", "container", "input", "trailingButton", "helper"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
      width: "[100%]",
    },
    heading: {
      textStyle: "t4.bold",
      "&::after": {
        color: "fg.critical",
        content: "'*'",
        fontSize: "t4",
        marginLeft: "0.5",
      },
    },
    container: {
      alignItems: "center",
      borderWidth: "[1px]",
      borderStyle: "solid",
      borderColor: "stroke.neutral.weak",
      borderRadius: "r1_5",
      outline: "2px solid transparent",
      outlineOffset: "[-2px]",
      shadow: "s1",
      display: "flex",
      gap: "1.5",
      minHeight: "[3rem]",
      padding: "3",
      width: "[100%]",

      "@media (hover: hover) and (pointer: fine)": {
        _hover: {
          borderColor: "stroke.neutral.solid",
        },
      },

      _active: {
        outlineColor: "stroke.neutral.contrast",
      },

      _disabled: {
        cursor: "not-allowed",
        pointerEvents: "none",
      },

      _focusWithin: {
        outlineColor: "stroke.neutral.contrast",
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
      maxHeight: "[0.5rem]",
    },
    helper: {
      alignSelf: "stretch",
      color: "fg.neutral.muted",
      textStyle: "t1.bold",
    },
  },
  variants: {
    status: {
      normal: {},
      negative: {
        container: {
          borderColor: "stroke.critical.solid",
          outlineColor: "stroke.critical.solid",

          "@media (hover: hover) and (pointer: fine)": {
            _hover: {
              borderColor: "stroke.critical.solid",
            },
          },
        },
        helper: {
          color: "fg.critical",
        },
      },
    },
  },
  defaultVariants: {
    status: "normal",
  },
})
