import { tv } from "tailwind-variants"

export const recipe = tv({
  slots: {
    root: `
      flex flex-col overflow-hidden rounded-md bg-base-100 text-base-content
      shadow-sm
    `,
    header: "flex items-center justify-between p-3",
    title: "text-xl",
    navButton: [
      "flex size-8 cursor-pointer items-center justify-center rounded-full",
      `
        text-base-content/60
        hover:bg-base-200 hover:opacity-80
      `,
      "active:opacity-60",
      `
        disabled:cursor-not-allowed disabled:opacity-40
        disabled:hover:bg-transparent
      `,
      "[&_svg]:size-4",
    ],
    weekday: "flex justify-between p-2",
    daysGrid: "flex flex-col p-2",
    weekRow: `
      mb-1 flex w-full justify-between
      last:mb-0
    `,
    dayCell: [
      "flex min-h-4 min-w-4 items-center justify-center",
      "cursor-pointer rounded-md text-sm",
      `
        hover:bg-base-200 hover:opacity-80
        active:opacity-60
      `,
    ],
  },
})
