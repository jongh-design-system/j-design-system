import { ReactNode } from "react"

interface TabListProps {
  children: ReactNode
  className?: string
}
export declare const TabList: ({
  children,
  className,
}: TabListProps) => import("react/jsx-runtime").JSX.Element
interface TabItemProps {
  children: ReactNode
  className?: string
  value: string
  asChild?: boolean
  disabled?: boolean
}
export declare const TabItem: import("react").ForwardRefExoticComponent<
  TabItemProps & import("react").RefAttributes<any>
>
export {}
