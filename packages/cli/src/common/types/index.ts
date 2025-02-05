import { z } from "zod"

export const configSchema = {
  fileName: "components.json",
  schema: z
    .object({
      utils: z.string(),
      components: z.string(),
      hooks: z.string(),
      styledsystem: z.string(),
    })
    .strict(),
} as const

export type ConfigType = z.infer<(typeof configSchema)["schema"]>

export const subDirectories = ["ui", "hooks", "utils"] as const

export const fileSchema = z.object({
  name: z.string(),
  content: z.string(),
  type: z.enum(subDirectories),
})

export const registrySchema = z.object({
  name: z.string(),
  dependencies: z.array(z.string()).optional(),
  files: z.array(fileSchema).optional(),
})

export const presetSchema = z.object({
  name: z.string(),
  dependencies: z.array(z.string()).optional(),
  file: z.string(),
})
