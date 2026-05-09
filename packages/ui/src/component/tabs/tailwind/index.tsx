import { cn } from "@utils/cn"
import { Tabs as TabsPrimitive } from "radix-ui"
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react"

import { tabs } from "./styles"

const styles = tabs()

export const Root = forwardRef<
  ElementRef<typeof TabsPrimitive.Root>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cn(styles.root(), className)}
    {...props}
  />
))

Root.displayName = TabsPrimitive.Root.displayName

export const List = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(styles.list(), className)}
    {...props}
  />
))

List.displayName = TabsPrimitive.List.displayName

export const Trigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(styles.trigger(), className)}
    {...props}
  />
))

Trigger.displayName = TabsPrimitive.Trigger.displayName

export const Content = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(styles.content(), className)}
    {...props}
  />
))

Content.displayName = TabsPrimitive.Content.displayName
