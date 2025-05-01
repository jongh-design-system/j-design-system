import { css, cx } from "@styled-system/css"
import { Select as SelectPrimitive } from "radix-ui"
import type { ComponentProps } from "react"

import { recipe } from "./recipe"

const BaseTrigger = ({
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger>) => (
  <SelectPrimitive.Trigger {...props}>
    {children}
    <SelectPrimitive.Icon asChild></SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
)

BaseTrigger.displayName = SelectPrimitive.Trigger.displayName

export const Root = SelectPrimitive.Root
export const Group = SelectPrimitive.Group
export const Value = SelectPrimitive.Value

export const Trigger = ({
  className,
  ...props
}: ComponentProps<typeof BaseTrigger>) => {
  const styles = recipe.raw()
  return (
    <BaseTrigger className={cx(css(styles.trigger), className)} {...props} />
  )
}

export const Content = ({
  className,
  position = "popper",
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) => {
  const styles = recipe.raw()
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        data-position={position}
        className={cx(css(styles.content), className)}
        {...props}
      >
        <Viewport data-position={position}>{children}</Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export const Viewport = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Viewport>) => {
  const styles = recipe.raw()
  return (
    <SelectPrimitive.Viewport
      {...props}
      className={cx(css(styles.viewport), className)}
    />
  )
}

export const Item = ({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) => {
  const styles = recipe.raw()
  return (
    <SelectPrimitive.Item
      className={cx(css(styles.item), className)}
      {...props}
    >
      <Indicator />
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export const Label = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Label>) => {
  const styles = recipe.raw()
  return (
    <SelectPrimitive.Label
      className={cx(css(styles.label), className)}
      {...props}
    />
  )
}

export const Separator = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Separator>) => {
  const styles = recipe.raw()
  return (
    <SelectPrimitive.Separator
      className={cx(css(styles.separator), className)}
      {...props}
    />
  )
}

export const Indicator = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ItemIndicator>) => {
  const styles = recipe.raw()
  return (
    <SelectPrimitive.ItemIndicator
      className={cx(css(styles.itemIndicator), className)}
      {...props}
    />
  )
}
