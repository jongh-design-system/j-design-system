"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { createStyleContext } from "@utils/createStyleContext"
import { accordion, type AccordionVariantProps } from "@styled-system/recipes"
import {
  type Assign,
  type ComponentProps,
  type HTMLStyledProps,
} from "@styled-system/types"

const { withProvider, withContext } = createStyleContext(accordion)

const AccordionRoot = withProvider<
  HTMLDivElement,
  Assign<
    Assign<
      HTMLStyledProps<"div">,
      ComponentProps<typeof AccordionPrimitive.Root>
    >,
    AccordionVariantProps
  >
>(AccordionPrimitive.Root, "root")

const AccordionHeader = withContext<
  HTMLDivElement,
  Assign<
    HTMLStyledProps<"div">,
    ComponentProps<typeof AccordionPrimitive.Header>
  >
>(AccordionPrimitive.Header, "header")

const AccordionItem = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof AccordionPrimitive.Item>>
>(AccordionPrimitive.Item, "item")

const AccordionTrigger = withContext<
  HTMLButtonElement,
  Assign<
    HTMLStyledProps<"button">,
    ComponentProps<typeof AccordionPrimitive.Trigger>
  >
>(AccordionPrimitive.Trigger, "trigger")

const AccordionContent = withContext<
  HTMLDivElement,
  Assign<
    HTMLStyledProps<"div">,
    ComponentProps<typeof AccordionPrimitive.Content>
  >
>(AccordionPrimitive.Content, "content")

const Accordion = Object.assign(AccordionRoot, {
  Header: AccordionHeader,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
})

export default Accordion
