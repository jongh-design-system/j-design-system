import { createStyleContext } from "@utils/createStyleContext"
import { Slider as SliderPrimitive } from "radix-ui"
import { ComponentPropsWithoutRef, ElementRef } from "react"

import { recipe } from "./recipe"

const { withProvider, withContext } = createStyleContext(recipe)

export const Root = withProvider<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(SliderPrimitive.Root, "root")

export const Track = withContext<
  ElementRef<typeof SliderPrimitive.Track>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Track>
>(SliderPrimitive.Track, "track")

export const Range = withContext<
  ElementRef<typeof SliderPrimitive.Range>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Range>
>(SliderPrimitive.Range, "range")

export const Thumb = withContext<
  ElementRef<typeof SliderPrimitive.Thumb>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb> & {
    "aria-label": string
  }
>(SliderPrimitive.Thumb, "thumb")
