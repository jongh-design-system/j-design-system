import { TagButtonVariant } from "jh-generated/recipes"

export declare const TagButton: import("react").ForwardRefExoticComponent<
  Partial<TagButtonVariant> & {
    children: string
    disabled?: boolean
    className?: string
    id?: string
    onClick?: (e?: boolean) => void
    isClicked?: boolean
    defaultClick?: boolean
  } & import("react").RefAttributes<HTMLSpanElement>
>
