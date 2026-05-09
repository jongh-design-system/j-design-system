import { tv } from "tailwind-variants"

export const tabs = tv({
  slots: {
    root: "",
    list: "inline-flex h-10 items-center justify-center rounded-md bg-layer-floating p-1 text-foreground-emphasized",
    trigger:
      "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
    content: "mt-2",
  },
})
