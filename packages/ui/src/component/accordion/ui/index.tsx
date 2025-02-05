import { Accordion as AccordionPrimitive } from "radix-ui"
import { recipe } from "./recipe"
import { css, cx } from "@styled-system/css"
import { ElementRef, forwardRef, type ComponentPropsWithoutRef } from "react"

export const Root = forwardRef<
  ElementRef<typeof AccordionPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw().root

  return (
    <AccordionPrimitive.Root
      ref={ref}
      className={cx(css(styles), className)}
      {...props}
    />
  )
})

export const Header = forwardRef<
  ElementRef<typeof AccordionPrimitive.Header>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw().header

  return (
    <AccordionPrimitive.Header
      ref={ref}
      className={cx(css(styles), className)}
      {...props}
    />
  )
})

export const Item = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw().item

  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cx(css(styles), className)}
      {...props}
    />
  )
})

export const Trigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw().trigger

  return (
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cx(css(styles), className)}
      {...props}
    />
  )
})

export const Content = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw().content

  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cx(css(styles), className)}
      {...props}
    />
  )
})
