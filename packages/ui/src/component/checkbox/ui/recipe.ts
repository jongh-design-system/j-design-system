import { tv, type VariantProps } from "tailwind-variants"

const checkmark = {
  square:
    "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Cpath d=%27M10.41 17.854c-.34 0-.679-.113-.905-.453l-5.203-5.203c-.566-.565-.566-1.357 0-1.923.566-.565 1.357-.565 1.923 0l4.185 4.185 7.465-7.465c.566-.565 1.357-.565 1.923 0 .566.566.566 1.358 0 1.923l-8.37 8.37c-.34.453-.679.566-1.018.566z%27 fill=%27%23fff%27/%3E%3C/svg%3E')",
  ghost:
    "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 24 24%22%3E%3Cpath d%3D%22M10.41 17.854c-.34 0-.679-.113-.905-.453l-5.203-5.203c-.566-.565-.566-1.357 0-1.923.566-.565 1.357-.565 1.923 0l4.185 4.185 7.465-7.465c.566-.565 1.357-.565 1.923 0 .566.566.566 1.358 0 1.923l-8.37 8.37c-.34.453-.679.566-1.018.566z%22 fill%3D%22%23808080%22/%3E%3C/svg%3E')",
  indeterminate_square:
    "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Crect x=%276%27 y=%2710.5%27 width=%2712%27 height=%273%27 fill=%27%23fff%27/%3E%3C/svg%3E')",
  indeterminate_ghost:
    "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 24 24%22%3E%3Crect x%3D%226%22 y%3D%2210.5%22 width%3D%2212%22 height%3D%223%22 fill%3D%22%23808080%22/%3E%3C/svg%3E')",
}

export const checkboxRecipe = tv({
  slots: {
    root: "relative flex",
    label:
      "inline-flex items-center relative max-w-full min-h-9 pl-8 leading-relaxed",
    input: [
      "border-none cursor-pointer absolute left-0 m-0 p-0 w-0 h-0 top-1/2",
      "before:left-0 before:content-[''] before:absolute before:transition-colors before:-translate-y-1/2",
      "after:content-[''] after:absolute after:-translate-y-1/2",
      "disabled:cursor-not-allowed",
    ],
    text: "text-sm font-semibold leading-snug tracking-wide cursor-pointer peer-disabled:cursor-not-allowed",
  },
  variants: {
    size: {
      md: {
        input: "before:size-6 after:size-6",
        text: "pl-1",
      },
      lg: {
        input: "before:size-7 after:size-7",
        text: "pl-2",
      },
    },
    variant: {
      square: {
        input: [
          `before:border before:border-base-300 before:rounded-lg before:bg-base-100`,
          `after:bg-[${checkmark.square}] after:bg-no-repeat after:bg-center after:opacity-0`,
          `checked:before:bg-primary checked:before:border-none checked:after:opacity-100`,
          `indeterminate:before:bg-primary indeterminate:before:border-none`,
          `indeterminate:after:bg-[${checkmark.indeterminate_square}] indeterminate:after:opacity-100`,
        ],
      },
      ghost: {
        input: [
          "before:border-none before:bg-transparent",
          `after:bg-none after:[mask-image:${checkmark.ghost}] after:bg-base-content/60 after:opacity-100`,
          "checked:before:bg-transparent checked:after:bg-primary",
          `indeterminate:before:bg-transparent indeterminate:after:bg-none indeterminate:after:[mask-image:${checkmark.indeterminate_ghost}] indeterminate:after:bg-primary indeterminate:after:opacity-100`,
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
