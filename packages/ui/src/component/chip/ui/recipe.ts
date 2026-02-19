import { tv, type VariantProps } from "tailwind-variants"

export type ChipVariantProps = VariantProps<typeof recipe>

export const recipe = tv({
  base: [
    "inline-flex shrink-0 items-center justify-center",
    "cursor-pointer rounded-full whitespace-nowrap transition-colors",
    "[&_svg]:shrink-0",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  variants: {
    variant: {
      filled: `
        bg-secondary text-secondary-content
        hover:not-disabled:brightness-90
      `,
      outlined: `
        border border-base-300 bg-base-100 text-base-content
        hover:not-disabled:bg-base-200
      `,
    },
    size: {
      sm: `
        h-7 text-xs/snug font-semibold tracking-wide
        [&_svg]:size-3
      `,
      md: `
        h-9 text-sm/snug font-semibold tracking-wide
        [&_svg]:size-4
      `,
    },
    layout: {
      withText: "",
      iconOnly: `
        px-2
        [&_svg]:m-0
      `,
    },
  },
  compoundVariants: [
    { layout: "iconOnly", size: "sm", class: "size-7" },
    { layout: "iconOnly", size: "md", class: "size-9" },
    { layout: "withText", size: "sm", class: "gap-1 px-2 py-1" },
    { layout: "withText", size: "md", class: "gap-2 px-3 py-2" },
  ],
  defaultVariants: {
    variant: "filled",
    size: "md",
    layout: "withText",
  },
})
