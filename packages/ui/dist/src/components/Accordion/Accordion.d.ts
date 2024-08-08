import { PropsWithChildren } from "react"

export type TAccordionContext = {
  selected?: string[]
  onItemOpen: (value: string) => void
  onItemClose: (value: string) => void
  refs?: HTMLElement[]
}
export interface AccordionProps extends PropsWithChildren {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  type?: "single" | "multi"
}
export declare const Accordion: import("react").ForwardRefExoticComponent<
  AccordionProps & import("react").RefAttributes<HTMLElement>
>
interface AccordionItemProps extends PropsWithChildren {
  value: string
  disabled?: boolean
}
export declare const AccordionItem: ({
  value,
  disabled,
  children,
}: AccordionItemProps) => import("react/jsx-runtime").JSX.Element
export declare const AccordionTrigger: ({
  children,
}: PropsWithChildren) => import("react/jsx-runtime").JSX.Element
export declare const AccordionContent: ({
  children,
}: PropsWithChildren<{
  duration?: number
}>) => import("react/jsx-runtime").JSX.Element
export {}
