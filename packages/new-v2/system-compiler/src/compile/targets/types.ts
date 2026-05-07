import type { CompileDocument } from "../../output/schema.ts"
import type { CompileContext } from "../context.ts"

export type TargetCompiler = (context: CompileContext) => CompileDocument
