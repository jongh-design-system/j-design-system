import { forwardRef, ComponentPropsWithoutRef, type ReactNode } from "react"
import { button, type ButtonVariant } from "@styled-system/recipes"
import { Slot } from "@radix-ui/react-slot"
import { cx } from "@styled-system/css"

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode
  as?: boolean
  disabled?: boolean
} & Partial<ButtonVariant>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ as, disabled, id, onClick, children, ...rest }, ref) => {
    const [buttonProps] = button.splitVariantProps(rest)

    const Comp = as ? Slot : "button"

    return (
      <Comp
        role="button"
        ref={ref}
        disabled={disabled}
        id={id}
        onClick={onClick}
        className={cx(button(buttonProps))}
        {...rest}
      >
        {children}
      </Comp>
    )
  },
)
