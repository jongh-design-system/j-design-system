import { Slot } from "radix-ui"
import type { ComponentProps, Ref } from "react"

import { cn } from "@/utils/cn"

import { type ButtonVariantProps, recipe } from "./recipe"

export type ButtonProps = ComponentProps<"button"> & {
  asChild?: boolean
  ref?: Ref<HTMLButtonElement>
} & ButtonVariantProps

export const Button = ({
  asChild,
  className,
  ref,
  variant,
  size,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      role="button"
      ref={ref}
      className={cn(recipe({ variant, size }), className)}
      {...props}
    />
  )
}
