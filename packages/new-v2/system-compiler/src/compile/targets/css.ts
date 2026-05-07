import type { KeyframeSelector } from "@jongh/new-v2-system-core"

import type {
  CompileDocument,
  CompileLayer,
  CssDeclaration,
} from "../../output/schema.ts"
import { compileDocumentSchema } from "../../output/schema.ts"
import { transformRecipes } from "../../transform/recipes.ts"
import type { CompileContext } from "../context.ts"

function toKebab(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase()
}

function keyframesToDeclarations(
  frames: CompileContext["normalized"]["keyframes"][number]["frames"],
): Array<{ selector: KeyframeSelector; declarations: CssDeclaration[] }> {
  return frames.map((frame) => ({
    selector: frame.selector as KeyframeSelector,
    declarations: frame.declarations.map((declaration) => ({
      property: toKebab(declaration.property),
      value: declaration.value,
    })),
  }))
}

export function compileCss(context: CompileContext): CompileDocument {
  const tokenBlocks: CompileLayer["blocks"] = []

  for (const [family, declarations] of Object.entries(
    context.registry.tokens.declarations,
  )) {
    tokenBlocks.push({
      kind: "token",
      family,
      declarations,
    })
  }

  for (const [mode, declarations] of Object.entries(
    context.registry.tokens.modeDeclarations,
  )) {
    tokenBlocks.push({
      kind: "tokenMode",
      mode,
      declarations,
    })
  }

  const layers: CompileLayer[] = [
    {
      name: "tokens",
      blocks: tokenBlocks,
    },
    {
      name: "keyframes",
      blocks: context.normalized.keyframes.map((keyframes) => ({
        kind: "keyframes",
        name: keyframes.name,
        frames: keyframesToDeclarations(keyframes.frames),
      })),
    },
    {
      name: "recipes",
      blocks: transformRecipes(context.normalized, context.registry),
    },
  ]

  return compileDocumentSchema.parse({ layers })
}
