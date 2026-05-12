import { tv } from "tailwind-variants"

export const checkmark = {
  square:
    "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Cpath d=%27M10.41 17.854c-.34 0-.679-.113-.905-.453l-5.203-5.203c-.566-.565-.566-1.357 0-1.923.566-.565 1.357-.565 1.923 0l4.185 4.185 7.465-7.465c.566-.565 1.357-.565 1.923 0 .566.566.566 1.358 0 1.923l-8.37 8.37c-.34.453-.679.566-1.018.566z%27 fill=%27%23fff%27/%3E%3C/svg%3E')",
  ghost:
    "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 24 24%22%3E%3Cpath d%3D%22M10.41 17.854c-.34 0-.679-.113-.905-.453l-5.203-5.203c-.566-.565-.566-1.357 0-1.923.566-.565 1.357-.565 1.923 0l4.185 4.185 7.465-7.465c.566-.565 1.357-.565 1.923 0 .566.566.566 1.358 0 1.923l-8.37 8.37c-.34.453-.679.566-1.018.566z%22 fill%3D%22%23808080%22/%3E%3C/svg%3E')",
  indeterminateSquare:
    "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Crect x=%276%27 y=%2710.5%27 width=%2712%27 height=%273%27 fill=%27%23fff%27/%3E%3C/svg%3E')",
  indeterminateGhost:
    "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 24 24%22%3E%3Crect x%3D%226%22 y%3D%2210.5%22 width%3D%2212%22 height%3D%223%22 fill%3D%22%23808080%22/%3E%3C/svg%3E')",
}

export const checkbox = tv({
  slots: {
    root: "relative flex",
    label:
      "relative inline-flex min-h-9 max-w-full items-center pl-8 leading-relaxed",
    input: [
      "peer absolute left-0 top-1/2 m-0 size-0 -translate-y-1/2 cursor-pointer border-0 p-0 disabled:cursor-not-allowed",
      "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-[''] before:transition-colors",
      "after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:bg-center after:bg-no-repeat after:content-['']",
    ],
    text: "cursor-pointer typo-label1 peer-disabled:cursor-not-allowed",
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
          "before:rounded-lg before:border before:border-stroke before:bg-background",
          "checked:before:border-0 checked:before:bg-primary data-[indeterminate]:before:border-0 data-[indeterminate]:before:bg-primary",
          "after:opacity-0 checked:after:opacity-100 checked:after:[background-image:var(--jds-checkbox-check)]",
          "data-[indeterminate]:after:opacity-100 data-[indeterminate]:after:[background-image:var(--jds-checkbox-indeterminate)]",
        ],
      },
      ghost: {
        input: [
          "before:bg-transparent after:bg-foreground-muted after:[mask-image:var(--jds-checkbox-check)]",
          "checked:after:bg-foreground-primary data-[indeterminate]:after:bg-foreground-primary",
          "data-[indeterminate]:after:[mask-image:var(--jds-checkbox-indeterminate)]",
        ],
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "square",
  },
})
