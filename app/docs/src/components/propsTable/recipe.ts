import { tv } from "tailwind-variants"

export const propsTableRecipe = tv({
  slots: {
    container: `
      my-6 w-full overflow-hidden overflow-x-auto rounded-lg border
      border-base-300 shadow-md
    `,
    table: "w-full border-collapse text-sm",
    thead: "bg-base-200",
    tbody: "bg-base-200",
    tr: `
      border-b border-base-300 transition-colors duration-150
      last:border-b-0
      hover:bg-base-200/30
    `,
    th: `
      px-4 py-3 text-left text-sm/snug font-semibold tracking-wide
      text-base-content
    `,
    td: "px-4 py-3 align-top text-sm/normal text-base-content",
    code: `
      rounded-sm bg-base-200 px-1.5 py-0.5 font-mono text-[0.875em] font-medium
      text-primary
    `,
  },
})
