import { tv } from "tailwind-variants"

export const recipe = tv({
  slots: {
    root: `
      sticky top-16 left-0 z-5 block h-[calc(100vh-4rem)] w-full overflow-hidden
      border-r border-base-300
      max-md:hidden
    `,
    content: `
      h-full overflow-y-auto px-4 py-6
      [&::-webkit-scrollbar]:w-[6px]
      [&::-webkit-scrollbar-thumb]:rounded-[3px]
      [&::-webkit-scrollbar-thumb]:bg-base-300
      [&::-webkit-scrollbar-track]:bg-transparent
    `,
    section: "mb-6 flex flex-col gap-1",
    sectionTitle: `
      rounded-md px-2 py-1 text-xs font-semibold tracking-wider
      text-base-content/60 uppercase
    `,
    navItems: "grid grid-flow-row auto-rows-max gap-0.5 text-sm",
    navItem: `
      relative flex h-8 w-full items-center rounded-lg px-2 font-normal
      text-base-content no-underline transition-colors duration-75
      after:absolute after:inset-x-0 after:-inset-y-[2px] after:rounded-lg
      after:content-['']
      hover:bg-accent/90 hover:text-accent-content
    `,
    label: `
      ml-2 rounded-md px-1.5 py-0.5 text-xs leading-none no-underline
      group-hover:no-underline
    `,
    overlay: "fixed inset-0 z-30 bg-base-200/50",
    toggle: `
      fixed top-4 right-4 z-50 flex cursor-pointer items-center justify-center
      rounded-md border border-base-300 bg-base-100 p-2 transition-colors
      duration-150
      hover:bg-accent hover:text-accent-content hover:opacity-90
    `,
  },
  variants: {
    active: {
      true: {
        navItem: `
          bg-primary/10 font-medium text-primary
          before:absolute before:top-1/2 before:left-0 before:h-[60%]
          before:w-[3px] before:-translate-y-1/2 before:rounded-full
          before:bg-primary before:content-['']
          hover:bg-primary/20 hover:text-primary
        `,
      },
    },
  },
})
