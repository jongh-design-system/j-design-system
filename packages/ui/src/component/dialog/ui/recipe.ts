import { tv } from "tailwind-variants"

export const recipe = tv({
  slots: {
    root: "",
    trigger: "",
    portal: "",
    overlay: "fixed inset-0 bg-black/50",
    close: [
      "absolute right-4 top-4 rounded-sm opacity-70 cursor-pointer",
      "transition-opacity hover:opacity-100",
      "disabled:pointer-events-none",
    ],
    content: [
      "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      "w-full max-w-[32rem] max-h-[85vh] z-[1000]",
      "bg-base-200 text-base-content border border-base-200",
      "rounded-md p-4 overflow-auto",
    ],
    header:
      "flex flex-col gap-1.5 text-base-content text-base font-semibold leading-normal",
    footer: "flex flex-col-reverse text-base-content/60",
    title: "text-lg font-semibold leading-normal",
    description: "text-base leading-relaxed text-base-content",
  },
})
