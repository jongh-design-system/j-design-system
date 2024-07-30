import { forwardRef, useId, type ReactNode } from "react"
import { useControlledState } from "../../hooks/useControllableState"
import Slot from "../Slot/Slot"
import { TabProvider } from "./useTabContext"

export interface TabProps {
  children: ReactNode
  selected?: string
  defaultValue?: string
  onSelect?: (value: string) => void
  asChild?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <TabProvider selected={value} onSelect={onSelectItem} tabId={useId()}>
        <Element ref={ref}>{children}</Element>
      </TabProvider>
    )
  },
)
