import { cn } from "@utils/cn"
import { Slider as SliderPrimitive } from "radix-ui"
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react"

import { slider } from "./styles"

const styles = slider()

export const Root = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(styles.root(), className)}
    {...props}
  />
))

Root.displayName = SliderPrimitive.Root.displayName

export const Track = forwardRef<
  ElementRef<typeof SliderPrimitive.Track>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Track>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Track
    ref={ref}
    className={cn(styles.track(), className)}
    {...props}
  />
))

Track.displayName = SliderPrimitive.Track.displayName

export const Range = forwardRef<
  ElementRef<typeof SliderPrimitive.Range>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Range>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Range
    ref={ref}
    className={cn(styles.range(), className)}
    {...props}
  />
))

Range.displayName = SliderPrimitive.Range.displayName

export const Thumb = forwardRef<
  ElementRef<typeof SliderPrimitive.Thumb>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Thumb
    ref={ref}
    className={cn(styles.thumb(), className)}
    {...props}
  />
))

Thumb.displayName = SliderPrimitive.Thumb.displayName
