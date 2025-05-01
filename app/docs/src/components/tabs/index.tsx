import { css, cx } from "@styled-system/css"
import { Tabs as TabsPrimitive } from "radix-ui"
import type { ComponentProps } from "react"

import { recipe } from "./recipe"

export const Root = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Root>) => {
  const styles = recipe.raw()
  return (
    <TabsPrimitive.Root
      className={cx(css(styles.root), className)}
      {...props}
    />
  )
}

Root.displayName = "Tabs"

export const List = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.List>) => {
  const styles = recipe.raw()
  return (
    <TabsPrimitive.List
      className={cx(css(styles.list), className)}
      {...props}
    />
  )
}

List.displayName = "Tabs.List"

export const Trigger = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) => {
  const styles = recipe.raw()
  return (
    <TabsPrimitive.Trigger
      className={cx(css(styles.trigger), className)}
      {...props}
    />
  )
}

Trigger.displayName = "Tabs.Trigger"

export const Content = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) => {
  const styles = recipe.raw()
  return (
    <TabsPrimitive.Content
      className={cx(css(styles.content), className)}
      {...props}
    />
  )
}

Content.displayName = "Tabs.Content"
