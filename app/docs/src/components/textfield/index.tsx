import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/utils/cn"

import { recipe, type TextFieldVariantProps } from "./recipe"

const getHelperText = (id: string) => `${id}-helper-text`

export type TextFieldProps = Omit<ComponentProps<"input">, "size" | "width"> & {
  leadingAddon?: ReactNode
  trailingAddon?: ReactNode
  label?: string
  helperText?: string
  required?: boolean
  id: string
  ref?: React.RefObject<HTMLInputElement>
} & TextFieldVariantProps

export const TextField = (props: TextFieldProps) => {
  const {
    className,
    leadingAddon,
    trailingAddon,
    label,
    helperText,
    id,
    required = false,
    ref,
    status,
    ...rest
  } = props

  const styles = recipe({ status })
  return (
    <div className={styles.root()}>
      {label && (
        <div className={styles.heading()}>
          <label
            htmlFor={id}
            className={
              required
                ? "after:ml-0.5 after:text-error after:content-['*']"
                : ""
            }
          >
            {label}
          </label>
        </div>
      )}

      <div className={styles.container()}>
        {leadingAddon && <div>{leadingAddon}</div>}

        <input
          ref={ref}
          className={cn(styles.input(), className)}
          required={required}
          id={id}
          aria-describedby={getHelperText(id)}
          aria-invalid={status === "negative" ? true : false}
          {...rest}
        />

        {trailingAddon && (
          <div className={styles.trailingButton()}>{trailingAddon}</div>
        )}
      </div>

      {helperText && (
        <div
          className={styles.helper()}
          id={getHelperText(id)}
          aria-live="polite"
        >
          {helperText}
        </div>
      )}
    </div>
  )
}

TextField.displayName = "TextField"
