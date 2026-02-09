import { tv } from "tailwind-variants"

export const recipe = tv({
  slots: {
    root: "relative flex size-12 shrink-0 overflow-hidden rounded-full",
    image: "aspect-square h-full w-full",
    fallback:
      "flex h-full w-full items-center justify-center rounded-full bg-neutral",
  },
})
