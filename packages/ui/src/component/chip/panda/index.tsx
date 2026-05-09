import { css, cx } from "@styled-system/css"
import { Slot } from "radix-ui"
import { type ComponentPropsWithoutRef, forwardRef } from "react"

import { type ChipVariantProps, recipe } from "./recipe"

export type ChipProps = ComponentPropsWithoutRef<"button"> &
  ChipVariantProps & {
    asChild?: boolean
  }

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ asChild, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button"
    const [variantProps, componentProps] = recipe.splitVariantProps(props)
    const styles = recipe.raw(variantProps)

    return (
      <Comp
        ref={ref}
        className={cx(css(styles), className)}
        {...componentProps}
      >
        {children}
      </Comp>
    )
  },
)

Chip.displayName = "Chip"
