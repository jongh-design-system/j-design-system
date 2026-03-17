declare interface ChipVariant {
  /**
   * @default "filled"
   */
  variant: "filled" | "outlined"
  /**
   * @default "md"
   */
  size: "sm" | "md"
  /**
   * @default "withText"
   */
  layout: "withText" | "iconOnly"
}

export declare type ChipVariantProps = Partial<ChipVariant>

export declare const chip: ((props?: ChipVariantProps) => string) & {
  splitVariantProps: <T extends Record<string, unknown>>(
    props: T,
  ) => [ChipVariantProps, Omit<T, keyof ChipVariantProps>]
}
