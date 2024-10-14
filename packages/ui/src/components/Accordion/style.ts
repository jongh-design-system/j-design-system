import { accordion, AccordionVariantProps } from "@styled-system/recipes"
import { createStyleContext } from "../../utils/createStyleContext"
import type { ComponentProps, HTMLStyledProps } from "@styled-system/types"
import type { Assign } from "../../types"
import {
  Accordion as AccordionProvider,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  type AccordionContentProps,
  type AccordionItemProps,
  type AccordionProps,
  type AccordionTriggerProps,
} from "./Accordion"

const { withProvider, withContext } = createStyleContext(accordion)

export type RootProviderProps = ComponentProps<typeof AccordionProvider>
export const Accordion = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<"div">, AccordionProps>, AccordionVariantProps>
>(AccordionProvider, "root")

export const Item = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, AccordionItemProps>
>(AccordionItem, "item")

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<"button">, AccordionTriggerProps>
>(AccordionTrigger, "trigger")

export const Content = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, AccordionContentProps>
>(AccordionContent, "content")
