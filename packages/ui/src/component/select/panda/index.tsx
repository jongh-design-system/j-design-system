import { createStyleContext } from "@styled-system/jsx"
import { Select as SelectPrimitive } from "radix-ui"
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react"

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

export const Trigger = withContext(BaseTrigger, "trigger")

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

export const Content = withContext(ContentPrimitive, "content")

export const Viewport = withContext(SelectPrimitive.Viewport, "viewport")

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

export const Item = withContext(ItemPrimitive, "item")

export const Label = withContext(SelectPrimitive.Label, "label")

export const Separator = withContext(SelectPrimitive.Separator, "separator")

export const Indicator = withContext(
  SelectPrimitive.ItemIndicator,
  "itemIndicator",
)
