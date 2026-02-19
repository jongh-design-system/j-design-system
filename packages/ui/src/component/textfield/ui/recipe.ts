import { tv, type VariantProps } from "tailwind-variants"

export const recipe = tv({
  slots: {
    root: "flex w-full flex-col gap-1.5",
    heading: "text-sm/snug font-semibold tracking-wide",
    container: [
      "flex min-h-12 w-full items-center gap-1.5 p-3",
      "rounded-md border border-base-200 shadow-sm",
      "transition-colors duration-150 ease-in",
      "has-disabled:cursor-not-allowed",
      "focus-within:border-primary",
    ],
    input: `
      flex-1 border-none outline-none
      disabled:cursor-not-allowed
    `,
    trailingButton: "flex max-h-2 items-center whitespace-nowrap",
    helper: `
      self-stretch text-[0.625rem] leading-tight font-semibold tracking-wide
      text-base-content/60
    `,
  },
  variants: {
    status: {
      normal: {},
      negative: {
        container: `
          border-error
          focus-within:border-error
        `,
        helper: "text-error",
      },
    },
  },
  defaultVariants: {
    status: "normal",
  },
})

export type TextFieldVariantProps = VariantProps<typeof recipe>
