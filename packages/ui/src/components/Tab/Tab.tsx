import { forwardRef, type ReactNode } from "react"
import { createContext } from "../../hooks/createContext"
import { useControlledState } from "../../hooks/useControllableState"
import Slot from "../Slot/Slot"
//어떤 아이템이 선택되었는지?

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

    return (
      <TabProvider selected={value} onSelect={setValue}>
        <Element ref={ref}>{children}</Element>
      </TabProvider>
    )
  },
)

//여러개중에 하나만 선택할 수 있고, 선택하면 그 해당내용을 보여줌

//TabList
//TabPanels 로 나누어서 관리
//데이터 타입을 미리 받으면 확장성이 좀 떨어질거같음

//최상위에서 선택된 값 대신에 다른건 숨겨버리면 됨
