import type { ReactNode } from "react"
import { useTabContext } from "./Tab"
import { css } from "jh-generated/css"

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

  return (
    <div
      tabIndex={0}
      className={css({
        display: isSelected ? "block" : "none",
      })}
    >
      {children}
    </div>
  )
}
