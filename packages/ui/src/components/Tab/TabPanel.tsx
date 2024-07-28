import type { ReactNode } from "react"
import { useTabContext } from "./Tab"

interface TabPanelProps {
  children: ReactNode
  className?: string
}
export const TabPanel = ({ children }: TabPanelProps) => {
  return <div tabIndex={0}>{children}</div>
}
interface TabContentProps {
  children: ReactNode
  value: string
}
export const TabContent = ({ children, value }: TabContentProps) => {
  const { selected } = useTabContext("tab")

  const isSelected = selected === value

  if (!isSelected) {
    return null
  }

  return <div tabIndex={0}>{children}</div>
}
