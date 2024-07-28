import type { ReactNode } from "react"
import { useTabContext } from "./Tab"
import Slot from "../Slot/Slot"
import useKeyboardEvent from "../../hooks/useKeyboardEvent"
import { css } from "jh-generated/css"

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
      tabIndex={0} //고정
      ref={(node) => {
        refs.current = Array.from(node?.children || []) as HTMLElement[]
      }}
      onKeyDown={handleKeyDown}
      className={css({
        display: "flex",
      })}
    >
      {children}
    </div>
  )
}

interface TabItemProps {
  children: ReactNode
  className?: string
  value: string
  asChild?: boolean
  disabled?: boolean
}

export const TabItem = ({
  children,
  className,
  value,
  asChild,
  disabled = false,
}: TabItemProps) => {
  const Comp = asChild ? Slot : "button"
  const { selected, onSelect } = useTabContext("tab")
  const isSelected = selected === value

  return (
    <Comp
      role="tab"
      tabIndex={isSelected ? 0 : -1}
      className={className}
      disabled={disabled}
      aria-selected={isSelected}
      onFocus={() => onSelect?.(value)}
      onClick={() => onSelect?.(value)}
    >
      <span>
        {children}
        {isSelected ? "select" : "none"}
      </span>
    </Comp>
  )
}
