declare interface DialogVariant {
  /**
   * @default "default"
   */
  tone: "default" | "accent";
}

export declare type DialogVariantProps = Partial<DialogVariant>
export declare type DialogSlotName = "trigger" | "overlay" | "content" | "close" | "header" | "title" | "description" | "footer"

export declare const dialog: ((props?: DialogVariantProps) => Record<DialogSlotName, string>) & {
  splitVariantProps: <T extends Record<string, unknown>>(props: T) => [
    DialogVariantProps,
    Omit<T, keyof DialogVariantProps>
  ]
}
