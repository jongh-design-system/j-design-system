import {
  type ReactNode,
  type ReactElement,
  type ComponentPropsWithRef,
  forwardRef,
} from "react"
import { useTabContext } from "./useTabContext"

import { RovingTabIndexRoot, useRovingTabIndex } from "../RovingIndex"
import { Slot } from "@radix-ui/react-slot"
import { composeRefs } from "../../hooks/useComposedRefs"
import {
  getNextFocusableId,
  getPrevFocusableId,
} from "../../utils/getFocusableId"

export interface TabListProps {
  children: ReactNode
  className?: string
}

const setIndicatorStyle = (target: HTMLElement) => {
  const targetRect = target.getBoundingClientRect()
  const parent = target.parentElement //TabList
  const parentRect = parent?.getBoundingClientRect()

  if (!targetRect || !parentRect || !parent) {
    return
  }
  const scrollLeft = parent.scrollLeft //overflow일때 고려

  const indicatorLeft = targetRect.left - parentRect.left + scrollLeft

  document.documentElement.style.setProperty(
    "--indicator-left",
    `${indicatorLeft}px`,
  )
  document.documentElement.style.setProperty(
    "--indicator-width",
    `${targetRect.width}px`,
  )
}

export const TabList = ({ children, ...props }: TabListProps) => {
  const { selected } = useTabContext("tab")
  return (
    <RovingTabIndexRoot active={selected}>
      <div role="tablist" {...props}>
        {children}
      </div>
    </RovingTabIndexRoot>
  )
}
export interface TabItemProps extends ComponentPropsWithRef<"button"> {
  value: string
}

export const RovingItem = ({
  value,
  children,
}: {
  value: string
  children: ReactElement
}) => {
  const { getOrderedItems, getRovingProps } = useRovingTabIndex(value)
  return (
    <Slot
      {...getRovingProps<"button">({
        onKeyDown: (e) => {
          const items = getOrderedItems()
          let nextItem
          if (e.key === "ArrowRight") {
            nextItem = getNextFocusableId(items, value)
          } else if (e.key === "ArrowLeft") {
            nextItem = getPrevFocusableId(items, value)
          }
          nextItem?.element.focus()
        },
      })}
    >
      {children}
    </Slot>
  )
}

export const TabItem = forwardRef<HTMLButtonElement, TabItemProps>(
  ({ children, value, ...props }: TabItemProps, forwardRef) => {
    const { selected, onSelect, tabId } = useTabContext("tab")
    const isSelected = selected === value

    const handleSelect = () => {
      onSelect?.(value)
    }

    return (
      <RovingItem value={value}>
        <button
          ref={composeRefs((node) => {
            if (isSelected && node) {
              setIndicatorStyle(node as HTMLElement)
            }
          }, forwardRef)}
          onClick={handleSelect}
          onFocus={handleSelect}
          role="tab"
          aria-selected={isSelected}
          id={tabId + "-tabitem-" + value}
          aria-controls={tabId + "-tabpanel-" + value}
          {...props}
        >
          {children}
        </button>
      </RovingItem>
    )
  },
)
