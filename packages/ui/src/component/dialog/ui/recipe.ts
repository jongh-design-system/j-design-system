import { tv } from "tailwind-variants"

export const recipe = tv({
  slots: {
    root: "",
    trigger: "",
    portal: "",
    overlay: "fixed inset-0 bg-black/50",
    close: [
      "absolute top-4 right-4 cursor-pointer rounded-sm opacity-70",
      `
        transition-opacity
        hover:opacity-100
      `,
      "disabled:pointer-events-none",
    ],
    content: [
      "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      "z-1000 max-h-[85vh] w-full max-w-lg",
      "border border-base-200 bg-base-200 text-base-content",
      "overflow-auto rounded-md p-4",
    ],
    header: `
      flex flex-col gap-1.5 text-base/normal font-semibold text-base-content
    `,
    footer: "flex flex-col-reverse text-base-content/60",
    title: "text-lg/normal font-semibold",
    description: "text-base/relaxed text-base-content",
  },
})
