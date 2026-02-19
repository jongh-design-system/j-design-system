import { tv } from "tailwind-variants"

export const recipe = tv({
  slots: {
    root: "",
    list: `
      inline-flex h-10 items-center justify-center rounded-md bg-base-200 p-1
      text-base-content
    `,
    trigger: [
      "inline-flex items-center justify-center whitespace-nowrap",
      "cursor-pointer rounded-sm px-3 py-1.5 text-sm font-medium transition-all",
      "disabled:pointer-events-none disabled:opacity-50",
      `
        data-[state=active]:bg-base-100 data-[state=active]:text-base-content
        data-[state=active]:shadow-sm
      `,
    ],
    content: "mt-2",
  },
})
