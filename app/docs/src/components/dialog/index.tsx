"use client"
import { css } from "@styled-system/css"
import { X } from "lucide-react"
import { Dialog } from "radix-ui"
import { type ComponentProps } from "react"

import { createStyleContext } from "@/utils/createStyleContext"

import { recipe } from "./recipe"

const { withRootProvider, withContext } = createStyleContext(recipe)

export const Root = withRootProvider(Dialog.Root)

export const Portal = withRootProvider(Dialog.Portal)
export const Overlay = withContext<
  React.ComponentType<typeof Dialog.Overlay>,
  Dialog.DialogOverlayProps
>(Dialog.Overlay, "overlay")

export const Close = withContext<
  React.ComponentType<typeof Dialog.Close>,
  Dialog.DialogCloseProps
>(Dialog.Close, "close")

export const ContentPrimitive = ({
  children,
  ref,
  ...props
}: ComponentProps<typeof Dialog.Content>) => (
  <Portal>
    <Overlay />
    <Dialog.Content ref={ref} {...props}>
      {children}
      <Close>
        <X />
        <span className={css({ srOnly: true })}>Close</span>
      </Close>
    </Dialog.Content>
  </Portal>
)

export const Content = withContext<
  React.ComponentType<typeof ContentPrimitive>,
  ComponentProps<typeof ContentPrimitive>
>(ContentPrimitive, "content")

export const Trigger = withContext<
  React.ComponentType<typeof Dialog.Trigger>,
  Dialog.DialogTriggerProps
>(Dialog.Trigger, "trigger")

export const Header = withContext<HTMLDivElement, ComponentProps<"div">>(
  "div",
  "header",
)

export const Footer = withContext<HTMLDivElement, ComponentProps<"div">>(
  "div",
  "footer",
)

export const Title = withContext<
  React.ComponentType<typeof Dialog.Title>,
  Dialog.DialogTitleProps
>(Dialog.Title, "title")

export const Description = withContext<
  React.ComponentType<typeof Dialog.Description>,
  Dialog.DialogDescriptionProps
>(Dialog.Description, "description")
