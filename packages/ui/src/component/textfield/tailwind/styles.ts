import { tv } from "tailwind-variants"

export const textField = tv({
  slots: {
    root: "flex w-full flex-col gap-1.5",
    heading: "text-style-label1",
    container:
      "flex min-h-12 w-full items-center gap-1.5 rounded-md border border-stroke-subtle p-3 shadow-sm transition-colors duration-150 ease-in focus-within:border-primary [&:has(input:disabled)]:cursor-not-allowed",
    input:
      "flex-1 border-0 bg-transparent outline-none disabled:cursor-not-allowed",
    trailingButton: "flex max-h-2 items-center whitespace-nowrap",
    helper: "self-stretch text-foreground-muted text-style-caption2",
  },
  variants: {
    status: {
      normal: {},
      negative: {
        container: "border-destructive focus-within:border-destructive",
        helper: "text-destructive",
      },
    },
  },
  defaultVariants: {
    status: "normal",
  },
})
