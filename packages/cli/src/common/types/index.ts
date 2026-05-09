import { z } from "zod"

export const styleSchema = z.enum(["panda", "tailwind"])

const baseConfigSchema = z.object({
  utils: z.string(),
  components: z.string(),
  hooks: z.string(),
})

export const configSchema = {
  fileName: "components.json",
  schema: z.discriminatedUnion("style", [
    baseConfigSchema
      .extend({
        style: z.literal("panda"),
        styledsystem: z.string(),
      })
      .strict(),
    baseConfigSchema
      .extend({
        style: z.literal("tailwind"),
      })
      .strict(),
  ]),
} as const

export type ConfigType = z.infer<(typeof configSchema)["schema"]>

export const fileSchema = z.object({
  name: z.string(),
  content: z.string(),
  type: z.enum(["ui", "hooks", "utils"]),
})

export const registrySchema = z.object({
  name: z.string(),
  // Registry style keys are logically styleSchema, but a component may not have
  // every style implementation yet. Keep the registry shape permissive here and
  // validate the selected style in the add command.
  styles: z.record(
    z.string(),
    z.object({
      dependencies: z.array(z.string()).optional(),
      files: z.array(fileSchema),
    }),
  ),
})

export const presetSchema = z.object({
  name: z.string(),
  dependencies: z.array(z.string()).optional(),
  file: z.string(),
})
