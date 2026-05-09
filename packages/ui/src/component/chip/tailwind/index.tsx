import { cn } from "@utils/cn"
import { Slot } from "radix-ui"
import { type ComponentPropsWithoutRef, forwardRef } from "react"
import { type VariantProps } from "tailwind-variants"

import { chip } from "./styles"

export type ChipVariantProps = VariantProps<typeof chip>

export type ChipProps = ComponentPropsWithoutRef<"button"> &
  ChipVariantProps & {
    asChild?: boolean
  }

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    { asChild, className, variant, size, layout, children, ...componentProps },
    ref,
  ) => {
    const Comp = asChild ? Slot.Root : "button"

    return (
      <Comp
        ref={ref}
        className={cn(chip({ variant, size, layout }), className)}
        {...componentProps}
      >
        {children}
      </Comp>
    )
  },
)

Chip.displayName = "Chip"
