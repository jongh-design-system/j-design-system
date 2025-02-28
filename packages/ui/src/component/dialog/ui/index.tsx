import { createStyleContext } from "@utils/createStyleContext"
import { Dialog } from "radix-ui"
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react"

import { recipe } from "./recipe"

const { withRootProvider, withContext } = createStyleContext(recipe)

export const Root = withRootProvider(Dialog.Root)

export const Portal = withRootProvider(Dialog.Portal)
export const Overlay = withContext<
  ElementRef<typeof Dialog.Overlay>,
  Dialog.DialogOverlayProps
>(Dialog.Overlay, "overlay")

export const Close = withContext<
  ElementRef<typeof Dialog.Close>,
  Dialog.DialogCloseProps
>(Dialog.Close, "close")

export const ContentPrimitive = forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  React.ComponentPropsWithoutRef<typeof Dialog.Content>
>(({ children, ...props }, ref) => (
  <Portal>
    <Overlay />
    <Dialog.Content ref={ref} {...props}>
      {children}
    </Dialog.Content>
  </Portal>
))

export const Content = withContext<
  ElementRef<typeof ContentPrimitive>,
  ComponentProps<typeof ContentPrimitive>
>(ContentPrimitive, "content")

export const Trigger = withContext<
  ElementRef<typeof Dialog.Trigger>,
  Dialog.DialogTriggerProps
>(Dialog.Trigger, "trigger")

export const Header = withContext<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>("div", "header")

export const Footer = withContext<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>("div", "footer")

export const Title = withContext<
  ElementRef<typeof Dialog.Title>,
  Dialog.DialogTitleProps
>(Dialog.Title, "title")

export const Description = withContext<
  ElementRef<typeof Dialog.Description>,
  Dialog.DialogDescriptionProps
>(Dialog.Description, "description")
