import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { createStyleContext } from "@utils/createStyleContext"
import { type HTMLStyledProps } from "@styled-system/jsx"
import { select } from "@styled-system/recipes"
import type { Assign, ComponentProps } from "@styled-system/types"

const { withProvider, withContext } = createStyleContext(select)

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} {...props}>
    {children}
    <SelectPrimitive.Icon asChild></SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

export const SelectContent = React.forwardRef<
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
SelectContent.displayName = SelectPrimitive.Content.displayName

export const Indicator = withContext(
  SelectPrimitive.ItemIndicator,
  "itemIndicator",
)

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} {...props}>
    <Indicator></Indicator>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

export type RootProps = React.ComponentProps<typeof SelectPrimitive.Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, RootProps>
>(SelectPrimitive.Root, "root")

export const Group = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof SelectPrimitive.Group>>
>(SelectPrimitive.Group, "group")

export const Value = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<"span">, ComponentProps<typeof SelectPrimitive.Value>>
>(SelectPrimitive.Value, "value")

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<"button">, ComponentProps<typeof SelectTrigger>>
>(SelectTrigger, "trigger")

export const Content = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof SelectContent>>
>(SelectContent, "content")

export const Viewport = withContext<
  HTMLDivElement,
  Assign<
    HTMLStyledProps<"div">,
    ComponentProps<typeof SelectPrimitive.Viewport>
  >
>(SelectPrimitive.Viewport, "viewport")

export const Label = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof SelectPrimitive.Label>>
>(SelectPrimitive.Label, "label")

export const Item = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof SelectItem>>
>(SelectItem, "item")

export const Separator = withContext<
  HTMLDivElement,
  Assign<
    HTMLStyledProps<"div">,
    ComponentProps<typeof SelectPrimitive.Separator>
  >
>(SelectPrimitive.Separator, "separator")
