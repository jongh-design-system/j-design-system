import { createStyleContext } from "@utils/createStyleContext"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { type ComponentPropsWithoutRef, ElementRef } from "react"

import { recipe } from "./recipe"

const { withProvider, withContext } = createStyleContext(recipe)

export const Root = withProvider<
  ElementRef<typeof AccordionPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(AccordionPrimitive.Root, "root")

export const Item = withContext<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(AccordionPrimitive.Item, "item")

export const Header = withContext<
  ElementRef<typeof AccordionPrimitive.Header>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(AccordionPrimitive.Header, "header")

export const Trigger = withContext<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(AccordionPrimitive.Trigger, "trigger")

export const Content = withContext<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(AccordionPrimitive.Content, "content")
