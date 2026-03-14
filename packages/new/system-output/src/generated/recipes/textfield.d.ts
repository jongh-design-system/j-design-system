declare interface TextfieldVariant {
  /**
   * @default "normal"
   */
  status: "normal" | "negative"
}

export declare type TextfieldVariantProps = Partial<TextfieldVariant>
export declare type TextfieldSlotName =
  | "root"
  | "heading"
  | "container"
  | "input"
  | "trailingButton"
  | "helper"

export declare const textfield: ((
  props?: TextfieldVariantProps,
) => Record<TextfieldSlotName, string>) & {
  splitVariantProps: <T extends Record<string, unknown>>(
    props: T,
  ) => [TextfieldVariantProps, Omit<T, keyof TextfieldVariantProps>]
}
