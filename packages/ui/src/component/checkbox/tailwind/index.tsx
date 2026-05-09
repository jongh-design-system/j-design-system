import { cn } from "@utils/cn"
import { useComposedRefs, useControllableState } from "radix-ui/internal"
import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  forwardRef,
  useEffect,
  useId,
  useRef,
} from "react"
import { type VariantProps } from "tailwind-variants"

import { checkbox, checkmark } from "./styles"

type CheckboxInputProps = Omit<ComponentPropsWithoutRef<"input">, "size"> & {
  indeterminate?: boolean
  onCheckedChange?: (checked: boolean) => void
}

type CheckboxLabelProps = {
  label?: string
}

export type CheckboxVariants = VariantProps<typeof checkbox>

type CheckboxProps = CheckboxInputProps & CheckboxVariants & CheckboxLabelProps

type CheckboxCssVars = CSSProperties & {
  "--jds-checkbox-check"?: string
  "--jds-checkbox-indeterminate"?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const {
      className,
      label,
      indeterminate,
      onCheckedChange,
      onChange,
      size,
      variant,
      style,
      ...inputProps
    } = props

    const styles = checkbox({ size, variant })

    const [isChecked, setIsChecked] = useControllableState<boolean>({
      prop: inputProps.checked,
      defaultProp: inputProps.defaultChecked ?? false,
      onChange: onCheckedChange,
    })

    const inputRef = useRef<HTMLInputElement>(null)
    const initialChecked = useRef(isChecked)
    const id = useId()

    useEffect(() => {
      if (!inputRef.current) {
        return
      }
      inputRef.current.indeterminate = indeterminate ?? false
    }, [indeterminate])

    useEffect(() => {
      const form = inputRef.current?.form
      if (form) {
        const reset = () => setIsChecked(initialChecked.current)
        form.addEventListener("reset", reset)
        return () => {
          form.removeEventListener("reset", reset)
        }
      }
    }, [setIsChecked])

    const composedRefs = useComposedRefs(ref, inputRef)
    const checkStyle: CheckboxCssVars = {
      "--jds-checkbox-check":
        variant === "ghost" ? checkmark.ghost : checkmark.square,
      "--jds-checkbox-indeterminate":
        variant === "ghost"
          ? checkmark.indeterminateGhost
          : checkmark.indeterminateSquare,
      ...style,
    }

    return (
      <div className={styles.root()}>
        <label htmlFor={`checkbox-${id}`} className={styles.label()}>
          <input
            type="checkbox"
            id={`checkbox-${id}`}
            className={cn(styles.input(), className)}
            ref={composedRefs}
            onChange={(e) => {
              setIsChecked(e.currentTarget.checked)
              onChange?.(e)
            }}
            checked={isChecked}
            data-state={
              indeterminate
                ? "indeterminate"
                : isChecked
                  ? "checked"
                  : "unchecked"
            }
            data-indeterminate={indeterminate ? "" : undefined}
            style={checkStyle}
            {...inputProps}
          />
          <span className={styles.text()}>{label}</span>
        </label>
      </div>
    )
  },
)

Checkbox.displayName = "Checkbox"
