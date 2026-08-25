import { cx } from "@styled-system/css"
import { splitCssProps } from "@styled-system/jsx"
import { layoutRecipe } from "@styled-system/recipes"
import type { Properties } from "@styled-system/types/csstype"
import { Slot } from "radix-ui"
import type { ComponentPropsWithoutRef, ComponentRef, ReactNode } from "react"
import { forwardRef } from "react"

import { type LayoutStyleProps, normalizeLayoutStyleProps } from "@/layout"

export type VStackProps = Omit<
  ComponentPropsWithoutRef<typeof Slot.Root>,
  keyof LayoutStyleProps
> &
  LayoutStyleProps & {
    asChild?: boolean
    align?: NonNullable<Properties["alignItems"]>
    justify?: NonNullable<Properties["justifyContent"]>
    wrap?: boolean | NonNullable<Properties["flexWrap"]>
    grow?: boolean | NonNullable<Properties["flexGrow"]>
    shrink?: boolean | NonNullable<Properties["flexShrink"]>
    children: ReactNode
  }

export const VStack = forwardRef<ComponentRef<typeof Slot.Root>, VStackProps>(
  (
    { asChild, align, justify, wrap, grow, shrink, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot.Root : "div"
    const [styleProps, elementProps] = splitCssProps(props)
    const { className, style, ...htmlProps } = elementProps

    return (
      <Comp
        ref={ref as never}
        data-slot="v-stack"
        className={cx(layoutRecipe(), className)}
        style={{
          ...normalizeLayoutStyleProps({
            ...styleProps,
            display: styleProps.display ?? "flex",
            flexDirection: styleProps.flexDirection ?? "column",
            alignItems: align,
            justifyContent: justify,
            flexWrap:
              wrap === false ? undefined : wrap === true ? "wrap" : wrap,
            flexGrow: grow === false ? undefined : grow === true ? 1 : grow,
            flexShrink:
              shrink === false ? undefined : shrink === true ? 1 : shrink,
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

VStack.displayName = "VStack"
