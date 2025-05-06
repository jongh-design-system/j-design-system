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
    whiteSpace: "nowrap",
    flexShrink: 0,

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
        "&:not(:disabled):hover": {
          bg: "secondary.active",
        },
      },
      outlined: {
        border: "base",
        bg: "background",
        color: "foreground",
        "&:not(:disabled):hover": {
          bg: "accent",
          color: "accent.foreground",
        },
      },
    },
    size: {
      sm: {
        height: "7",
        fontSize: "sm",
        textStyle: "label2",
        "& svg": {
          width: "3",
          height: "3",
        },
      },
      md: {
        height: "9",
        fontSize: "lg",
        textStyle: "label1",
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
