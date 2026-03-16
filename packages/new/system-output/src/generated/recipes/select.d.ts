declare interface SelectVariant {
  
}

export declare type SelectVariantProps = Partial<SelectVariant>
export declare type SelectSlotName = "root" | "group" | "value" | "trigger" | "viewport" | "content" | "label" | "item" | "itemIndicator" | "separator"

export declare const select: ((props?: SelectVariantProps) => Record<SelectSlotName, string>) & {
  splitVariantProps: <T extends Record<string, unknown>>(props: T) => [
    SelectVariantProps,
    Omit<T, keyof SelectVariantProps>
  ]
}
