import * as React from "react"
import { Slot, Slottable } from "@radix-ui/react-slot"

function Button({ asChild, children, leftElement, rightElement, ...props }) {
  const Comp = asChild ? Slot : "button"
  type Test = ReturnType<typeof Slot>
  return (
    <Comp {...props}>
      {leftElement}
      <Slottable>{children}</Slottable>
      {rightElement}
    </Comp>
  )
}
