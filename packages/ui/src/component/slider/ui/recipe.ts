import { tv } from "tailwind-variants"

export const recipe = tv({
  slots: {
    root: "relative flex touch-none items-center select-none",
    track: "relative h-2 w-full grow overflow-hidden rounded-full bg-neutral",
    range: "absolute h-full bg-primary",
    thumb: [
      `
        block size-5 cursor-pointer rounded-full border-2 border-primary
        bg-neutral
      `,
      "disabled:pointer-events-none disabled:opacity-50",
    ],
  },
})
