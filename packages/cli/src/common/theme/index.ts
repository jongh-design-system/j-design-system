import Handlebars from "handlebars"
import { z } from "zod"

import { template } from "./template"

export const colorPalette = [
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

export const grayColorPalette = [
  "neutral",
  "stone",
  "zinc",
  "gray",
  "slate",
] as const

export const colorSchema = z.object({
  primary: z.enum(colorPalette),
  secondary: z.enum(colorPalette),
  gray: z.enum(grayColorPalette),
})

export type ColorSchema = z.infer<typeof colorSchema>

export const transformTemplate = (options: ColorSchema) => {
  const compliedTemplate = Handlebars.compile(template)
  return compliedTemplate(options)
}
