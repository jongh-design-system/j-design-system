import { cx } from "@styled-system/css"
import { splitCssProps } from "@styled-system/jsx"
import { layoutRecipe } from "@styled-system/recipes"
import { Primitive } from "radix-ui/internal"
import type { ComponentPropsWithoutRef, ComponentRef } from "react"
import { forwardRef } from "react"

import { type LayoutStyleProps, normalizeLayoutStyleProps } from "@/layout"

export type BoxProps = Omit<
  ComponentPropsWithoutRef<typeof Primitive.div>,
  keyof LayoutStyleProps
> &
  LayoutStyleProps

export const Box = forwardRef<ComponentRef<typeof Primitive.div>, BoxProps>(
  ({ asChild, ...props }, ref) => {
    const [styleProps, elementProps] = splitCssProps(props)
    const { className, style, ...htmlProps } = elementProps

    return (
      <Primitive.div
        asChild={asChild}
        ref={ref}
        data-slot="box"
        className={cx(layoutRecipe(), className)}
        style={{
          ...normalizeLayoutStyleProps(styleProps),
          ...style,
        }}
        {...htmlProps}
      />
    )
  },
)

Box.displayName = "Box"
