import { Select as SelectPrimitive } from "radix-ui"
import { recipe } from "./recipe"
import { cx, css } from "@styled-system/css"
import { ElementRef, forwardRef, ComponentPropsWithoutRef } from "react"

const BaseTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} {...props}>
    {children}
    <SelectPrimitive.Icon asChild></SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))

BaseTrigger.displayName = SelectPrimitive.Trigger.displayName

export const Root = SelectPrimitive.Root
export const Group = SelectPrimitive.Group
export const Value = SelectPrimitive.Value

export const Trigger = forwardRef<
  ElementRef<typeof BaseTrigger>,
  ComponentPropsWithoutRef<typeof BaseTrigger>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <BaseTrigger
      ref={ref}
      className={cx(css(styles.trigger), className)}
      {...props}
    />
  )
})

export const Content = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, position = "popper", children, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        data-position={position}
        className={cx(css(styles.content), className)}
        {...props}
      >
        <Viewport data-position={position}>{children}</Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})

export const Viewport = forwardRef<
  ElementRef<typeof SelectPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Viewport>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <SelectPrimitive.Viewport
      ref={ref}
      {...props}
      className={cx(css(styles.viewport), className)}
    />
  )
})

export const Item = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cx(css(styles.item), className)}
      {...props}
    >
      <Indicator />
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
})

export const Label = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cx(css(styles.label), className)}
      {...props}
    />
  )
})

export const Separator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cx(css(styles.separator), className)}
      {...props}
    />
  )
})

export const Indicator = forwardRef<
  ElementRef<typeof SelectPrimitive.ItemIndicator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ItemIndicator>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <SelectPrimitive.ItemIndicator
      ref={ref}
      className={cx(css(styles.itemIndicator), className)}
      {...props}
    />
  )
})
