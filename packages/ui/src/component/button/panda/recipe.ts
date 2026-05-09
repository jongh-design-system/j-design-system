import { cva, type RecipeVariantProps } from "@styled-system/css"

export type ButtonVariantProps = RecipeVariantProps<typeof recipe>

export const recipe = cva({
  base: {
    alignItems: "center",
    cursor: "pointer",
    display: "inline-flex",
    flexShrink: 0,
    gap: "1",
    justifyContent: "center",
    minH: "9",
    rounded: "md",
    textStyle: "label1",
    whiteSpace: "nowrap",
    "& svg": {
      flexShrink: 0,
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: "0.5",
    },
  },
  variants: {
    size: {
      sm: {
        h: "9",
        px: "3",
        py: "1.5",
        textStyle: "label2",
      },
      md: {
        h: "10",
        px: "4",
        py: "2",
      },
      lg: {
        h: "11",
        px: "5",
        py: "2",
      },
    },
    variant: {
      destructive: {
        bg: "destructive",
        color: "destructive.foreground",
        "&:not(:disabled):hover": {
          bg: "destructive.active",
        },
      },
      link: {
        color: "foreground.primary",
        textUnderlineOffset: "2",
        "&:not(:disabled):hover": {
          textDecoration: "underline",
        },
      },
      outline: {
        bg: "layer",
        border: "base",
        color: "foreground.emphasized",
        "&:not(:disabled):hover": {
          bg: "neutral.active",
        },
      },
      primary: {
        bg: "primary",
        color: "primary.foreground",
        "&:not(:disabled):hover": {
          bg: "primary.active",
        },
      },
      secondary: {
        bg: "secondary",
        color: "secondary.foreground",
        "&:not(:disabled):hover": {
          bg: "secondary.active",
        },
      },
    },
  },
  compoundVariants: [
    {
      size: "sm",
      css: {
        "& svg": {
          height: "3.5",
          width: "3.5",
        },
      },
    },
    {
      size: "md",
      css: {
        "& svg": {
          height: "4",
          width: "4",
        },
      },
    },
    {
      size: "lg",
      css: {
        "& svg": {
          height: "5",
          width: "5",
        },
      },
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
})
