import { tv } from "tailwind-variants"

export const accordion = tv({
  slots: {
    root: "",
    item: "",
    header: "flex",
    trigger: [
      "flex flex-1 cursor-pointer items-center justify-between px-1 py-2 text-foreground-emphasized typo-heading2 transition-colors",
      "[&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:transition-transform",
      "data-[state=open]:[&>svg]:rotate-180",
    ],
    content:
      "overflow-hidden text-foreground-muted typo-body2 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    contentWrapper: "px-1 py-1",
  },
  variants: {
    variant: {
      outline: {
        trigger: "[&:hover]:text-primary",
        item: "border-b border-stroke",
      },
      subtle: {
        item: "rounded-md data-[state=open]:bg-neutral",
        header: "rounded-md",
        trigger: "rounded-md [&:hover]:bg-neutral",
      },
    },
  },
  defaultVariants: {
    variant: "outline",
  },
})
