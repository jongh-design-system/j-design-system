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
