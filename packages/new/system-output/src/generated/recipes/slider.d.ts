declare interface SliderVariant {
  
}

export declare type SliderVariantProps = Partial<SliderVariant>
export declare type SliderSlotName = "root" | "track" | "range" | "thumb"

export declare const slider: ((props?: SliderVariantProps) => Record<SliderSlotName, string>) & {
  splitVariantProps: <T extends Record<string, unknown>>(props: T) => [
    SliderVariantProps,
    Omit<T, keyof SliderVariantProps>
  ]
}
