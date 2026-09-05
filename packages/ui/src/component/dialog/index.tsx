import { css } from "@styled-system/css"
import { createStyleContext } from "@styled-system/jsx"
import { dialogRecipe } from "@styled-system/recipes"
import { Dialog } from "radix-ui"
import { forwardRef } from "react"

import IconXLine from "@/icon/generated/IconXLine"
import { Icon } from "@/icon/Icon"

const { withContext, withRootProvider } = createStyleContext(dialogRecipe)

export const Root = withRootProvider(Dialog.Root)

export const Portal = withContext(Dialog.Portal, "portal")

export const Overlay = withContext(Dialog.Overlay, "overlay")

export const Header = withContext("div", "header")

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
          <Icon svg={IconXLine} size={24} />
          <span className={css({ srOnly: true })}>Close</span>
        </CloseIcon>
      )}
    </Dialog.Content>
  </Portal>
))

export const Content = withContext(ContentPrimitive, "content")

export const Trigger = withContext(Dialog.Trigger, "trigger")

export const Footer = withContext("div", "footer")

export const Title = withContext(Dialog.Title, "title")

export const Description = withContext(Dialog.Description, "description")
