import { cx } from "@styled-system/css"
import {
  buttonRecipe,
  type ButtonRecipeVariantProps,
} from "@styled-system/recipes"
import { Slot } from "radix-ui"
import type { ComponentPropsWithoutRef } from "react"
import { forwardRef } from "react"

export type ButtonVariantProps = ButtonRecipeVariantProps

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean
} & ButtonVariantProps

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button"
    const [variantProps, componentProps] = buttonRecipe.splitVariantProps(props)
    return (
      <Comp
        ref={ref}
        className={cx(buttonRecipe(variantProps), className)}
        {...componentProps}
      />
    )
  },
)

Button.displayName = "Button"
