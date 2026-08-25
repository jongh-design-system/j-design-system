import { cx } from "@styled-system/css"
import { splitCssProps } from "@styled-system/jsx"
import { layoutRecipe } from "@styled-system/recipes"
import { Slot } from "radix-ui"
import type { ComponentPropsWithoutRef, ComponentRef } from "react"
import { forwardRef } from "react"

import { type LayoutStyleProps, normalizeLayoutStyleProps } from "@/layout"

export type BoxProps = Omit<
  ComponentPropsWithoutRef<typeof Slot.Root>,
  keyof LayoutStyleProps
> &
  LayoutStyleProps & {
    asChild?: boolean
  }

export const Box = forwardRef<ComponentRef<typeof Slot.Root>, BoxProps>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "div"
    const [styleProps, elementProps] = splitCssProps(props)
    const { className, style, ...htmlProps } = elementProps

    return (
      <Comp
        ref={ref as never}
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
