import { defineRecipe } from "@pandacss/dev"

export const buttonRecipe = defineRecipe({
  className: "button",
  base: {
    alignItems: "center",
    cursor: "pointer",
    display: "inline-flex",
    flexShrink: 0,
    gap: "1",
    justifyContent: "center",
    minH: "[2.25rem]",
    rounded: "r1_5",
    textStyle: "t6.medium",
    transitionDuration: "pressed.scale",
    transitionProperty: "common",
    transitionTimingFunction: "pressed.scale",
    whiteSpace: "nowrap",
    "& svg": {
      flexShrink: 0,
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: "0.5",
    },
    _enabled: {
      _active: {
        transform: "scale(0.97)",
      },
    },
  },
  variants: {
    size: {
      sm: {
        h: "[2.25rem]",
        px: "3",
        py: "1.5",
        textStyle: "t2.bold",
        "& svg": {
          height: "[0.875rem]",
          width: "[0.875rem]",
        },
      },
      md: {
        h: "[2.5rem]",
        px: "4",
        py: "2",
        "& svg": {
          height: "[1rem]",
          width: "[1rem]",
        },
      },
      lg: {
        h: "[2.75rem]",
        px: "5",
        py: "2",
        "& svg": {
          height: "[1.25rem]",
          width: "[1.25rem]",
        },
      },
    },
    variant: {
      destructive: {
        bg: "bg.critical.solid",
        color: "fg.neutral.inverted",
        _enabled: {
          "@media (hover: hover) and (pointer: fine)": {
            _hover: {
              bg: "bg.critical.solid.pressed",
            },
          },
          "@media not all and (hover: hover) and (pointer: fine)": {
            _active: {
              bg: "bg.critical.solid.pressed",
            },
          },
        },
      },
      link: {
        color: "fg.brand",
        textUnderlineOffset: "2",
        _enabled: {
          "@media (hover: hover) and (pointer: fine)": {
            _hover: {
              textDecoration: "underline",
            },
          },
        },
      },
      outline: {
        bg: "bg.layer",
        border: "[1px_solid]",
        borderColor: "stroke.neutral.weak",
        color: "fg.neutral",
        _enabled: {
          "@media (hover: hover) and (pointer: fine)": {
            _hover: {
              bg: "bg.neutral.weak.pressed",
            },
          },
          "@media not all and (hover: hover) and (pointer: fine)": {
            _active: {
              bg: "bg.neutral.weak.pressed",
            },
          },
        },
      },
      primary: {
        bg: "bg.brand.solid",
        color: "fg.neutral.inverted",
        _enabled: {
          "@media (hover: hover) and (pointer: fine)": {
            _hover: {
              bg: "bg.brand.solid.pressed",
            },
          },
          "@media not all and (hover: hover) and (pointer: fine)": {
            _active: {
              bg: "bg.brand.solid.pressed",
            },
          },
        },
      },
      secondary: {
        bg: "bg.neutral.solid.muted",
        color: "fg.neutral.inverted",
        _enabled: {
          "@media (hover: hover) and (pointer: fine)": {
            _hover: {
              bg: "bg.neutral.solid.muted.pressed",
            },
          },
          "@media not all and (hover: hover) and (pointer: fine)": {
            _active: {
              bg: "bg.neutral.solid.muted.pressed",
            },
          },
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
})
