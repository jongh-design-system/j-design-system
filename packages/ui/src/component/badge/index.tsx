import { cx } from "@styled-system/css"
import {
  badgeRecipe,
  type BadgeRecipeVariantProps,
} from "@styled-system/recipes"
import { type ComponentPropsWithoutRef, forwardRef } from "react"

export type BadgeProps = ComponentPropsWithoutRef<"span"> &
  BadgeRecipeVariantProps

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, children, ...props }, ref) => {
    const [variantProps, componentProps] = badgeRecipe.splitVariantProps(props)
    const styles = badgeRecipe(variantProps)

    return (
      <span
        ref={ref}
        className={cx(styles.root, className)}
        {...componentProps}
      >
        <span className={styles.label}>{children}</span>
      </span>
    )
  },
)

Badge.displayName = "Badge"
