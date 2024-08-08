import { ReactElement } from "react"
import { ButtonVariant } from "jh-generated/recipes"

export declare const Button: import("react").ForwardRefExoticComponent<
  Partial<ButtonVariant> &
    Omit<
      import("react").DetailedHTMLProps<
        import("react").ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >,
      "ref"
    > & {
      as?: string
    } & {
      leftIcon?: ReactElement
      rightIcon?: ReactElement
    } & import("react").RefAttributes<HTMLButtonElement>
>
