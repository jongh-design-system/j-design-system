import { cn } from "@utils/cn"
import { Slot } from "radix-ui"
import type { ComponentPropsWithoutRef } from "react"
import { forwardRef } from "react"

import { type ButtonVariantProps, recipe } from "./recipe"

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean
} & ButtonVariantProps

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, className, size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button"
    return (
      <Comp
        ref={ref}
        className={cn(recipe({ size, variant }), className)}
        {...props}
      />
    )
  },
)

Button.displayName = "Button"
