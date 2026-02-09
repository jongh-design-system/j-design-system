import { tv, type VariantProps } from "tailwind-variants"

export const recipe = tv({
  slots: {
    root: "flex flex-col gap-1.5 w-full",
    heading: [
      "text-sm font-semibold leading-snug tracking-wide",
      "after:content-['*'] after:text-error after:text-sm after:ml-0.5",
    ],
    container: [
      "flex items-center gap-1.5 min-h-12 p-3 w-full",
      "border border-base-200 rounded-md shadow-sm",
      "transition-colors ease-in duration-150",
      "has-[:disabled]:cursor-not-allowed",
      "focus-within:border-primary",
    ],
    input: "border-none outline-none flex-1 disabled:cursor-not-allowed",
    trailingButton: "flex items-center whitespace-nowrap max-h-2",
    helper:
      "self-stretch text-base-content/60 text-[0.625rem] font-semibold leading-tight tracking-wide",
  },
  variants: {
    status: {
      normal: {},
      negative: {
        container: "border-error focus-within:border-error",
        helper: "text-error",
      },
    },
  },
  defaultVariants: {
    status: "normal",
  },
})

export type TextFieldVariantProps = VariantProps<typeof recipe>
