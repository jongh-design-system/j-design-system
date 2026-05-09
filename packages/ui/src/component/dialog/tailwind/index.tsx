import { cn } from "@utils/cn"
import { X } from "lucide-react"
import { Dialog } from "radix-ui"
import { forwardRef } from "react"

import { dialog } from "./styles"

const styles = dialog()

export const Root = Dialog.Root

export const Portal = Dialog.Portal

export const Overlay = forwardRef<
  React.ElementRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    className={cn(styles.overlay(), className)}
    {...props}
  />
))

Overlay.displayName = Dialog.Overlay.displayName

export const Header = forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(styles.header(), className)} {...props} />
  ),
)

Header.displayName = "DialogHeader"

const CloseIcon = forwardRef<
  React.ElementRef<typeof Dialog.Close>,
  React.ComponentPropsWithoutRef<typeof Dialog.Close>
>(({ className, children, ...props }, ref) => (
  <Dialog.Close ref={ref} className={cn(styles.close(), className)} {...props}>
    {children}
  </Dialog.Close>
))

CloseIcon.displayName = Dialog.Close.displayName

export const Close = Dialog.Close

export const ContentPrimitive = forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  React.ComponentPropsWithoutRef<typeof Dialog.Content> & {
    closeIcon?: boolean
  }
>(({ children, className, closeIcon = true, ...props }, ref) => (
  <Portal>
    <Overlay />
    <Dialog.Content
      ref={ref}
      className={cn(styles.content(), className)}
      {...props}
    >
      {children}
      {closeIcon && (
        <CloseIcon aria-label="Close Dialog">
          <X />
          <span className="sr-only">Close</span>
        </CloseIcon>
      )}
    </Dialog.Content>
  </Portal>
))

ContentPrimitive.displayName = Dialog.Content.displayName

export const Content = ContentPrimitive

export const Trigger = forwardRef<
  React.ElementRef<typeof Dialog.Trigger>,
  React.ComponentPropsWithoutRef<typeof Dialog.Trigger>
>(({ className, ...props }, ref) => (
  <Dialog.Trigger
    ref={ref}
    className={cn(styles.trigger(), className)}
    {...props}
  />
))

Trigger.displayName = Dialog.Trigger.displayName

export const Footer = forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(styles.footer(), className)} {...props} />
  ),
)

Footer.displayName = "DialogFooter"

export const Title = forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn(styles.title(), className)}
    {...props}
  />
))

Title.displayName = Dialog.Title.displayName

export const Description = forwardRef<
  React.ElementRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn(styles.description(), className)}
    {...props}
  />
))

Description.displayName = Dialog.Description.displayName
