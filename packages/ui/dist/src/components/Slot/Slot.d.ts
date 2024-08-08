import { HTMLAttributes, ReactNode } from "react"

export interface SlotProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}
export type RenderDelegationProps<T> = T & {
  asChild?: boolean
}
declare const Slot: import("react").ForwardRefExoticComponent<
  SlotProps & import("react").RefAttributes<any>
>
export default Slot
