import { recipe } from "./recipe"
import { Slider as SliderPrimitive } from "radix-ui"
import { ElementRef, forwardRef, ComponentPropsWithoutRef } from "react"
import { css, cx } from "@styled-system/css"

export const Root = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cx(css(styles.root), className)}
      {...props}
    />
  )
})

export const Track = forwardRef<
  ElementRef<typeof SliderPrimitive.Track>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Track>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <SliderPrimitive.Track
      ref={ref}
      className={cx(css(styles.track), className)}
      {...props}
    />
  )
})

export const Range = forwardRef<
  ElementRef<typeof SliderPrimitive.Range>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Range>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <SliderPrimitive.Range
      ref={ref}
      className={cx(css(styles.range), className)}
      {...props}
    />
  )
})

export const Thumb = forwardRef<
  ElementRef<typeof SliderPrimitive.Thumb>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>
>(({ className, ...props }, ref) => {
  const styles = recipe.raw()
  return (
    <SliderPrimitive.Thumb
      ref={ref}
      className={cx(css(styles.thumb), className)}
      {...props}
    />
  )
})
