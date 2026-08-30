import { defineSlotRecipe } from "@pandacss/dev"

const checkmark = {
  checked:
    "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Cpath d=%27M10.41 17.854c-.34 0-.679-.113-.905-.453l-5.203-5.203c-.566-.565-.566-1.357 0-1.923.566-.565 1.357-.565 1.923 0l4.185 4.185 7.465-7.465c.566-.565 1.357-.565 1.923 0 .566.566.566 1.358 0 1.923l-8.37 8.37c-.34.453-.679.566-1.018.566z%27/%3E%3C/svg%3E')",
  indeterminate:
    "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Crect x=%276%27 y=%2710.5%27 width=%2712%27 height=%273%27/%3E%3C/svg%3E')",
}

export const checkboxRecipe = defineSlotRecipe({
  className: "checkbox",
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
      maxWidth: "[100%]",
      minHeight: "[2.25rem]",
      paddingLeft: "8",
      lineHeight: "t4",
    },
    input: {
      border: "none",
      cursor: "pointer",
      position: "absolute",
      left: "[0]",
      margin: "[0]",
      padding: "[0]",
      w: "[0]",
      h: "[0]",
      top: "[50%]",
      _before: {
        left: "[0]",
        content: '""',
        position: "absolute",
        transform: "translateY(-50%)",
      },
      _after: {
        content: '""',
        position: "absolute",
        transform: "translateY(-50%)",
        transitionDuration: "d2",
        transition: "opacity",
        transitionTimingFunction: "easing",
      },
      _disabled: {
        cursor: "not-allowed",
      },
    },
    text: {
      textStyle: "t4.bold",
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
            width: "[1.5rem]",
            height: "[1.5rem]",
          },
          _after: {
            width: "[1.5rem]",
            height: "[1.5rem]",
          },
        },
        text: {
          paddingLeft: "1",
        },
      },
      lg: {
        input: {
          _before: {
            width: "[1.75rem]",
            height: "[1.75rem]",
          },
          _after: {
            width: "[1.75rem]",
            height: "[1.75rem]",
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
            borderWidth: "[1px]",
            borderColor: "stroke.neutral.weak",
            borderRadius: "r2",
            bgColor: "bg.layer",
          },
          _after: {
            bgColor: "fg.neutral.inverted",
            maskImage: checkmark.checked,
            maskPosition: "center",
            maskRepeat: "no-repeat",
            maskSize: "contain",
            opacity: 0,
          },
          _checked: {
            _before: {
              bg: "bg.brand.solid",
              border: "none",
            },
            _after: {
              opacity: 1,
            },
          },
          _indeterminate: {
            _before: {
              bg: "bg.brand.solid",
              border: "none",
            },
            _after: {
              maskImage: checkmark.indeterminate,
              opacity: 1,
            },
          },
        },
      },
      ghost: {
        input: {
          _before: {
            border: "none",
            bgColor: "bg.transparent",
          },
          _after: {
            backgroundImage: "none",
            maskImage: checkmark.checked,
            maskPosition: "center",
            maskRepeat: "no-repeat",
            maskSize: "contain",
            bgColor: "fg.neutral.muted",
            opacity: 1,
          },
          _checked: {
            _before: {
              bgColor: "bg.transparent",
            },
            _after: {
              bgColor: "fg.brand",
            },
          },
          _indeterminate: {
            _before: {
              bgColor: "bg.transparent",
            },
            _after: {
              backgroundImage: "none",
              maskImage: checkmark.indeterminate,
              bgColor: "fg.brand",
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
