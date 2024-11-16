import { createContext } from "../../hooks/createContext"

type Value = string

export interface TabContext {
  selected?: Value
  onSelect?: (index: Value) => void
  tabId: string
}

export const [TabProvider, useTabContext] = createContext<TabContext>("tab")
