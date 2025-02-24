import { cva, type RecipeVariantProps } from "@styled-system/css"

export type ChipVariantProps = RecipeVariantProps<typeof recipe>
export const recipe = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "full",
    transition: "colors",
    cursor: "pointer",
    _focusVisible: {
      ringWidth: "1",
      ringColor: "ring",
      ringOffset: "1",
    },
    "& svg": {
      flexShrink: 0,
    },
  },
  variants: {
    variant: {
      filled: {
        bg: "primary",
        color: "primary.foreground",
        _hover: {
          bg: "primary/90",
        },
        _active: {
          bg: "primary/80",
        },
        _disabled: {
          bg: "muted",
          color: "muted.foreground",
          cursor: "not-allowed",
          opacity: 0.5,
        },
      },
      outlined: {
        border: "base",
        bg: "transparent",
        color: "foreground",
        _hover: {
          bg: "muted/20",
        },
        _active: {
          bg: "accent",
          borderColor: "accent",
        },
        _disabled: {
          borderColor: "muted",
          color: "muted.foreground",
          cursor: "not-allowed",
          opacity: 0.5,
        },
      },
    },
    size: {
      sm: {
        height: "7",
        fontSize: "sm",
        "& svg": {
          width: "3",
          height: "3",
        },
      },
      md: {
        height: "9",
        fontSize: "lg",
        "& svg": {
          width: "4",
          height: "4",
        },
      },
    },
    state: {
      enabled: {},
      disabled: {
        opacity: 0.5,
        cursor: "not-allowed",
      },
    },
    layout: {
      withText: {},
      iconOnly: {
        px: "2",
        "& svg": {
          m: "0",
        },
      },
    },
  },
  compoundVariants: [
    {
      layout: "iconOnly",
      size: "sm",
      css: {
        width: "7",
        height: "7",
      },
    },
    {
      layout: "iconOnly",
      size: "md",
      css: {
        width: "9",
        height: "9",
      },
    },
    {
      layout: "withText",
      size: "sm",
      css: {
        px: "2",
        py: "1",
        gap: "1",
      },
    },
    {
      layout: "withText",
      size: "md",
      css: {
        px: "3",
        py: "2",
        gap: "2",
      },
    },
  ],
  defaultVariants: {
    variant: "filled",
    size: "md",
    state: "enabled",
    layout: "withText",
  },
})
