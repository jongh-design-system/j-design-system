import { cva, type RecipeVariantProps } from "@styled-system/css"

export type ButtonVariantProps = RecipeVariantProps<typeof recipe>

export const recipe = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    minH: "9",
    gap: "1",
    textStyle: "label1",
    whiteSpace: "nowrap",
    rounded: "md",
    cursor: "pointer",
    "& svg": {
      flexShrink: 0,
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: "0.5",
    },
  },
  variants: {
    variant: {
      primary: {
        bg: "primary",
        color: "primary.foreground",
        "&:not(:disabled):hover": {
          bg: "primary.active",
        },
      },
      destructive: {
        bg: "destructive",
        color: "destructive.foreground",
        "&:not(:disabled):hover": {
          bg: "destructive.active",
        },
      },
      outline: {
        bg: "layer",
        color: "layer.foreground",
        border: "input",
        "&:not(:disabled):hover": {
          bg: "accent.active",
        },
      },
      secondary: {
        bg: "secondary",
        color: "secondary.foreground",
        "&:not(:disabled):hover": {
          bg: "secondary.active",
        },
      },
      link: {
        color: "primary",
        textUnderlineOffset: "2",
        "&:not(:disabled):hover": {
          textDecoration: "underline",
        },
      },
    },
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
  },
  compoundVariants: [
    {
      size: "sm",
      css: {
        "& svg": {
          width: "3.5",
          height: "3.5",
        },
      },
    },
    {
      size: "md",
      css: {
        "& svg": {
          width: "4",
          height: "4",
        },
      },
    },
    {
      size: "lg",
      css: {
        "& svg": {
          width: "5",
          height: "5",
        },
      },
    },
  ],
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})
