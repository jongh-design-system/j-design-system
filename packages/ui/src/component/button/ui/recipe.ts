import { tv, type VariantProps } from "tailwind-variants"

export type ButtonVariantProps = VariantProps<typeof recipe>

export const recipe = tv({
  base: [
    "inline-flex shrink-0 items-center justify-center gap-1",
    "min-h-9 cursor-pointer rounded-md whitespace-nowrap",
    "text-sm/snug font-semibold tracking-wide",
    "[&_svg]:shrink-0",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  variants: {
    size: {
      sm: `
        h-9 px-3 py-1.5 text-xs font-semibold
        [&_svg]:size-3.5
      `,
      md: `
        h-10 px-4 py-2
        [&_svg]:size-4
      `,
      lg: `
        h-11 px-5 py-2
        [&_svg]:size-5
      `,
    },
    variant: {
      primary: `
        bg-primary text-primary-content
        hover:not-disabled:brightness-90
      `,
      secondary: `
        bg-secondary text-secondary-content
        hover:not-disabled:brightness-90
      `,
      destructive: `
        bg-error text-error-content
        hover:not-disabled:brightness-90
      `,
      outline: `
        border border-base-300 bg-base-100 text-base-content
        hover:not-disabled:bg-base-200
      `,
      link: `
        text-primary underline-offset-2
        hover:not-disabled:underline
      `,
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
})
