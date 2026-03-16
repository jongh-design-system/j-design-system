declare interface AccordionVariant {
  /**
   * @default "outline"
   */
  variant: "outline" | "subtle"
}

export declare type AccordionVariantProps = Partial<AccordionVariant>
export declare type AccordionSlotName =
  | "root"
  | "item"
  | "header"
  | "trigger"
  | "content"
  | "contentWrapper"

export declare const accordion: ((
  props?: AccordionVariantProps,
) => Record<AccordionSlotName, string>) & {
  splitVariantProps: <T extends Record<string, unknown>>(
    props: T,
  ) => [AccordionVariantProps, Omit<T, keyof AccordionVariantProps>]
}
