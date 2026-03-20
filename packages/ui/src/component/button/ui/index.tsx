import { cx } from "@jongh/new-system-output/react"
import type { ButtonVariantProps } from "@jongh/new-system-output/recipes/button"
import { Slot } from "radix-ui"
import type { ComponentPropsWithoutRef } from "react"
import { forwardRef } from "react"

import { recipe } from "./recipe"

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean
} & ButtonVariantProps

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button"
    const [variantProps, componentProps] = recipe.splitVariantProps(props)
    const recipeClassName = recipe(variantProps)
    return (
      <Comp
        ref={ref}
        className={cx(recipeClassName, className)}
        {...componentProps}
      />
    )
  },
)

Button.displayName = "Button"
