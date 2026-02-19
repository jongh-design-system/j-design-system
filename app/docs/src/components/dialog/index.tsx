"use client"
import { X } from "lucide-react"
import { Dialog } from "radix-ui"
import { type ComponentProps, forwardRef } from "react"

import { createStyleContext } from "@/utils/createStyleContext"

import { recipe } from "./recipe"

const { withRootProvider, withContext } = createStyleContext(recipe)

export const Root = withRootProvider(Dialog.Root)

export const Portal = withContext(Dialog.Portal, "portal")

export const Overlay = withContext(Dialog.Overlay, "overlay")

export const Close = withContext(Dialog.Close, "close")

export const ContentPrimitive = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Dialog.Content>
>(({ children, ...props }, ref) => (
  <Portal>
    <Overlay />
    <Dialog.Content ref={ref} {...props}>
      {children}
      <Close>
        <X />
        <span className="sr-only">Close</span>
      </Close>
    </Dialog.Content>
  </Portal>
))

ContentPrimitive.displayName = "ContentPrimitive"

export const Content = withContext(ContentPrimitive, "content")

export const Trigger = withContext(Dialog.Trigger, "trigger")

export const Header = withContext("div", "header")

export const Footer = withContext("div", "footer")

export const Title = withContext(Dialog.Title, "title")

export const Description = withContext(Dialog.Description, "description")
