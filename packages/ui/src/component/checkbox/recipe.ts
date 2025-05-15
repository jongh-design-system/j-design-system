import { type RecipeVariantProps, sva } from "@styled-system/css"

const checkmarkIconSmallBase64 =
  "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Cpath d=%27M10.41 17.854c-.34 0-.679-.113-.905-.453l-5.203-5.203c-.566-.565-.566-1.357 0-1.923.566-.565 1.357-.565 1.923 0l4.185 4.185 7.465-7.465c.566-.565 1.357-.565 1.923 0 .566.566.566 1.358 0 1.923l-8.37 8.37c-.34.453-.679.566-1.018.566z%27 fill=%27%23fff%27/%3E%3C/svg%3E')"

export const checkboxRecipe = sva({
  slots: ["root", "label", "input", "text"],
  base: {
    root: {
      position: "relative",
      display: "flex",
    },
    label: {
      display: "inline-flex",
      alignItems: "center",
      position: "relative",
      maxWidth: "full",
      minHeight: "12",
      paddingLeft: "8",
      lineHeight: "relaxed",
    },
    input: {
      border: "none",
      cursor: "pointer",
      position: "absolute",
      left: "0",
      margin: "0",
      padding: "0",
      w: "0",
      h: "0",
      bg: "white",
      top: "[50%]",
      _checked: {
        _before: {
          bg: "primary",
        },
        _after: {
          opacity: 1,
        },
      },
      _before: {
        width: "6",
        height: "6",
        left: "0",
        border: "base",
        content: '""',
        position: "absolute",
        transition: "colors",
        transform: "translateY(-50%)",
        borderRadius: "lg",
      },
      _after: {
        content: '""',
        position: "absolute",
        transform: "translateY(-50%)",
        width: "6",
        height: "6",
        opacity: 0,
        backgroundImage: `${checkmarkIconSmallBase64}`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      },
      _disabled: {
        cursor: "not-allowed",
      },
    },
    text: {
      textStyle: "label1",
      cursor: "pointer",
      paddingLeft: "1",
      _peerDisabled: {
        cursor: "not-allowed",
      },
    },
  },
  variants: {
    size: {
      md: {},
      lg: {
        input: {
          _before: {
            width: "7",
            height: "7",
          },
          _after: {
            width: "7",
            height: "7",
          },
        },
        text: {
          paddingLeft: "2",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type CheckboxVariants = RecipeVariantProps<typeof checkboxRecipe>
