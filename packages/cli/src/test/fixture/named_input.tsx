"use client"

import * as React from "react"
import {
  Root as Accordion,
  Item as AccordionItem,
  Trigger as AccordionTrigger,
  Header as AccordionHeader,
  Content as AccordionContent,
} from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const AccordionItemComponent = React.forwardRef<
  React.ElementRef<typeof AccordionItem>,
  React.ComponentPropsWithoutRef<typeof AccordionItem>
>(({ className, ...props }, ref) => (
  <AccordionItem ref={ref} className={cn("border-b", className)} {...props} />
))
AccordionItemComponent.displayName = "AccordionItem"

const a = AccordionItem.ref

const AccordionTriggerComponent = React.forwardRef<
  React.ElementRef<typeof AccordionTrigger>,
  React.ComponentPropsWithoutRef<typeof AccordionTrigger>
>(({ className, children, ...props }, ref) => (
  <AccordionHeader className="flex">
    <AccordionTrigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionTrigger>
  </AccordionHeader>
))
AccordionTriggerComponent.displayName = AccordionTrigger.displayName

const AccordionContentComponent = React.forwardRef<
  React.ElementRef<typeof AccordionContent>,
  React.ComponentPropsWithoutRef<typeof AccordionContent>
>(({ className, children, ...props }, ref) => (
  <AccordionContent
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionContent>
))

AccordionContentComponent.displayName = AccordionContent.displayName

export {
  Accordion,
  AccordionItemComponent as AccordionItem,
  AccordionTriggerComponent as AccordionTrigger,
  AccordionContentComponent as AccordionContent,
}
