import * as React from "react"
import { Slot } from "radix-ui"

function Button({ asChild, children, leftElement, rightElement, ...props }) {
  const Comp = asChild ? Slot.Slot : "button"
  type Test = ReturnType<typeof Slot.Slot>

  return (
    <Comp {...props}>
      {leftElement}
      <Slot.Slottable>{children}</Slot.Slottable>
      {rightElement}
    </Comp>
  )
}
