import { cx } from "@styled-system/css"
import {
  textfieldRecipe,
  type TextfieldRecipeVariantProps,
} from "@styled-system/recipes"
import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { forwardRef } from "react"

const getHelperText = (id: string) => `${id}-helper-text`

export type TextFieldProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "size" | "width"
> & {
  leadingAddon?: ReactNode
  trailingAddon?: ReactNode
  label?: string
  helperText?: string
  required?: boolean
  id: string
} & TextfieldRecipeVariantProps

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const [variantProps, componentProps] =
      textfieldRecipe.splitVariantProps(props)

    const {
      className,
      leadingAddon,
      trailingAddon,
      label,
      helperText,
      id,
      required = false,
      ...rest
    } = componentProps

    const styles = textfieldRecipe(variantProps)
    return (
      <div className={styles.root}>
        {label && (
          <div className={styles.heading}>
            <label className={required ? "required" : ""} htmlFor={id}>
              {label}
            </label>
          </div>
        )}

        <div
          className={styles.container}
          data-disabled={rest.disabled ? "" : undefined}
        >
          {leadingAddon && <div>{leadingAddon}</div>}

          <input
            ref={ref}
            className={cx(styles.input, className)}
            required={required}
            id={id}
            aria-describedby={getHelperText(id)}
            aria-invalid={variantProps.status === "negative" ? true : false}
            {...rest}
          />

          {trailingAddon && (
            <div className={styles.trailingButton}>{trailingAddon}</div>
          )}
        </div>

        {helperText && (
          <div
            className={styles.helper}
            id={getHelperText(id)}
            aria-live="polite"
          >
            {helperText}
          </div>
        )}
      </div>
    )
  },
)

TextField.displayName = "TextField"
