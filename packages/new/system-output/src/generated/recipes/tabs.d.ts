declare interface TabsVariant {
  /**
   * @default "md"
   */
  size: "sm" | "md";
  /**
   * @default "neutral"
   */
  tone: "neutral" | "accent";
}

export declare type TabsVariantProps = Partial<TabsVariant>
export declare type TabsSlotName = "root" | "list" | "trigger" | "content"

export declare const tabs: ((props?: TabsVariantProps) => Record<TabsSlotName, string>) & {
  splitVariantProps: <T extends Record<string, unknown>>(props: T) => [
    TabsVariantProps,
    Omit<T, keyof TabsVariantProps>
  ]
}
