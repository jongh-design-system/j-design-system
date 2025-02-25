import { css, cx } from "@styled-system/css"
import { Tabs as TabsPrimitive } from "radix-ui"
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

Root.displayName = "Tabs"

export const List = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cx(css(styles.list), className)}
      {...props}
    />
  )
})

List.displayName = "Tabs.List"

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

Trigger.displayName = "Tabs.Trigger"

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

Content.displayName = "Tabs.Content"
