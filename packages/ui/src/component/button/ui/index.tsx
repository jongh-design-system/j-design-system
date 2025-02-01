import { styled, type HTMLStyledProps } from "@styled-system/jsx"
import { button } from "@styled-system/recipes"
import type { ComponentPropsWithoutRef } from "react"
import { forwardRef } from "react"
import { Slot } from "radix-ui"

export type BaseButtonProps = ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean
}

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot.Slot : "button"

    return <Comp role="button" ref={ref} {...props}></Comp>
  },
)

BaseButton.displayName = "Button"

export const Button = styled(BaseButton, button)
export type ButtonProps = HTMLStyledProps<typeof Button>
