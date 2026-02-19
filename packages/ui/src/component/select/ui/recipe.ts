import { tv } from "tailwind-variants"

export const recipe = tv({
  slots: {
    root: "",
    group: "",
    value: "",
    trigger: [
      "flex h-10 w-full items-center justify-between px-2",
      "cursor-pointer rounded-md border border-base-200",
      "text-sm/snug font-semibold tracking-wide",
      `
        bg-base-100
        placeholder:text-base-content
      `,
      "disabled:cursor-not-allowed disabled:opacity-50",
    ],
    viewport: `
      data-[position=popper]:h-(--radix-select-trigger-height)
      data-[position=popper]:w-full
      data-[position=popper]:min-w-(--radix-select-trigger-width)
    `,
    content: [
      "relative z-100 min-w-full overflow-hidden",
      "rounded-md border border-base-300 shadow-md",
      "max-h-96 bg-base-100 py-1 text-base-content",
      "data-[position=popper]:data-[side=top]:-translate-y-1",
      "data-[position=popper]:data-[side=bottom]:translate-y-1",
      "data-[position=popper]:data-[side=left]:-translate-x-1",
      "data-[position=popper]:data-[side=right]:translate-x-1",
    ],
    label: "py-1.5 pr-2 pl-8 text-sm/snug font-semibold tracking-wide",
    item: [
      "relative flex items-center rounded-sm py-1.5 pr-2 pl-8 text-sm",
      "hover:bg-base-300",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
    ],
    itemIndicator: "absolute left-2 flex size-3.5 items-center justify-center",
    separator: "-mx-1 my-1 h-px bg-base-300",
  },
})
