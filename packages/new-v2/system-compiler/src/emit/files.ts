import { z } from "zod"

import type { CompileFile, CompileResult } from "../compile/types.ts"
import type { CompileLayer } from "../output/schema.ts"
import { renderLayer } from "../render/output.ts"

export const emitFilesOptionsSchema = z.object({
  outputFiles: z.record(z.string().min(1), z.string().min(1)).optional(),
})

export type EmitFilesOptions = z.infer<typeof emitFilesOptionsSchema>

export function emitFiles(
  layers: CompileLayer[],
  options: EmitFilesOptions,
): CompileResult {
  const files: CompileFile[] = layers
    .map((layer) => ({
      path: options.outputFiles?.[layer.name] ?? `${layer.name}.css`,
      contentType: "text/css" as const,
      content: renderLayer(layer),
    }))
    .filter((file) => file.content.trim().length > 0)

  return {
    files,
  }
}
