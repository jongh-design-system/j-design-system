import {
  compileOptionsSchema,
  compileTargetSchema,
  emitFilesOptionsSchema,
} from "@jongh/new-v2-system-compiler"
import type { SystemDefinition, TokenSource } from "@jongh/new-v2-system-core"
import { z } from "zod"

const pathSchema = z.string().min(1)

export const configFileSchema = z.object({
  system: z.custom<SystemDefinition<TokenSource>>(),
  compiler: compileOptionsSchema.default({
    target: "css",
  }),
  outdir: pathSchema.default("styled-system"),
  options: emitFilesOptionsSchema.default({}),
})

export const cliOptionsSchema = z.object({
  cwd: z.string().min(1),
  config: pathSchema.default("jds.config.ts"),
  outdir: pathSchema.optional(),
  target: compileTargetSchema.optional(),
})

export type ConfigFile = z.infer<typeof configFileSchema>
export type CliOptions = z.infer<typeof cliOptionsSchema>
