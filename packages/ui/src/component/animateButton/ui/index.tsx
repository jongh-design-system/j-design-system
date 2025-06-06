import type { ComponentProps, ComponentRef } from "react"
import { forwardRef } from "react"

import { Button } from "@/component/button/ui"

export type AnimateButtonProps = {} & ComponentProps<typeof Button>

export const AnimateButton = forwardRef<
  ComponentRef<typeof Button>,
  AnimateButtonProps
>((props, ref) => {
  return <Button ref={ref} {...props} />
})
