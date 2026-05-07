import type { TokenSource } from "@jongh/new-v2-system-core"
import type { SystemDefinition } from "@jongh/new-v2-system-core"

import type { CompileDocument } from "../output/schema.ts"
import { createCompileContext } from "./context.ts"
import type { CompileOptions, CompileTarget } from "./options.ts"
import { compileCss } from "./targets/css.ts"
import { compileTailwindV4 } from "./targets/tailwind-v4.ts"
import type { TargetCompiler } from "./targets/types.ts"

const targetCompilers: Record<CompileTarget, TargetCompiler> = {
  css: compileCss,
  "tailwind-v4": compileTailwindV4,
}

export function compileSystem<TTheme extends TokenSource>(
  system: SystemDefinition<TTheme>,
  options: CompileOptions,
): CompileDocument {
  return targetCompilers[options.target](createCompileContext(system))
}
