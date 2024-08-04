import type { RovingTabIndexItem } from "../components/Tab/useRovingTabIndex"

export function getNextFocusableId(
  orderedItems: RovingTabIndexItem[],
  value: string,
): RovingTabIndexItem | undefined {
  const currIndex = orderedItems.findIndex((item) => item.value === value)
  return orderedItems.at(
    currIndex === orderedItems.length - 1 ? 0 : currIndex + 1,
  )
}

export function getPrevFocusableId(
  orderedItems: RovingTabIndexItem[],
  value: string,
): RovingTabIndexItem | undefined {
  const currIndex = orderedItems.findIndex((item) => item.value === value)
  return orderedItems.at(currIndex === 0 ? -1 : currIndex - 1)
}

export function getFirstFocusableId(
  orderedItems: RovingTabIndexItem[],
): RovingTabIndexItem | undefined {
  return orderedItems.at(0)
}

export function getLastFocusableId(
  orderedItems: RovingTabIndexItem[],
): RovingTabIndexItem | undefined {
  return orderedItems.at(-1)
}
