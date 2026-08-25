import { z } from "zod"

const baseConfigSchema = z.object({
  utils: z.string(),
  components: z.string(),
  hooks: z.string(),
})

export const configSchema = {
  fileName: "components.json",
  schema: baseConfigSchema.strict(),
} as const

export type ConfigType = z.infer<(typeof configSchema)["schema"]>

export const fileSchema = z.object({
  name: z.string(),
  content: z.string(),
  type: z.enum(["ui", "hooks", "utils"]),
})

export const registrySchema = z.object({
  name: z.string(),
  dependencies: z.array(z.string()).optional(),
  files: z.array(fileSchema),
})
