import { cn } from "@utils/cn"
import { Avatar as AvatarPrimitive } from "radix-ui"
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react"

export const Root = forwardRef<
  ElementRef<typeof AvatarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex size-12 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
))

Root.displayName = AvatarPrimitive.Root.displayName

export const Image = forwardRef<
  ElementRef<typeof AvatarPrimitive.Image>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square size-full", className)}
    {...props}
  />
))

Image.displayName = AvatarPrimitive.Image.displayName

export const Fallback = forwardRef<
  ElementRef<typeof AvatarPrimitive.Fallback>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex size-full items-center justify-center rounded-full bg-neutral",
      className,
    )}
    {...props}
  />
))

Fallback.displayName = AvatarPrimitive.Fallback.displayName
