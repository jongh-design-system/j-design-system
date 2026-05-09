import { tv } from "tailwind-variants"

export const button = tv({
  base: [
    "inline-flex min-h-9 shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-md",
    "text-style-label1 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    "[&_svg]:shrink-0",
  ],
  variants: {
    size: {
      sm: "h-9 px-3 py-1.5 text-style-label2 [&_svg]:size-3.5",
      md: "h-10 px-4 py-2 [&_svg]:size-4",
      lg: "h-11 px-5 py-2 [&_svg]:size-5",
    },
    variant: {
      destructive:
        "bg-destructive text-destructive-foreground [&:not(:disabled):hover]:bg-destructive-active",
      link: "text-foreground-primary underline-offset-2 [&:not(:disabled):hover]:underline",
      outline:
        "border border-stroke bg-layer text-foreground-emphasized [&:not(:disabled):hover]:bg-neutral-active",
      primary:
        "bg-primary text-primary-foreground [&:not(:disabled):hover]:bg-primary-active",
      secondary:
        "bg-secondary text-secondary-foreground [&:not(:disabled):hover]:bg-secondary-active",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
})
