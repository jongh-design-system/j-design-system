import { css, cx } from "@styled-system/css"
import { Tabs as TabsPrimitive } from "radix-ui"
import { composeRefs } from "radix-ui/internal"
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"

import { recipe } from "./recipe"

export const Root = forwardRef<
  ElementRef<typeof TabsPrimitive.Root>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <TabsPrimitive.Root
      ref={ref}
      className={cx(css(styles.root), className)}
      {...props}
    />
  )
})

export const List = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    showIndicator?: boolean
  }
>(({ className, children, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <TabsPrimitive.List
      ref={composeRefs(ref, (node) => {
        const activeElement = Array.from(node?.children || []).filter(
          (child) =>
            child instanceof HTMLElement && child.dataset.state === "active",
        )[0] as HTMLElement
        if (!activeElement) return

        const parentRect = node?.getBoundingClientRect()
        if (!parentRect) return

        const activeRect = activeElement.getBoundingClientRect()
        document.documentElement.style.setProperty(
          "--indicator-left",
          `${Math.abs(parentRect?.left - activeRect?.left)}px`,
        )
        document.documentElement.style.setProperty(
          "--indicator-width",
          `${Math.abs(activeRect?.width)}px`,
        )
      })}
      className={cx(css(styles.list), className)}
      {...props}
    >
      {children}
    </TabsPrimitive.List>
  )
})

export const Trigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cx(css(styles.trigger), className)}
      {...props}
    />
  )
})

export const Content = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cx(css(styles.content), className)}
      {...props}
    />
  )
})

export const Indicator = () => {
  const styles = recipe.raw()
  return <div className={css(styles.indicator)} />
}
//left가 변경이 되고, width가 변경이 되면 애니메이션을 준다.
