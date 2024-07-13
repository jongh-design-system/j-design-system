import { forwardRef, ComponentPropsWithoutRef } from "react"
import { buttonCva, ButtonVariants } from "./style"
import Slot from "../Slot/Slot"

type ButtonProps = ButtonVariants &
  ComponentPropsWithoutRef<"button"> & { as?: boolean }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ as, id, className, children, disabled = false, ...rest }, ref) => {
    const Comp = as ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={buttonCva({ ...rest })}
        disabled={disabled}
        role="button"
        id={id}
        data-testid={id}
        {...rest}
      >
        {children}
      </Comp>
    )
  },
)
