import type { ReactNode } from "react"
import { useTabContext } from "./Tab"

interface TabContentProps {
  children: ReactNode
  value: string
}
export const TabContent = ({ children, value }: TabContentProps) => {
  const { selected } = useTabContext("tab")

  const isSelected = selected === value

  return (
    <div tabIndex={0} data-state={isSelected ? "active" : "inactive"}>
      {isSelected && children}
    </div>
  )
}
