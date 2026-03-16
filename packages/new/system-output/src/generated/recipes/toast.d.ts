declare interface ToastVariant {
  /**
   * @default "bottom-right"
   */
  position:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
  /**
   * @default "default"
   */
  variant: "default" | "destructive"
}

export declare type ToastVariantProps = Partial<ToastVariant>
export declare type ToastSlotName = "container" | "item" | "close"

export declare const toast: ((
  props?: ToastVariantProps,
) => Record<ToastSlotName, string>) & {
  splitVariantProps: <T extends Record<string, unknown>>(
    props: T,
  ) => [ToastVariantProps, Omit<T, keyof ToastVariantProps>]
}
