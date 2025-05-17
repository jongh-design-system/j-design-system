import { createStyleContext } from "@utils/createStyleContext"
import { Select as SelectPrimitive } from "radix-ui"
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"

import { recipe } from "./recipe"

const { withContext, withRootProvider } = createStyleContext(recipe)

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

export const Root = withRootProvider(SelectPrimitive.Root)
export const Group = SelectPrimitive.Group
export const Value = SelectPrimitive.Value

export const Trigger = withContext<
  ElementRef<typeof BaseTrigger>,
  ComponentPropsWithoutRef<typeof BaseTrigger>
>(BaseTrigger, "trigger")

export const ContentPrimitive = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ position = "popper", children, ...props }, ref) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        data-position={position}
        sideOffset={4}
        {...props}
      >
        <Viewport data-position={position}>{children}</Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})

export const Content = withContext<
  ElementRef<typeof ContentPrimitive>,
  ComponentPropsWithoutRef<typeof ContentPrimitive>
>(ContentPrimitive, "content")

export const Viewport = withContext<
  ElementRef<typeof SelectPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Viewport>
>(SelectPrimitive.Viewport, "viewport")

export const ItemPrimitive = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => {
  return (
    <SelectPrimitive.Item ref={ref} {...props}>
      <Indicator />
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
})

export const Item = withContext<
  ElementRef<typeof ItemPrimitive>,
  ComponentPropsWithoutRef<typeof ItemPrimitive>
>(ItemPrimitive, "item")

export const Label = withContext<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(SelectPrimitive.Label, "label")

export const Separator = withContext<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(SelectPrimitive.Separator, "separator")

export const Indicator = withContext<
  ElementRef<typeof SelectPrimitive.ItemIndicator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ItemIndicator>
>(SelectPrimitive.ItemIndicator, "itemIndicator")
