import { cx } from "@styled-system/css"
import { type ComponentPropsWithoutRef, forwardRef, useId } from "react"

import { checkboxRecipe, type CheckboxVariants } from "./recipe"

type CheckboxProps = Omit<ComponentPropsWithoutRef<"input">, "size"> &
  CheckboxVariants & {
    label?: string
  }

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const [variantProps, { label, ...inputProps }] =
      checkboxRecipe.splitVariantProps(props)

    const {
      root,
      label: labelClassName,
      input,
      text,
    } = checkboxRecipe(variantProps)

    const id = useId()

    return (
      <div className={root}>
        <label htmlFor={`checkbox-${id}`} className={labelClassName}>
          <input
            type="checkbox"
            id={`checkbox-${id}`}
            className={cx(input, "peer")}
            ref={ref}
            {...inputProps}
          />
          <span className={text}>{label}</span>
        </label>
      </div>
    )
  },
)

Checkbox.displayName = "Checkbox"
