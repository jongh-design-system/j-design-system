import { createStyleContext } from "@jongh/new-system-output/react"
import { Slider as SliderPrimitive } from "radix-ui"

import { recipe } from "./recipe"

const { withContext, withProvider } = createStyleContext(recipe)

export const Root = withProvider(SliderPrimitive.Root, "root")

export const Track = withContext(SliderPrimitive.Track, "track")

export const Range = withContext(SliderPrimitive.Range, "range")

export const Thumb = withContext(SliderPrimitive.Thumb, "thumb")
