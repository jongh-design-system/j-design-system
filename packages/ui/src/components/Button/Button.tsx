import {
  forwardRef,
  ComponentPropsWithoutRef,
  isValidElement,
  cloneElement,
  type ReactElement,
  type MouseEventHandler,
} from "react"
import { button, type ButtonVariant } from "jh-generated/recipes"
import { Slot } from "@radix-ui/react-slot"
import { cx } from "jh-generated/cx"

type ButtonProps = Partial<ButtonVariant> &
  ComponentPropsWithoutRef<"button"> & { as?: string } & {
    leftIcon?: ReactElement
    rightIcon?: ReactElement
  }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      as,
      id,
      className,
      children,
      disabled = false,
      leftIcon,
      rightIcon,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const Comp = as ? Slot : "button"

    const wrapIcon = (icon: ReactElement<{ onClick?: MouseEventHandler }>) => {
      if (isValidElement(icon)) {
        const { onClick: onClickIcon } = icon.props
        return cloneElement(icon, {
          onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            onClickIcon ? onClickIcon(e) : onClick?.(e)
          },
        })
      }
    }

    return (
      <Comp
        role="button"
        ref={ref}
        className={cx(button({ ...rest }))}
        disabled={disabled}
        id={id}
        data-testid={id}
        onClick={onClick}
        {...rest}
      >
        {leftIcon && <span>{wrapIcon(leftIcon)}</span>}
        {children}
        {rightIcon && <span>{wrapIcon(rightIcon)}</span>}
      </Comp>
    )
  },
)
