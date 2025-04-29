import { css, cx } from "@styled-system/css"
import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { forwardRef } from "react"

import { recipe, TextFieldVariantProps } from "./recipe"

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

    const styles = recipe.raw(variantProps)
    return (
      <div className={css(styles.root)}>
        {label && (
          <div className={css(styles.heading)}>
            <label className={required ? "required" : ""} htmlFor={id}>
              {label}
            </label>
          </div>
        )}

        <div className={css(styles.container)}>
          {leadingAddon && <div>{leadingAddon}</div>}

          <input
            ref={ref}
            className={cx(css(styles.input), className)}
            required={required}
            id={id}
            {...rest}
          />

          {trailingAddon && (
            <div className={css(styles.trailingButton)}>{trailingAddon}</div>
          )}
        </div>

        {helperText && <div className={css(styles.helper)}>{helperText}</div>}
      </div>
    )
  },
)

TextField.displayName = "TextField"
