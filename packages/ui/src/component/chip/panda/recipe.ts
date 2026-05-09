import { cva, type RecipeVariantProps } from "@styled-system/css"

export type ChipVariantProps = RecipeVariantProps<typeof recipe>
export const recipe = cva({
  base: {
    alignItems: "center",
    borderRadius: "full",
    cursor: "pointer",
    display: "inline-flex",
    flexShrink: 0,
    justifyContent: "center",
    transition: "colors",
    whiteSpace: "nowrap",

    "& svg": {
      flexShrink: 0,
    },

    _disabled: {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
  variants: {
    variant: {
      filled: {
        bg: "secondary",
        color: "secondary.foreground",
        "&:not(:disabled):hover": {
          bg: "secondary.active",
        },
      },
      outlined: {
        bg: "layer",
        border: "base",
        color: "foreground.emphasized",
        "&:not(:disabled):hover": {
          bg: "neutral.active",
        },
      },
    },
    size: {
      sm: {
        fontSize: "sm",
        height: "7",
        textStyle: "label2",
        "& svg": {
          height: "3",
          width: "3",
        },
      },
      md: {
        fontSize: "lg",
        height: "9",
        textStyle: "label1",
        "& svg": {
          height: "4",
          width: "4",
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
        height: "7",
        width: "7",
      },
    },
    {
      layout: "iconOnly",
      size: "md",
      css: {
        height: "9",
        width: "9",
      },
    },
    {
      layout: "withText",
      size: "sm",
      css: {
        gap: "1",
        px: "2",
        py: "1",
      },
    },
    {
      layout: "withText",
      size: "md",
      css: {
        gap: "2",
        px: "3",
        py: "2",
      },
    },
  ],
  defaultVariants: {
    variant: "filled",
    size: "md",
    layout: "withText",
  },
})
