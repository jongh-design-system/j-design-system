import { cx } from "@styled-system/css"
import { useControllableState } from "radix-ui/internal"
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useId,
  useRef,
} from "react"

import { checkboxRecipe, type CheckboxVariants } from "./recipe"

type CheckboxInputProps = Omit<ComponentPropsWithoutRef<"input">, "size"> & {
  indeterminate?: boolean
  onCheckedChange?: (checked: boolean) => void
}

type CheckboxLabelProps = {
  label?: string
}

type CheckboxProps = CheckboxInputProps & CheckboxVariants & CheckboxLabelProps

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

    const [isChecked = false, setIsChecked] = useControllableState({
      prop: inputProps.checked,
      defaultProp: inputProps.defaultChecked,
      onChange: inputProps.onCheckedChange,
    })

    const inputRef = useRef<HTMLInputElement>(null)

    const id = useId()

    useEffect(() => {
      if (!inputRef.current) {
        return
      }
      inputRef.current.indeterminate = inputProps.indeterminate ?? false
    }, [inputProps.indeterminate])

    return (
      <div className={root}>
        <label htmlFor={`checkbox-${id}`} className={labelClassName}>
          <input
            type="checkbox"
            id={`checkbox-${id}`}
            className={cx(input, "peer")}
            ref={ref}
            onChange={(e) => {
              setIsChecked(e.currentTarget.checked)
            }}
            checked={isChecked}
            data-indeterminate={inputProps.indeterminate}
            {...inputProps}
          />
          <span className={text}>{label}</span>
        </label>
      </div>
    )
  },
)

Checkbox.displayName = "Checkbox"
