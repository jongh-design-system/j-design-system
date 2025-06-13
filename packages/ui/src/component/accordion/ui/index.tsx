import { createStyleContext } from "@utils/createStyleContext"
import { ChevronDown } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { type ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"

import { type AccordionVariants, recipe } from "./recipe"

const { withProvider, withContext } = createStyleContext(recipe)

export const Root = withProvider<
  ElementRef<typeof AccordionPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & AccordionVariants
>(AccordionPrimitive.Root, "root")

export const Item = withContext<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(AccordionPrimitive.Item, "item")

export const Header = withContext<
  ElementRef<typeof AccordionPrimitive.Header>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(AccordionPrimitive.Header, "header")

const ContentWrapper = withContext("div", "contentWrapper")

const ContentPrimitive = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Content ref={ref} {...props}>
      <ContentWrapper>{children}</ContentWrapper>
    </AccordionPrimitive.Content>
  )
})

export const Content = withContext<
  ElementRef<typeof ContentPrimitive>,
  ComponentPropsWithoutRef<typeof ContentPrimitive>
>(ContentPrimitive, "content")

const TriggerPrimitive = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, ...props }, ref) => {
  return (
    <Header>
      <AccordionPrimitive.Trigger ref={ref} {...props}>
        {children}
        <ChevronDown />
      </AccordionPrimitive.Trigger>
    </Header>
  )
})

export const Trigger = withContext<
  ElementRef<typeof TriggerPrimitive>,
  ComponentPropsWithoutRef<typeof TriggerPrimitive>
>(TriggerPrimitive, "trigger")
