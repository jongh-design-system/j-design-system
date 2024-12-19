import { forwardRef, useId, type ReactNode, type ForwardedRef } from "react"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { Slot } from "@radix-ui/react-slot"
import { TabProvider } from "./useTabContext"

export type TabProps = {
  children?: ReactNode
  selected?: string
  defaultValue?: string
  onSelect?: (value: string) => void
  asChild?: boolean
}

export const Tab = forwardRef(
  (
    { children, selected, defaultValue, onSelect, asChild, ...props }: TabProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const Element = asChild ? Slot : "div"

    const [value, setValue] = useControllableState({
      prop: selected,
      onChange: onSelect,
      defaultProp: defaultValue,
    })

    const onSelectItem = (value: string) => {
      setValue(value)
    }

    return (
      <TabProvider selected={value} onSelect={onSelectItem} tabId={useId()}>
        <Element ref={ref} {...props}>
          {children}
        </Element>
      </TabProvider>
    )
  },
)
