import { tv } from "tailwind-variants"

export const recipe = tv({
  slots: {
    root: "",
    trigger: "",
    portal: "",
    overlay: "fixed inset-0 bg-black/8",
    close: [
      "absolute top-4 right-4 cursor-pointer rounded-sm opacity-70",
      `
        transition-opacity
        hover:opacity-100
      `,
      "disabled:pointer-events-none",
      "data-[state=open]:bg-accent data-[state=open]:text-base-content",
    ],
    content: [
      "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      "max-h-[85vh] w-full max-w-lg",
      "rounded-md border border-base-300 bg-base-100 p-4",
    ],
    header: "flex flex-col gap-1.5",
    footer: "flex flex-col-reverse",
    title: "text-lg leading-none font-semibold tracking-tight",
    description: "text-sm text-base-content",
  },
})
