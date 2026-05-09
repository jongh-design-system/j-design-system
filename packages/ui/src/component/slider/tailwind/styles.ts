import { tv } from "tailwind-variants"

export const slider = tv({
  slots: {
    root: "relative flex touch-none select-none items-center",
    track: "relative h-2 w-full grow overflow-hidden rounded-full bg-neutral",
    range: "absolute h-full bg-primary",
    thumb:
      "block size-5 cursor-pointer rounded-full border-2 border-stroke-ring bg-neutral disabled:pointer-events-none disabled:opacity-50",
  },
})
