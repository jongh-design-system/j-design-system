import { tv, type VariantProps } from "tailwind-variants"

export const recipe = tv({
  slots: {
    root: "",
    item: "",
    header: "flex",
    trigger: [
      "flex flex-1 items-center justify-between cursor-pointer",
      "px-1 py-2 text-base font-semibold leading-normal text-base-content",
      "transition-colors",
      "[&>svg]:shrink-0 [&>svg]:size-4 [&>svg]:transition-transform [&>svg]:duration-200",
      "data-[state=open]:[&>svg]:rotate-180",
    ],
    content: [
      "overflow-hidden text-sm leading-normal text-base-content/60",
      "transition-all",
      "data-[state=closed]:animate-accordion-up",
      "data-[state=open]:animate-accordion-down",
    ],
    contentWrapper: "px-1 py-1",
  },
  variants: {
    variant: {
      outline: {
        trigger: "hover:text-primary",
        item: "border-b border-base-300",
      },
      subtle: {
        item: "rounded-md data-[state=open]:bg-neutral",
        header: "rounded-md",
        trigger: "rounded-md hover:bg-neutral hover:rounded-md",
      },
    },
  },
  defaultVariants: {
    variant: "outline",
  },
})

export type AccordionVariants = VariantProps<typeof recipe>
