import { css, cx } from "@styled-system/css"
import { Slot } from "radix-ui"
import type { ComponentProps, Ref } from "react"

import { ButtonVariantProps, recipe } from "./recipe"

export type ButtonProps = ComponentProps<"button"> & {
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
} & ButtonVariantProps

export const Button = ({ asChild, className, ref, ...props }: ButtonProps) => {
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
}
