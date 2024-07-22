import type { ReactNode } from "react"
import { useTabContext } from "./Tab"
import Slot from "../Slot/Slot"
import { cx } from "jh-generated/cx"
import { css } from "jh-generated/css"

interface TabListProps {
  children: ReactNode
}
export const TabList = ({ children }: TabListProps) => {
  const { selected, onSelect } = useTabContext("tab")
  return <div role="tablist">{children}</div>
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
      className={cx(
        css({ color: isSelected ? "blue_100" : "red_200" }),
        className,
      )}
      onClick={() => onSelect?.(value)}
    >
      {children}
    </Comp>
  )
}
