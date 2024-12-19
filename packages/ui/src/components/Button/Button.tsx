import { forwardRef, ComponentPropsWithoutRef } from "react"
import { Slot } from "@radix-ui/react-slot"

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return <Comp role="button" ref={ref} {...props}></Comp>
  },
)
