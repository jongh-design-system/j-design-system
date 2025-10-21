import { createStyleContext } from "@styled-system/jsx"
import { ChevronDown } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { type ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"

import { recipe } from "./recipe"

const { withContext, withProvider } = createStyleContext(recipe)

export const Root = withProvider(AccordionPrimitive.Root, "root")

export const Item = withContext(AccordionPrimitive.Item, "item")

export const Header = withContext(AccordionPrimitive.Header, "header")

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

export const Content = withContext(ContentPrimitive, "content")

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

export const Trigger = withContext(TriggerPrimitive, "trigger")
