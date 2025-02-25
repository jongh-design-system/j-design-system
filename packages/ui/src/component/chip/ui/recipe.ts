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
    _disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  variants: {
    variant: {
      filled: {
        bg: "secondary",
        color: "secondary.foreground",
        _hover: {
          bg: "secondary/80",
        },
      },
      outlined: {
        border: "base",
        bg: "background",
        color: "foreground",
        _hover: {
          bg: "secondary",
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
    layout: "withText",
  },
})
