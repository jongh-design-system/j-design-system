import { recipe, ButtonVariantProps } from "./recipe"
import type { ComponentPropsWithoutRef } from "react"
import { forwardRef } from "react"
import { Slot } from "radix-ui"
import { css, cx } from "@styled-system/css"

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean
} & ButtonVariantProps

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button"
    const [variantProps, componentProps] = recipe.splitVariantProps(props)
    const styles = recipe.raw(variantProps)

    return (
      <Comp
        role="button"
        ref={ref}
        className={cx(css(styles), className)}
        {...componentProps}
      />
    )
  },
)

Button.displayName = "Button"
