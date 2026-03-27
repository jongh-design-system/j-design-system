import { cx } from "@jongh/new-system-output/react"
import type { TextfieldVariantProps as TextFieldVariantProps } from "@jongh/new-system-output/recipes/textfield"
import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { forwardRef } from "react"

import { recipe } from "./recipe"

const getHelperText = (id: string) => `${id}-helper-text`

type TextFieldProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "size" | "width"
> & {
  leadingAddon?: ReactNode
  trailingAddon?: ReactNode
  label?: string
  helperText?: string
  required?: boolean
  id: string
} & TextFieldVariantProps

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const [variantProps, componentProps] = recipe.splitVariantProps(props)

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

    const classes = recipe(variantProps)
    return (
      <div className={classes.root}>
        {label && (
          <div className={classes.heading}>
            <label className={required ? "required" : ""} htmlFor={id}>
              {label}
            </label>
          </div>
        )}

        <div className={classes.container}>
          {leadingAddon && <div>{leadingAddon}</div>}

          <input
            ref={ref}
            className={cx(classes.input, className)}
            required={required}
            id={id}
            aria-describedby={getHelperText(id)}
            aria-invalid={variantProps.status === "negative" ? true : false}
            {...rest}
          />

          {trailingAddon && (
            <div className={classes.trailingButton}>{trailingAddon}</div>
          )}
        </div>

        {helperText && (
          <div
            className={classes.helper}
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
