import { cx } from "@styled-system/css"
import { splitCssProps } from "@styled-system/jsx"
import { layoutRecipe } from "@styled-system/recipes"
import type { Properties } from "@styled-system/types/csstype"
import { Slot } from "radix-ui"
import type { ComponentPropsWithoutRef, ComponentRef, ReactNode } from "react"
import { forwardRef } from "react"

import {
  type LayoutStyleProps,
  normalizeLayoutStyleProps,
  type ResponsiveLayoutStyleValue,
} from "@/layout"

type GridTrack =
  | number
  | NonNullable<Properties["gridTemplateColumns"]>
  | NonNullable<Properties["gridTemplateRows"]>

export type GridProps = Omit<
  ComponentPropsWithoutRef<typeof Slot.Root>,
  keyof LayoutStyleProps
> &
  LayoutStyleProps & {
    asChild?: boolean
    align?: NonNullable<Properties["alignItems"]>
    justify?: NonNullable<Properties["justifyContent"]>
    justifyItems?: NonNullable<Properties["justifyItems"]>
    columns?: ResponsiveLayoutStyleValue<GridTrack>
    rows?: ResponsiveLayoutStyleValue<GridTrack>
    autoFlow?: NonNullable<Properties["gridAutoFlow"]>
    autoColumns?: NonNullable<Properties["gridAutoColumns"]>
    autoRows?: NonNullable<Properties["gridAutoRows"]>
    children: ReactNode
  }

const toGridTemplate = (
  value: ResponsiveLayoutStyleValue<GridTrack> | undefined,
) => {
  if (typeof value !== "object" || value === null) {
    return typeof value === "number"
      ? `repeat(${value}, minmax(0, 1fr))`
      : value
  }

  return Object.fromEntries(
    Object.entries(value).map(([condition, track]) => [
      condition,
      typeof track === "number" ? `repeat(${track}, minmax(0, 1fr))` : track,
    ]),
  )
}

export const Grid = forwardRef<ComponentRef<typeof Slot.Root>, GridProps>(
  (
    {
      asChild,
      align,
      justify,
      justifyItems,
      columns,
      rows,
      autoFlow,
      autoColumns,
      autoRows,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot.Root : "div"
    const [styleProps, elementProps] = splitCssProps(props)
    const { className, style, ...htmlProps } = elementProps

    return (
      <Comp
        ref={ref as never}
        data-slot="grid"
        className={cx(layoutRecipe(), className)}
        style={{
          ...normalizeLayoutStyleProps({
            ...styleProps,
            display: styleProps.display ?? "grid",
            alignItems: align,
            justifyContent: justify,
            justifyItems,
            gridTemplateColumns: toGridTemplate(columns),
            gridTemplateRows: toGridTemplate(rows),
            gridAutoFlow: autoFlow,
            gridAutoColumns: autoColumns,
            gridAutoRows: autoRows,
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

Grid.displayName = "Grid"
