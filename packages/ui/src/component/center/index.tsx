import { cx } from "@styled-system/css"
import { splitCssProps } from "@styled-system/jsx"
import {
  centerRecipe,
  type CenterRecipeVariantProps,
  layoutRecipe,
} from "@styled-system/recipes"
import { Primitive } from "radix-ui/internal"
import type { ComponentPropsWithoutRef, ComponentRef, ReactNode } from "react"
import { forwardRef } from "react"

import { type LayoutStyleProps, normalizeLayoutStyleProps } from "@/layout"

export type CenterAxis = Extract<
  NonNullable<CenterRecipeVariantProps["axis"]>,
  string
>

export type CenterProps = Omit<
  ComponentPropsWithoutRef<typeof Primitive.div>,
  keyof LayoutStyleProps
> &
  LayoutStyleProps & {
    axis?: CenterAxis
    isInline?: boolean
    children: ReactNode
  }

export const Center = forwardRef<
  ComponentRef<typeof Primitive.div>,
  CenterProps
>(({ asChild, axis = "both", isInline = false, children, ...props }, ref) => {
  const [styleProps, elementProps] = splitCssProps(props)
  const { className, style, ...htmlProps } = elementProps

  return (
    <Primitive.div
      asChild={asChild}
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
    </Primitive.div>
  )
})

Center.displayName = "Center"
