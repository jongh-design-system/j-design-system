import { tv } from "tailwind-variants"

export const recipe = tv({
  slots: {
    root: "flex flex-col rounded-md shadow-sm bg-base-100 text-base-content overflow-hidden",
    header: "flex items-center justify-between p-3",
    title: "text-xl",
    navButton: [
      "flex items-center justify-center size-8 rounded-full cursor-pointer",
      "text-base-content/60 hover:opacity-80 hover:bg-base-200",
      "active:opacity-60",
      "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent",
      "[&_svg]:size-4",
    ],
    weekday: "flex justify-between p-2",
    daysGrid: "flex flex-col p-2",
    weekRow: "flex w-full justify-between mb-1 last:mb-0",
    dayCell: [
      "flex items-center justify-center min-w-4 min-h-4",
      "rounded-md text-sm cursor-pointer",
      "hover:opacity-80 hover:bg-base-200 active:opacity-60",
    ],
  },
})
