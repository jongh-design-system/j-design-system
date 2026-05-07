import { z } from "zod"

export const compileTargetSchema = z.enum(["css", "tailwind-v4"])

export const compileOptionsSchema = z.object({
  target: compileTargetSchema,
})

export type CompileTarget = z.infer<typeof compileTargetSchema>
export type CompileOptions = z.infer<typeof compileOptionsSchema>
