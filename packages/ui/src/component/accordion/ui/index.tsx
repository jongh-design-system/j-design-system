import { Accordion as AccordionPrimitive } from "radix-ui"
import { createStyleContext } from "@utils/createStyleContext"
import { accordion, type AccordionVariantProps } from "@styled-system/recipes"
import {
  type Assign,
  type ComponentProps,
  type HTMLStyledProps,
} from "@styled-system/types"

const { withProvider, withContext } = createStyleContext(accordion)

export const Root = withProvider<
  HTMLDivElement,
  Assign<
    Assign<
      HTMLStyledProps<"div">,
      ComponentProps<typeof AccordionPrimitive.Root>
    >,
    AccordionVariantProps
  >
>(AccordionPrimitive.Root, "root")

export const Header = withContext<
  HTMLDivElement,
  Assign<
    HTMLStyledProps<"div">,
    ComponentProps<typeof AccordionPrimitive.Header>
  >
>(AccordionPrimitive.Header, "header")

export const Item = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof AccordionPrimitive.Item>>
>(AccordionPrimitive.Item, "item")

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<
    HTMLStyledProps<"button">,
    ComponentProps<typeof AccordionPrimitive.Trigger>
  >
>(AccordionPrimitive.Trigger, "trigger")

export const Content = withContext<
  HTMLDivElement,
  Assign<
    HTMLStyledProps<"div">,
    ComponentProps<typeof AccordionPrimitive.Content>
  >
>(AccordionPrimitive.Content, "content")
