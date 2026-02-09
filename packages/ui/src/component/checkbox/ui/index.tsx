import { cn } from "@utils/cn"
import { useComposedRefs, useControllableState } from "radix-ui/internal"
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
    const {
      label,
      indeterminate,
      onCheckedChange,
      onChange,
      size,
      variant,
      ...inputProps
    } = props

    const styles = checkboxRecipe({ size, variant })

    const [isChecked = false, setIsChecked] = useControllableState({
      prop: inputProps.checked,
      defaultProp: inputProps.defaultChecked,
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

    return (
      <div className={styles.root()}>
        <label htmlFor={`checkbox-${id}`} className={styles.label()}>
          <input
            type="checkbox"
            id={`checkbox-${id}`}
            className={cn(styles.input(), "peer")}
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
            {...inputProps}
          />
          <span className={styles.text()}>{label}</span>
        </label>
      </div>
    )
  },
)

Checkbox.displayName = "Checkbox"
