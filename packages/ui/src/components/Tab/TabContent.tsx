import type { ReactNode } from "react"
import { useTabContext } from "./useTabContext"

interface TabContentProps {
  children: ReactNode
  value: string
}
export const TabContent = ({ children, value }: TabContentProps) => {
  const { selected, tabId } = useTabContext("tab")

  const isSelected = selected === value

  return (
    <div
      tabIndex={0}
      data-state={isSelected ? "active" : "inactive"}
      role="tabpanel"
      aria-labelledby={tabId + "-tabpanel-" + value}
    >
      {isSelected && children}
    </div>
  )
}
