import { z } from "zod"

export const initOptionSchema = z.object({
  cwd: z.string().default(() => process.cwd()),
})
