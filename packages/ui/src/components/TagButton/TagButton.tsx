import { cx } from "jh-generated/css"
import { tagButton, type TagButtonVariant } from "jh-generated/recipes"
import { forwardRef } from "react"
import { useControlledState } from "../../hooks/useControllableState"

type TagButtonProps = Partial<TagButtonVariant> & {
  children: string
  disabled?: boolean
  className?: string
  id?: string
  onClick?: (e?: boolean) => void
  isClicked?: boolean
  defaultClick?: boolean
}
export const TagButton = forwardRef<HTMLSpanElement, TagButtonProps>(
  (
    {
      children,
      disabled = false,
      className,
      id,
      onClick,
      isClicked,
      defaultClick = false,
      ...rest
    },
    ref,
  ) => {
    const [clicked, setClicked] = useControlledState({
      prop: isClicked,
      defaultProp: defaultClick,
      onChange: onClick,
    })
    //
    return (
      <span
        role="button"
        ref={ref}
        id={id}
        className={cx(tagButton({ ...rest }), className)}
        aria-disabled={disabled}
        aria-pressed={clicked}
        {...(disabled && { "data-invalid": "true" })}
        data-testid={id}
        onClick={() => {
          if (disabled) {
            return
          }
          setClicked((prev) => !prev)
        }}
      >
        {children}
      </span>
    )
  },
)

TagButton.displayName = "TagButton"
