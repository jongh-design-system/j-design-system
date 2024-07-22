import type { ReactNode } from "react"
import { useTabContext } from "./Tab"
import Slot from "../Slot/Slot"
import useKeyboardEvent from "../../hooks/useKeyboardEvent"

interface TabListProps {
  children: ReactNode
}
export const TabList = ({ children }: TabListProps) => {
  const { refs, handleKeyDown } = useKeyboardEvent({
    keyList: ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"],
  })

  return (
    <div
      role="tablist"
      tabIndex={0}
      ref={(node) => {
        refs.current = Array.from(node?.children || []) as HTMLElement[]
      }}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  )
}
//클릭된 아이템을 제외하고는 selected 제거해주기

interface TabItemProps {
  children: ReactNode
  className?: string
  value: string
  asChild?: boolean
}

export const TabItem = ({
  children,
  className,
  value,
  asChild,
}: TabItemProps) => {
  const Comp = asChild ? Slot : "div"
  const { selected, onSelect } = useTabContext("tab")
  const isSelected = selected === value

  return (
    <Comp
      role="tab"
      tabIndex={0}
      aria-selected={isSelected}
      onClick={() => onSelect?.(value)}
    >
      {children}
    </Comp>
  )
}
