import { createStyleContext } from "@jongh/new-system-output/react"
import { X } from "lucide-react"
import { Dialog } from "radix-ui"
import { type ComponentPropsWithoutRef, forwardRef } from "react"

import { recipe } from "./recipe"

const { withContext, withRootProvider } = createStyleContext(recipe)

const srOnlyStyle = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
} as const

export const Root = withRootProvider(Dialog.Root)

export const Portal = Dialog.Portal

export const Overlay = withContext(Dialog.Overlay, "overlay")

const HeaderPrimitive = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>((props, ref) => <div ref={ref} {...props} />)

HeaderPrimitive.displayName = "DialogHeaderPrimitive"

export const Header = withContext(HeaderPrimitive, "header")

const CloseIcon = withContext(Dialog.Close, "close")

export const Close = Dialog.Close //pure logic for close dialog

export const ContentPrimitive = forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  React.ComponentPropsWithoutRef<typeof Dialog.Content> & {
    closeIcon?: boolean
  }
>(({ children, closeIcon = true, ...props }, ref) => (
  <Portal>
    <Overlay />
    <Dialog.Content ref={ref} {...props}>
      {children}
      {closeIcon && (
        <CloseIcon aria-label="Close Dialog">
          <X />
          <span style={srOnlyStyle}>Close</span>
        </CloseIcon>
      )}
    </Dialog.Content>
  </Portal>
))

export const Content = withContext(ContentPrimitive, "content")

export const Trigger = withContext(Dialog.Trigger, "trigger")

const FooterPrimitive = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>((props, ref) => <div ref={ref} {...props} />)

FooterPrimitive.displayName = "DialogFooterPrimitive"

export const Footer = withContext(FooterPrimitive, "footer")

export const Title = withContext(Dialog.Title, "title")

export const Description = withContext(Dialog.Description, "description")
