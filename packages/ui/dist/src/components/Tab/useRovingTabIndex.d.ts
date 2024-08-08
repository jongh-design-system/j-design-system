import {
  ReactNode,
  FocusEvent,
  MouseEvent,
  KeyboardEvent,
  ComponentPropsWithoutRef,
  ElementType,
} from "react"

export type RovingTabindexItem = {
  id: string
  element: HTMLElement
}
export declare const NOT_FOCUSABLE_SELECTOR =
  "data-roving-tabindex-not-focusable"
type RovingTabindexRootBaseProps<T> = {
  children: ReactNode | ReactNode[]
  active: string | null
  as?: T
}
type RovingTabindexRootProps<T extends ElementType> =
  RovingTabindexRootBaseProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof RovingTabindexRootBaseProps<T>>
export declare function RovingTabindexRoot<T extends ElementType>({
  children,
  active,
  as,
  ...props
}: RovingTabindexRootProps<T>): import("react/jsx-runtime").JSX.Element
export declare function getNextFocusableId(
  orderedItems: RovingTabindexItem[],
  id: string,
): RovingTabindexItem | undefined
export declare function getParentFocusableId(
  orderedItems: RovingTabindexItem[],
  id: string,
): RovingTabindexItem | undefined
export declare function getPrevFocusableId(
  orderedItems: RovingTabindexItem[],
  id: string,
): RovingTabindexItem | undefined
export declare function getFirstFocusableId(
  orderedItems: RovingTabindexItem[],
): RovingTabindexItem | undefined
export declare function getLastFocusableId(
  orderedItems: RovingTabindexItem[],
): RovingTabindexItem | undefined
export declare function getNextFocusableIdByTypeahead(
  items: RovingTabindexItem[],
  originalId: string,
  keyPressed: string,
): RovingTabindexItem | undefined
export declare function useRovingTabindex(id: string): {
  getOrderedItems: () => RovingTabindexItem[]
  isFocusable: boolean
  getRovingProps: <T extends ElementType>(
    props?: ComponentPropsWithoutRef<T>,
  ) => {
    ref: (element: HTMLElement | null) => void
    onMouseDown: (e: MouseEvent) => void
    onKeyDown: (e: KeyboardEvent) => void
    onFocus: (e: FocusEvent) => void
    "data-roving-tabindex-node": boolean
    tabIndex: number
  }
}
export {}
