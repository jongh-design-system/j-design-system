type Value = string
export interface TabContext {
  selected?: Value
  onSelect?: (index: Value) => void
  tabId: string
}
export declare const TabProvider: {
    (
      props: TabContext & {
        children: import("react").ReactNode
      },
    ): import("react/jsx-runtime").JSX.Element
    displayName: string
  },
  useTabContext: (consumerName: string) => TabContext
export {}
