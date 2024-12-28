"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { createStyleContext } from "@utils/createStyleContext"
import { type HTMLStyledProps } from "@styled-system/jsx"
import { select } from "@styled-system/recipes"
import type { Assign, ComponentProps } from "@styled-system/types"

const { withProvider, withContext } = createStyleContext(select)

const Trigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} {...props}>
    {children}
    <SelectPrimitive.Icon asChild></SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
Trigger.displayName = SelectPrimitive.Trigger.displayName

const Content = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      data-position={position}
      {...props}
    >
      {children}
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
Content.displayName = SelectPrimitive.Content.displayName

const ItemIndicator = withContext(
  SelectPrimitive.ItemIndicator,
  "itemIndicator",
)

const Item = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} {...props}>
    <ItemIndicator></ItemIndicator>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
Item.displayName = SelectPrimitive.Item.displayName

export type RootProps = React.ComponentProps<typeof SelectPrimitive.Root>
export const SelectRoot = withProvider<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, RootProps>
>(SelectPrimitive.Root, "root")

export const SelectGroup = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof SelectPrimitive.Group>>
>(SelectPrimitive.Group, "group")

export const SelectValue = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<"span">, ComponentProps<typeof SelectPrimitive.Value>>
>(SelectPrimitive.Value, "value")

export const SelectTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<"button">, ComponentProps<typeof Trigger>>
>(Trigger, "trigger")

export const SelectContent = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof Content>>
>(Content, "content")

const SelectViewport = withContext<
  HTMLDivElement,
  Assign<
    HTMLStyledProps<"div">,
    ComponentProps<typeof SelectPrimitive.Viewport>
  >
>(SelectPrimitive.Viewport, "viewport")

export const SelectLabel = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof SelectPrimitive.Label>>
>(SelectPrimitive.Label, "label")

export const SelectItem = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof Item>>
>(Item, "item")

export const SelectSeparator = withContext<
  HTMLDivElement,
  Assign<
    HTMLStyledProps<"div">,
    ComponentProps<typeof SelectPrimitive.Separator>
  >
>(SelectPrimitive.Separator, "separator")

const Select = Object.assign(SelectRoot, {
  Group: SelectGroup,
  Value: SelectValue,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Label: SelectLabel,
  Item: SelectItem,
  Separator: SelectSeparator,
  ViewPort: SelectViewport,
})

export default Select
