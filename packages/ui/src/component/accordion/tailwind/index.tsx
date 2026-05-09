import { cn } from "@utils/cn"
import { ChevronDown } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import {
  type ComponentPropsWithoutRef,
  createContext,
  type ElementRef,
  forwardRef,
  useContext,
} from "react"
import { type VariantProps } from "tailwind-variants"

import { accordion } from "./styles"

export type AccordionVariants = VariantProps<typeof accordion>

const AccordionVariantContext = createContext<AccordionVariants>({})

function useAccordionStyles() {
  return accordion(useContext(AccordionVariantContext))
}

export const Root = forwardRef<
  ElementRef<typeof AccordionPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & AccordionVariants
>(({ className, variant, ...props }, ref) => {
  const styles = accordion({ variant })

  return (
    <AccordionVariantContext.Provider value={{ variant }}>
      <AccordionPrimitive.Root
        ref={ref}
        className={cn(styles.root(), className)}
        {...props}
      />
    </AccordionVariantContext.Provider>
  )
})

Root.displayName = AccordionPrimitive.Root.displayName

export const Item = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const styles = useAccordionStyles()

  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(styles.item(), className)}
      {...props}
    />
  )
})

Item.displayName = AccordionPrimitive.Item.displayName

export const Header = forwardRef<
  ElementRef<typeof AccordionPrimitive.Header>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(({ className, ...props }, ref) => {
  const styles = useAccordionStyles()

  return (
    <AccordionPrimitive.Header
      ref={ref}
      className={cn(styles.header(), className)}
      {...props}
    />
  )
})

Header.displayName = AccordionPrimitive.Header.displayName

const ContentWrapper = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => {
  const styles = useAccordionStyles()

  return <div className={cn(styles.contentWrapper(), className)} {...props} />
}

const ContentPrimitive = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, className, ...props }, ref) => {
  const styles = useAccordionStyles()

  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(styles.content(), className)}
      {...props}
    >
      <ContentWrapper>{children}</ContentWrapper>
    </AccordionPrimitive.Content>
  )
})

ContentPrimitive.displayName = AccordionPrimitive.Content.displayName

export const Content = ContentPrimitive

const TriggerPrimitive = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, className, ...props }, ref) => {
  const styles = useAccordionStyles()

  return (
    <Header>
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(styles.trigger(), className)}
        {...props}
      >
        {children}
        <ChevronDown />
      </AccordionPrimitive.Trigger>
    </Header>
  )
})

TriggerPrimitive.displayName = AccordionPrimitive.Trigger.displayName

export const Trigger = TriggerPrimitive
