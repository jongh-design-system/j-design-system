import { tv } from "tailwind-variants"

export const chip = tv({
  base: [
    "inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-full transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "[&_svg]:shrink-0",
  ],
  variants: {
    variant: {
      filled:
        "bg-secondary text-secondary-foreground [&:not(:disabled):hover]:bg-secondary-active",
      outlined:
        "border border-stroke bg-layer text-foreground-emphasized [&:not(:disabled):hover]:bg-neutral-active",
    },
    size: {
      sm: "h-7 typo-label2 [&_svg]:size-3",
      md: "h-9 typo-label1 [&_svg]:size-4",
    },
    layout: {
      withText: "",
      iconOnly: "[&_svg]:m-0",
    },
  },
  compoundVariants: [
    {
      layout: "iconOnly",
      size: "sm",
      class: "size-7 px-2",
    },
    {
      layout: "iconOnly",
      size: "md",
      class: "size-9 px-2",
    },
    {
      layout: "withText",
      size: "sm",
      class: "gap-1 px-2 py-1",
    },
    {
      layout: "withText",
      size: "md",
      class: "gap-2 px-3 py-2",
    },
  ],
  defaultVariants: {
    variant: "filled",
    size: "md",
    layout: "withText",
  },
})
