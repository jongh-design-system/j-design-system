import { cn } from "@utils/cn"
import { Slot } from "radix-ui"
import { type ComponentPropsWithoutRef, forwardRef } from "react"

import { type ChipVariantProps, recipe } from "./recipe"

export type ChipProps = ComponentPropsWithoutRef<"button"> &
  ChipVariantProps & {
    asChild?: boolean
  }

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ asChild, className, children, size, variant, layout, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button"
    return (
      <Comp
        ref={ref}
        className={cn(recipe({ size, variant, layout }), className)}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)

Chip.displayName = "Chip"
