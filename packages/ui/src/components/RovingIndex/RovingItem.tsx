import type { ReactElement } from "react"
import { useRovingTabIndex } from "./useRovingTabIndex"
import { Slot } from "@radix-ui/react-slot"
import isHotkey from "is-hotkey"
import {
  getNextFocusableId,
  getPrevFocusableId,
} from "../../utils/getFocusableId"

export const RovingItem = ({
  value,
  children,
}: {
  value: string
  children: ReactElement
}) => {
  const { getOrderedItems, getRovingProps, dir } = useRovingTabIndex(value)

  return (
    <Slot
      {...getRovingProps<"button">({
        onKeyDown: (e) => {
          const items = getOrderedItems()
          let nextItem
          if (dir === "horizontal") {
            if (isHotkey("right", e)) {
              nextItem = getNextFocusableId(items, value)
            } else if (isHotkey("left", e)) {
              nextItem = getPrevFocusableId(items, value)
            }
            nextItem?.element.focus()
          }
          if (dir === "vertical") {
            if (e.key === "ArrowDown") {
              nextItem = getNextFocusableId(items, value)
            } else if (e.key === "ArrowUp") {
              nextItem = getPrevFocusableId(items, value)
            }
            nextItem?.element.focus()
          }
        },
      })}
    >
      {children}
    </Slot>
  )
}
