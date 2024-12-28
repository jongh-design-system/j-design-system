import { slider } from "@styled-system/recipes"
import type {
  ComponentProps,
  HTMLStyledProps,
  Assign,
} from "styled-system/types"
import { createStyleContext } from "@utils/createStyleContext"
import * as BaseSlider from "@radix-ui/react-slider"

const { withProvider, withContext } = createStyleContext(slider)

export const Root = withProvider<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, ComponentProps<typeof BaseSlider.Root>>
>(BaseSlider.Root, "root")

export const Track = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<"span">, ComponentProps<typeof BaseSlider.Track>>
>(BaseSlider.Track, "track")

export const Range = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<"span">, ComponentProps<typeof BaseSlider.Range>>
>(BaseSlider.Range, "range")

export const Thumb = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<"span">, ComponentProps<typeof BaseSlider.Thumb>>
>(BaseSlider.Thumb, "thumb")

export const Slider = Object.assign(Root, { Track, Range, Thumb })
