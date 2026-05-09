import { cn } from "@utils/cn"
import { Select as SelectPrimitive } from "radix-ui"
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react"

import { select } from "./styles"

const styles = select()

const BaseTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(styles.trigger(), className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild></SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))

BaseTrigger.displayName = SelectPrimitive.Trigger.displayName

export const Root = SelectPrimitive.Root
export const Group = SelectPrimitive.Group
export const Value = SelectPrimitive.Value

export const Trigger = BaseTrigger

export const ContentPrimitive = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ position = "popper", children, className, ...props }, ref) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        data-position={position}
        sideOffset={4}
        className={cn(styles.content(), className)}
        {...props}
      >
        <Viewport data-position={position}>{children}</Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})

ContentPrimitive.displayName = SelectPrimitive.Content.displayName

export const Content = ContentPrimitive

export const Viewport = forwardRef<
  ElementRef<typeof SelectPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Viewport
    ref={ref}
    className={cn(styles.viewport(), className)}
    {...props}
  />
))

Viewport.displayName = SelectPrimitive.Viewport.displayName

export const ItemPrimitive = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, className, ...props }, ref) => {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(styles.item(), className)}
      {...props}
    >
      <Indicator />
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
})

ItemPrimitive.displayName = SelectPrimitive.Item.displayName

export const Item = ItemPrimitive

export const Label = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(styles.label(), className)}
    {...props}
  />
))

Label.displayName = SelectPrimitive.Label.displayName

export const Separator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(styles.separator(), className)}
    {...props}
  />
))

Separator.displayName = SelectPrimitive.Separator.displayName

export const Indicator = forwardRef<
  ElementRef<typeof SelectPrimitive.ItemIndicator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ItemIndicator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ItemIndicator
    ref={ref}
    className={cn(styles.itemIndicator(), className)}
    {...props}
  />
))

Indicator.displayName = SelectPrimitive.ItemIndicator.displayName
