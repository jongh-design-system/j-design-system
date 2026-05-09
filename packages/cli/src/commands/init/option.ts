import { select } from "@clack/prompts"
import { z } from "zod"

import { colorPalette, colorSchema, grayColorPalette } from "@/common/theme"
import { styleSchema } from "@/common/types"

export const initOptionSchema = z.object({
  cwd: z.string().default(() => process.cwd()),
  yes: z.boolean().default(false),
  style: styleSchema.default("panda"),
  primary: colorSchema.shape.primary.default("neutral"),
  secondary: colorSchema.shape.secondary.default("slate"),
  gray: colorSchema.shape.gray.default("gray"),
})

export const resolveOption = async (
  options: z.input<typeof initOptionSchema>,
): Promise<z.output<typeof initOptionSchema>> => {
  if (options.yes) {
    return initOptionSchema.parse(options)
  }

  return initOptionSchema.parse({
    ...options,
    style:
      options.style ??
      (await select<
        Array<{
          value: z.output<typeof initOptionSchema>["style"]
          label: z.output<typeof initOptionSchema>["style"]
        }>,
        z.output<typeof initOptionSchema>["style"]
      >({
        message: "Pick component style",
        initialValue: "panda",
        options: styleSchema.options.map((style) => ({
          value: style,
          label: style,
        })),
      })),
    primary:
      options.primary ??
      (await select<
        Array<{
          value: z.output<typeof initOptionSchema>["primary"]
          label: z.output<typeof initOptionSchema>["primary"]
        }>,
        z.output<typeof initOptionSchema>["primary"]
      >({
        message: "Pick primary color",
        initialValue: "neutral",
        options: colorPalette.map((color) => ({
          value: color,
          label: color,
        })),
      })),
    secondary:
      options.secondary ??
      (await select<
        Array<{
          value: z.output<typeof initOptionSchema>["secondary"]
          label: z.output<typeof initOptionSchema>["secondary"]
        }>,
        z.output<typeof initOptionSchema>["secondary"]
      >({
        message: "Pick secondary color",
        initialValue: "slate",
        options: colorPalette.map((color) => ({
          value: color,
          label: color,
        })),
      })),
    gray:
      options.gray ??
      (await select<
        Array<{
          value: z.output<typeof initOptionSchema>["gray"]
          label: z.output<typeof initOptionSchema>["gray"]
        }>,
        z.output<typeof initOptionSchema>["gray"]
      >({
        message: "Pick gray color",
        initialValue: "gray",
        options: grayColorPalette.map((color) => ({
          value: color,
          label: color,
        })),
      })),
  })
}
