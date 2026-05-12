import { tv } from "tailwind-variants"

export const select = tv({
  slots: {
    trigger:
      "flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-stroke-subtle bg-layer px-2 typo-label1 placeholder:text-foreground-emphasized disabled:cursor-not-allowed disabled:opacity-50",
    viewport:
      "data-[position=popper]:h-[var(--radix-select-trigger-height)] data-[position=popper]:w-full data-[position=popper]:min-w-[var(--radix-select-trigger-width)]",
    content:
      "relative z-[100] max-h-96 min-w-full overflow-hidden rounded-md border border-stroke bg-layer py-1 text-foreground-emphasized shadow-md data-[position=popper]:data-[side=bottom]:translate-y-1 data-[position=popper]:data-[side=left]:-translate-x-1 data-[position=popper]:data-[side=right]:translate-x-1 data-[position=popper]:data-[side=top]:-translate-y-1 data-[state=closed]:animate-slide-in-down data-[state=open]:animate-fade-in",
    label: "py-1.5 pl-8 pr-2 typo-label1",
    item: "relative flex items-center rounded-sm py-1.5 pl-8 pr-2 text-sm hover:bg-layer-active data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    itemIndicator: "absolute left-2 flex size-3.5 items-center justify-center",
    separator: "-mx-1 my-1 h-1 bg-stroke",
  },
})
