declare interface ButtonVariant {
  /**
   * @default "md"
   */
  size: "sm" | "md" | "lg"
  /**
   * @default "primary"
   */
  variant: "primary" | "secondary" | "destructive" | "outline" | "link"
}

export declare type ButtonVariantProps = Partial<ButtonVariant>

export declare const button: ((props?: ButtonVariantProps) => string) & {
  splitVariantProps: <T extends Record<string, unknown>>(
    props: T,
  ) => [ButtonVariantProps, Omit<T, keyof ButtonVariantProps>]
}
