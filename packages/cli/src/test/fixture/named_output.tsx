"use client"

import * as React from "react"
import { Accordion } from "radix-ui"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const AccordionItemComponent = React.forwardRef<
  React.ElementRef<typeof Accordion.Item>,
  React.ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ className, ...props }, ref) => (
  <Accordion.Item ref={ref} className={cn("border-b", className)} {...props} />
))
AccordionItemComponent.displayName = "AccordionItem"

const a = Accordion.Item.ref

const AccordionTriggerComponent = React.forwardRef<
  React.ElementRef<typeof Accordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ className, children, ...props }, ref) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </Accordion.Trigger>
  </Accordion.Header>
))
AccordionTriggerComponent.displayName = Accordion.Trigger.displayName

const AccordionContentComponent = React.forwardRef<
  React.ElementRef<typeof Accordion.Content>,
  React.ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ className, children, ...props }, ref) => (
  <Accordion.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </Accordion.Content>
))

AccordionContentComponent.displayName = Accordion.Content.displayName

export {
  Accordion,
  AccordionItemComponent as AccordionItem,
  AccordionTriggerComponent as AccordionTrigger,
  AccordionContentComponent as AccordionContent,
}
