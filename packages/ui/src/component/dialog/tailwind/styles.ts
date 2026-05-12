import { tv } from "tailwind-variants"

export const dialog = tv({
  slots: {
    trigger: "",
    portal: "",
    overlay: "fixed inset-0 bg-layer-overlay",
    close:
      "absolute right-4 top-4 cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none",
    content:
      "fixed left-1/2 top-1/2 z-[1000] max-h-[85vh] w-full max-w-[32rem] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-md border border-stroke-subtle bg-layer-floating p-4 text-foreground data-[state=closed]:animate-fade-out data-[state=open]:animate-content-show",
    header: "flex flex-col gap-1.5 text-foreground-emphasized typo-heading2",
    footer: "flex flex-col-reverse text-foreground-muted",
    title: "typo-heading1",
    description: "text-foreground typo-body1",
  },
})
