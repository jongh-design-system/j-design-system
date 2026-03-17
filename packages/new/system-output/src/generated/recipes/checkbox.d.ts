declare interface CheckboxVariant {
  /**
   * @default "md"
   */
  size: "md" | "lg";
  /**
   * @default "square"
   */
  variant: "square" | "ghost";
}

export declare type CheckboxVariantProps = Partial<CheckboxVariant>
export declare type CheckboxSlotName = "root" | "label" | "input" | "text"

export declare const checkbox: ((props?: CheckboxVariantProps) => Record<CheckboxSlotName, string>) & {
  splitVariantProps: <T extends Record<string, unknown>>(props: T) => [
    CheckboxVariantProps,
    Omit<T, keyof CheckboxVariantProps>
  ]
}
