import { tv, type VariantProps } from "tailwind-variants"

export const checkboxRecipe = tv({
  slots: {
    root: "relative flex",
    label: `
      relative inline-flex min-h-9 max-w-full items-center pl-8 leading-relaxed
    `,
    input: [
      "absolute top-1/2 left-0 m-0 size-0 cursor-pointer border-none p-0",
      `
        before:absolute before:left-0 before:-translate-y-1/2
        before:transition-colors before:content-['']
      `,
      "after:absolute after:-translate-y-1/2 after:content-['']",
      "disabled:cursor-not-allowed",
    ],
    text: `
      cursor-pointer text-sm/snug font-semibold tracking-wide
      peer-disabled:cursor-not-allowed
    `,
  },
  variants: {
    size: {
      md: {
        input: `
          before:size-6
          after:size-6
        `,
        text: "pl-1",
      },
      lg: {
        input: `
          before:size-7
          after:size-7
        `,
        text: "pl-2",
      },
    },
    variant: {
      square: {
        input: [
          `
            before:rounded-lg before:border before:border-base-300
            before:bg-base-100
          `,
          `
            after:bg-(image:--checkmark-square) after:bg-center
            after:bg-no-repeat after:opacity-0
          `,
          `
            checked:before:border-none checked:before:bg-primary
            checked:after:opacity-100
          `,
          `indeterminate:before:border-none indeterminate:before:bg-primary`,
          `
            indeterminate:after:bg-(image:--checkmark-indeterminate-square)
            indeterminate:after:opacity-100
          `,
        ],
      },
      ghost: {
        input: [
          "before:border-none before:bg-transparent",
          `
            after:bg-base-content/60 after:bg-none
            after:mask-(--checkmark-ghost) after:opacity-100
          `,
          `
            checked:before:bg-transparent
            checked:after:bg-primary
          `,
          `
            indeterminate:before:bg-transparent
            indeterminate:after:bg-primary indeterminate:after:bg-none
            indeterminate:after:mask-(--checkmark-indeterminate-ghost)
            indeterminate:after:opacity-100
          `,
        ],
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "square",
  },
})

export type CheckboxVariants = VariantProps<typeof checkboxRecipe>
