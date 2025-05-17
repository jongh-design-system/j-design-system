import { type RecipeVariantProps, sva } from "@styled-system/css"

const checkmark = {
  square:
    "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Cpath d=%27M10.41 17.854c-.34 0-.679-.113-.905-.453l-5.203-5.203c-.566-.565-.566-1.357 0-1.923.566-.565 1.357-.565 1.923 0l4.185 4.185 7.465-7.465c.566-.565 1.357-.565 1.923 0 .566.566.566 1.358 0 1.923l-8.37 8.37c-.34.453-.679.566-1.018.566z%27 fill=%27%23fff%27/%3E%3C/svg%3E')",
  ghost:
    "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 24 24%22%3E%3Cpath d%3D%22M10.41 17.854c-.34 0-.679-.113-.905-.453l-5.203-5.203c-.566-.565-.566-1.357 0-1.923.566-.565 1.357-.565 1.923 0l4.185 4.185 7.465-7.465c.566-.565 1.357-.565 1.923 0 .566.566.566 1.358 0 1.923l-8.37 8.37c-.34.453-.679.566-1.018.566z%22 fill%3D%22%23808080%22/%3E%3C/svg%3E')",
  indeterminate_square:
    "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Crect x=%276%27 y=%2710.5%27 width=%2712%27 height=%273%27 fill=%27%23fff%27/%3E%3C/svg%3E')",
  indeterminate_ghost:
    "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 24 24%22%3E%3Crect x%3D%226%22 y%3D%2210.5%22 width%3D%2212%22 height%3D%223%22 fill%3D%22%23808080%22/%3E%3C/svg%3E')",
}

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
      minHeight: "9",
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
      top: "[50%]",
      _before: {
        left: "0",
        content: '""',
        position: "absolute",
        transition: "colors",
        transform: "translateY(-50%)",
      },
      _after: {
        content: '""',
        position: "absolute",
        transform: "translateY(-50%)",
      },
      _disabled: {
        cursor: "not-allowed",
      },
    },
    text: {
      textStyle: "label1",
      cursor: "pointer",
      _peerDisabled: {
        cursor: "not-allowed",
      },
    },
  },
  variants: {
    size: {
      md: {
        input: {
          _before: {
            width: "6",
            height: "6",
          },
          _after: {
            width: "6",
            height: "6",
          },
        },
        text: {
          paddingLeft: "1",
        },
      },
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
    variant: {
      square: {
        input: {
          _before: {
            border: "base",
            borderRadius: "lg",
            bgColor: "background",
          },
          _after: {
            backgroundImage: checkmark.square,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0,
          },
          _checked: {
            _before: {
              bg: "primary",
              border: "none",
            },
            _after: {
              opacity: 1,
            },
          },
          _indeterminate: {
            _before: {
              bg: "primary",
              border: "none",
            },
            _after: {
              backgroundImage: checkmark.indeterminate_square,
              opacity: 1,
            },
          },
        },
      },
      ghost: {
        input: {
          _before: {
            border: "none",
            bgColor: "transparent",
          },
          _after: {
            backgroundImage: "none",
            maskImage: checkmark.ghost,
            bgColor: "foreground.muted",
            opacity: 1,
          },
          _checked: {
            _before: {
              bgColor: "transparent",
            },
            _after: {
              bgColor: "foreground.primary",
            },
          },
          _indeterminate: {
            _before: {
              bgColor: "transparent",
            },
            _after: {
              backgroundImage: "none",
              maskImage: checkmark.indeterminate_ghost,
              bgColor: "foreground.primary",
              opacity: 1,
            },
          },
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "square",
  },
})

export type CheckboxVariants = RecipeVariantProps<typeof checkboxRecipe>
