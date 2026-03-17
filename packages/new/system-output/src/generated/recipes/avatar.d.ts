declare interface AvatarVariant {
  /**
   * @default "md"
   */
  size: "sm" | "md" | "lg"
  /**
   * @default "circle"
   */
  shape: "circle" | "rounded"
  /**
   * @default "neutral"
   */
  tone: "neutral" | "accent"
}

export declare type AvatarVariantProps = Partial<AvatarVariant>
export declare type AvatarSlotName = "root" | "image" | "fallback"

export declare const avatar: ((
  props?: AvatarVariantProps,
) => Record<AvatarSlotName, string>) & {
  splitVariantProps: <T extends Record<string, unknown>>(
    props: T,
  ) => [AvatarVariantProps, Omit<T, keyof AvatarVariantProps>]
}
