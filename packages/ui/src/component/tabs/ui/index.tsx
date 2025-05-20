import { createStyleContext } from "@utils/createStyleContext"
import { Tabs as TabsPrimitive } from "radix-ui"
import { ComponentPropsWithoutRef, ElementRef } from "react"

import { recipe } from "./recipe"

const { withProvider, withContext } = createStyleContext(recipe)

export const Root = withProvider<
  ElementRef<typeof TabsPrimitive.Root>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(TabsPrimitive.Root, "root")

export const List = withContext<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(TabsPrimitive.List, "list")

export const Trigger = withContext<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(TabsPrimitive.Trigger, "trigger")

export const Content = withContext<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(TabsPrimitive.Content, "content")
