import { Avatar as AvatarPrimitive } from "radix-ui"
import { recipe } from "./recipe"
import { cx, css } from "@styled-system/css"
import { ElementRef, forwardRef, type ComponentPropsWithoutRef } from "react"

export const Root = forwardRef<
  ElementRef<typeof AvatarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cx(css(styles.root), className)}
      {...props}
    />
  )
})

export const Image = forwardRef<
  ElementRef<typeof AvatarPrimitive.Image>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cx(css(styles.image), className)}
      {...props}
    />
  )
})

export const Fallback = forwardRef<
  ElementRef<typeof AvatarPrimitive.Fallback>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cx(css(styles.fallback), className)}
      {...props}
    />
  )
})
