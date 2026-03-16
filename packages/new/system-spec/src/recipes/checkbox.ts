import { defineSlotRecipe } from "../define.ts"

const checkmarkSquare =
  "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M10.41 17.854c-.34 0-.679-.113-.905-.453l-5.203-5.203c-.566-.565-.566-1.357 0-1.923.566-.565 1.357-.565 1.923 0l4.185 4.185 7.465-7.465c.566-.565 1.357-.565 1.923 0 .566.566.566 1.358 0 1.923l-8.37 8.37c-.34.453-.679.566-1.018.566z' fill='%23fff'/%3E%3C/svg%3E\")"
const checkmarkGhost =
  "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M10.41 17.854c-.34 0-.679-.113-.905-.453l-5.203-5.203c-.566-.565-.566-1.357 0-1.923.566-.565 1.357-.565 1.923 0l4.185 4.185 7.465-7.465c.566-.565 1.357-.565 1.923 0 .566.566.566 1.358 0 1.923l-8.37 8.37c-.34.453-.679.566-1.018.566z' fill='%23808080'/%3E%3C/svg%3E\")"
const indeterminateSquare =
  "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='6' y='10.5' width='12' height='3' fill='%23fff'/%3E%3C/svg%3E\")"
const indeterminateGhost =
  "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='6' y='10.5' width='12' height='3' fill='%23808080'/%3E%3C/svg%3E\")"

export const checkboxRecipe = defineSlotRecipe({
  name: "checkbox",
  slots: ["root", "label", "input", "text"],
  base: {
    root: {
      position: "relative",
      display: "flex",
    },
    label: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      maxWidth: "100%",
      minHeight: "2.25rem",
      paddingLeft: "2rem",
      lineHeight: "1.5",
      cursor: "pointer",
      "& > input:disabled + span": {
        cursor: "not-allowed",
        opacity: "0.6",
      },
    },
    input: {
      appearance: "none",
      position: "absolute",
      left: "0",
      top: "50%",
      margin: "0",
      padding: "0",
      border: "none",
      outline: "none",
      backgroundColor: "transparent",
      transform: "translateY(-50%)",
      cursor: "pointer",
      "&::before": {
        content: '""',
        position: "absolute",
        inset: "0",
        transition:
          "background-color 120ms cubic-bezier(0.2, 0, 0, 1), border-color 120ms cubic-bezier(0.2, 0, 0, 1)",
      },
      "&::after": {
        content: '""',
        position: "absolute",
        inset: "0",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        opacity: "0",
      },
      _disabled: {
        cursor: "not-allowed",
      },
    },
    text: {
      color: "color.fg.default",
      textStyle: "typography.label.md",
      cursor: "pointer",
    },
  },
  variants: {
    size: {
      md: {
        input: {
          width: "1.5rem",
          height: "1.5rem",
        },
        text: {
          paddingLeft: "spacing.1",
        },
      },
      lg: {
        input: {
          width: "1.75rem",
          height: "1.75rem",
        },
        text: {
          paddingLeft: "spacing.2",
        },
      },
    },
    variant: {
      square: {
        input: {
          "&::before": {
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "color.stroke.default",
            borderRadius: "radius.lg",
            backgroundColor: "color.bg.elevated",
          },
          "&::after": {
            backgroundImage: checkmarkSquare,
          },
          "&:checked::before, &[data-checked]::before": {
            backgroundColor: "color.bg.accent",
            borderColor: "color.bg.accent",
          },
          "&:checked::after, &[data-checked]::after": {
            opacity: "1",
          },
          "&:indeterminate::before, &[data-indeterminate]::before": {
            backgroundColor: "color.bg.accent",
            borderColor: "color.bg.accent",
          },
          "&:indeterminate::after, &[data-indeterminate]::after": {
            backgroundImage: indeterminateSquare,
            opacity: "1",
          },
        },
      },
      ghost: {
        input: {
          "&::before": {
            border: "none",
            backgroundColor: "transparent",
          },
          "&::after": {
            backgroundImage: "none",
            maskImage: checkmarkGhost,
            maskRepeat: "no-repeat",
            maskPosition: "center",
            backgroundColor: "color.icon.muted",
            opacity: "1",
          },
          "&:checked::after, &[data-checked]::after": {
            backgroundColor: "color.icon.default",
          },
          "&:indeterminate::after, &[data-indeterminate]::after": {
            maskImage: indeterminateGhost,
            backgroundColor: "color.icon.default",
          },
        },
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "md",
    variant: "square",
  },
})
