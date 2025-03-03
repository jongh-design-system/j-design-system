import { z } from "zod"

const colorPalette = [
  "rose",
  "pink",
  "fuchsia",
  "purple",
  "violet",
  "indigo",
  "blue",
  "sky",
  "cyan",
  "teal",
  "emerald",
  "green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "red",
  "neutral",
  "stone",
  "zinc",
  "gray",
  "slate",
] as const

const grayColorPalette = ["neutral", "stone", "zinc", "gray", "slate"] as const

export const colorSchema = z.object({
  primary: z.enum(colorPalette),
  secondary: z.enum(colorPalette),
  gray: z.enum(grayColorPalette),
})
