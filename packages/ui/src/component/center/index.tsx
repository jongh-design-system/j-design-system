import { cx } from "@styled-system/css"
import { splitCssProps } from "@styled-system/jsx"
import {
  centerRecipe,
  type CenterRecipeVariantProps,
  layoutRecipe,
} from "@styled-system/recipes"
import { Slot } from "radix-ui"
import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { forwardRef } from "react"

import { type LayoutStyleProps, normalizeLayoutStyleProps } from "@/layout"

export type CenterAxis = Extract<
  NonNullable<CenterRecipeVariantProps["axis"]>,
  string
>

export type CenterProps = Omit<
  ComponentPropsWithoutRef<"div">,
  keyof LayoutStyleProps
> &
  LayoutStyleProps & {
    asChild?: boolean
    axis?: CenterAxis
    isInline?: boolean
    children: ReactNode
  }

export const Center = forwardRef<HTMLDivElement, CenterProps>(
  ({ asChild, axis = "both", isInline = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "div"
    const [styleProps, elementProps] = splitCssProps(props)
    const { className, style, ...htmlProps } = elementProps

    return (
      <Comp
        ref={ref}
        data-slot="center"
        className={cx(layoutRecipe(), centerRecipe({ axis }), className)}
        style={{
          ...normalizeLayoutStyleProps({
            ...styleProps,
            display: styleProps.display ?? (isInline ? "inline-flex" : "flex"),
          }),
          ...style,
        }}
        {...htmlProps}
      >
        {children}
      </Comp>
    )
  },
)

Center.displayName = "Center"
