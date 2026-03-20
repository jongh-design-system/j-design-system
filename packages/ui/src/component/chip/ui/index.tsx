import { cx } from "@jongh/new-system-output/react"
import type { ChipVariantProps } from "@jongh/new-system-output/recipes/chip"
import { Slot } from "radix-ui"
import { type ComponentPropsWithoutRef, forwardRef } from "react"

import { recipe } from "./recipe"

export type ChipProps = ComponentPropsWithoutRef<"button"> &
  ChipVariantProps & {
    asChild?: boolean
  }

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ asChild, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button"
    const [variantProps, componentProps] = recipe.splitVariantProps(props)
    const recipeClassName = recipe(variantProps)

    return (
      <Comp
        ref={ref}
        className={cx(recipeClassName, className)}
        {...componentProps}
      >
        {children}
      </Comp>
    )
  },
)

Chip.displayName = "Chip"
