import { ReactNode } from "react"

export interface TabProps {
  children: ReactNode
  selected?: string
  defaultValue?: string
  onSelect?: (value: string) => void
  asChild?: boolean
}
export declare const Tab: import("react").ForwardRefExoticComponent<
  TabProps & import("react").RefAttributes<any>
>
