import { tv } from "tailwind-variants"

export const recipe = tv({
  slots: {
    root: "relative flex size-12 shrink-0 overflow-hidden rounded-full",
    image: "aspect-square size-full",
    fallback:
      "flex size-full items-center justify-center rounded-full bg-neutral",
  },
})
