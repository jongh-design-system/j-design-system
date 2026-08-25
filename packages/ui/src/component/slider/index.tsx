import { createStyleContext } from "@styled-system/jsx"
import { sliderRecipe } from "@styled-system/recipes"
import { Slider as SliderPrimitive } from "radix-ui"

const { withContext, withProvider } = createStyleContext(sliderRecipe)

export const Root = withProvider(SliderPrimitive.Root, "root")

export const Track = withContext(SliderPrimitive.Track, "track")

export const Range = withContext(SliderPrimitive.Range, "range")

export const Thumb = withContext(SliderPrimitive.Thumb, "thumb")
