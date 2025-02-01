import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"
import { createStyleContext } from "@utils/createStyleContext"
import { type HTMLStyledProps } from "@styled-system/jsx"
import { select } from "@styled-system/recipes"
import type { Assign, ComponentProps } from "@styled-system/types"

const { withProvider, withContext } = createStyleContext(select)

const BaseTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} {...props}>
    {children}
    <SelectPrimitive.Icon asChild></SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))

BaseTrigger.displayName = SelectPrimitive.Trigger.displayName

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<"button">, ComponentProps<typeof BaseTrigger>>
>(BaseTrigger, "trigger")

export const Viewport = withContext<
  HTMLDivElement,
  Assign<
    HTMLStyledProps<"div">,
    ComponentProps<typeof SelectPrimitive.Viewport>
  >
>(SelectPrimitive.Viewport, "viewport")

const BaseContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, position = "popper", ...props }, ref) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        data-position={position}
        {...props}
      >
        <Viewport data-position={position}>{children}</Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})

BaseContent.displayName = SelectPrimitive.Content.displayName

export const Content = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof BaseContent>>
>(BaseContent, "content")

export const Indicator = withContext(
  SelectPrimitive.ItemIndicator,
  "itemIndicator",
)

const BaseItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} {...props}>
    <Indicator></Indicator>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
BaseItem.displayName = SelectPrimitive.Item.displayName

export const Item = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof BaseItem>>
>(BaseItem, "item")
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

export const Label = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof SelectPrimitive.Label>>
>(SelectPrimitive.Label, "label")

export const Separator = withContext<
  HTMLDivElement,
  Assign<
    HTMLStyledProps<"div">,
    ComponentProps<typeof SelectPrimitive.Separator>
  >
>(SelectPrimitive.Separator, "separator")
