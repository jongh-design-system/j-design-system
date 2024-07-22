import { forwardRef, type ReactNode } from "react"
import { createContext } from "../../hooks/createContext"
import { useControlledState } from "../../hooks/useControllableState"
import Slot from "../Slot/Slot"

type Value = string

export interface TabContext {
  selected?: Value
  onSelect?: (index: Value) => void
}

export const [TabProvider, useTabContext] = createContext<TabContext>("tab")

export interface TabProps {
  children: ReactNode
  selected?: Value
  defaultValue?: Value
  onSelect?: (index: Value) => void
  asChild?: boolean
}

export const Tab = forwardRef<any, TabProps>(
  ({ children, selected, defaultValue, onSelect, asChild }, ref) => {
    const Element = asChild ? Slot : "div"

    const [value, setValue] = useControlledState({
      prop: selected,
      onChange: onSelect,
      defaultProp: defaultValue,
    })

    const onSelectItem = (value: string) => {
      setValue(value)
    }

    return (
      <TabProvider selected={value} onSelect={onSelectItem}>
        <Element ref={ref}>{children}</Element>
      </TabProvider>
    )
  },
)
