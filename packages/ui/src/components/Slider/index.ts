import type { Assign } from "../../types"
import { slider } from "@styled-system/recipes"
import type { ComponentProps, HTMLStyledProps } from "styled-system/types"
import { createStyleContext } from "../../utils/createStyleContext"
import { Slider } from "./Slider"

const { withProvider, withContext } = createStyleContext(slider)

export const Root = withProvider<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof Slider.Root>>
>(Slider.Root, "root")

export const Track = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<"span">, ComponentProps<typeof Slider.Track>>
>(Slider.Track, "track")

export const Range = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<"span">, ComponentProps<typeof Slider.Range>>
>(Slider.Range, "range")

export const Thumb = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<"span">, ComponentProps<typeof Slider.Thumb>>
>(Slider.Thumb, "thumb")

export const StyledSlider = Object.assign(Root, { Track, Range, Thumb })
