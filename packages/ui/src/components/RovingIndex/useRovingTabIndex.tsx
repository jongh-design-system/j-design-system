import {
  FocusEvent,
  MouseEvent,
  KeyboardEvent,
  ComponentPropsWithoutRef,
  ElementType,
  MutableRefObject,
} from "react"
import { createContext } from "@radix-ui/react-context"
import { NODE_SELECTOR } from "./RovingTabIndexRoot"

export type RovingTabIndexItem = {
  value: string
  element: HTMLElement
}

type RovingTabIndexContext = {
  currentFocusedValue: string | null
  setFocusableId: (id: string) => void
  onShiftTab: () => void
  getOrderedItems: () => RovingTabIndexItem[]
  elements: MutableRefObject<Map<string, HTMLElement>>
  dir?: "horizontal" | "vertical"
}

export const [RovingTabIndexProvider, useRovingTabIndexContext] =
  createContext<RovingTabIndexContext>("rovingTabIndex")

export const useRovingTabIndex = (value: string) => {
  const {
    currentFocusedValue,
    setFocusableId,
    onShiftTab,
    getOrderedItems,
    elements,
    dir,
  } = useRovingTabIndexContext("rovingTabIndex")

  return {
    getOrderedItems,
    dir,
    isFocusable: currentFocusedValue === value,
    getRovingProps: <T extends ElementType>(
      props?: ComponentPropsWithoutRef<T>,
    ) => ({
      ...props,
      ref: (element: HTMLElement | null) => {
        if (element) {
          elements.current.set(value, element)
        } else {
          elements.current.delete(value)
        }
      },
      onMouseDown: (e: MouseEvent) => {
        props?.onMouseDown?.(e)
        if (e.target !== e.currentTarget) return
        setFocusableId(value)
      },
      onKeyDown: (e: KeyboardEvent) => {
        props?.onKeyDown?.(e)
        if (e.target !== e.currentTarget) return
        if (e.shiftKey && e.key === "Tab") {
          onShiftTab()
          return
        }
      },
      onFocus: (e: FocusEvent) => {
        props?.onFocus?.(e)
        if (e.target !== e.currentTarget) return
        setFocusableId(value)
      },
      [NODE_SELECTOR]: true,
      tabIndex: currentFocusedValue === value ? 0 : -1,
    }),
  }
}
