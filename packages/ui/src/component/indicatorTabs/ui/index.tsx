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

const handleIndicatorUpdate = (node: HTMLElement | null) => {
  if (!node) return

  const activeElement = Array.from(node.children).find(
    (child) => child instanceof HTMLElement && child.dataset.state === "active",
  ) as HTMLElement | undefined

  if (!activeElement) return

  const parentRect = node.getBoundingClientRect()
  const activeRect = activeElement.getBoundingClientRect()

  const left = Math.abs(parentRect.left - activeRect.left)
  const width = activeRect.width

  document.documentElement.style.setProperty("--indicator-left", `${left}px`)
  document.documentElement.style.setProperty("--indicator-width", `${width}px`)
}

export const List = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <TabsPrimitive.List
      ref={composeRefs(ref, handleIndicatorUpdate)}
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
