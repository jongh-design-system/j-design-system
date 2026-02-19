import { tv, type VariantProps } from "tailwind-variants"

export type ButtonVariantProps = VariantProps<typeof recipe>

export const recipe = tv({
  base: [
    "inline-flex items-center justify-center gap-2",
    "cursor-pointer rounded-md text-sm font-medium",
    "transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  variants: {
    variant: {
      default: `
        bg-primary text-primary-content
        hover:not-disabled:brightness-90
      `,
      destructive: `
        bg-error text-error-content
        hover:not-disabled:brightness-90
      `,
      outline: `
        border border-base-300 bg-base-100
        hover:not-disabled:bg-accent hover:not-disabled:text-accent-content
      `,
      secondary: `
        bg-secondary text-secondary-content
        hover:not-disabled:brightness-90
      `,
      ghost:
        "hover:not-disabled:bg-accent hover:not-disabled:text-accent-content",
      link: `
        text-primary underline-offset-4
        hover:not-disabled:underline
      `,
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})
