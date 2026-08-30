import { cx } from "@styled-system/css"
import {
  buttonRecipe,
  type ButtonRecipeVariantProps,
} from "@styled-system/recipes"
import { Primitive } from "radix-ui/internal"
import type { ComponentPropsWithoutRef, ComponentRef } from "react"
import { forwardRef } from "react"

export type ButtonVariantProps = ButtonRecipeVariantProps

export type ButtonProps = ComponentPropsWithoutRef<typeof Primitive.button> &
  ButtonVariantProps

export const Button = forwardRef<
  ComponentRef<typeof Primitive.button>,
  ButtonProps
>(({ asChild, className, ...props }, ref) => {
  const [variantProps, componentProps] = buttonRecipe.splitVariantProps(props)
  return (
    <Primitive.button
      asChild={asChild}
      ref={ref}
      className={cx(buttonRecipe(variantProps), className)}
      {...componentProps}
    />
  )
})

Button.displayName = "Button"
