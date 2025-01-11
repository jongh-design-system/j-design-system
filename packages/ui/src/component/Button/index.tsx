import { styled, type HTMLStyledProps } from "@styled-system/jsx"
import { button } from "@styled-system/recipes"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

export type BaseButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean
}

export const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return <Comp role="button" ref={ref} {...props}></Comp>
  },
)

BaseButton.displayName = "Button"

export const Button = styled(BaseButton, button)
export type ButtonProps = HTMLStyledProps<typeof Button>
