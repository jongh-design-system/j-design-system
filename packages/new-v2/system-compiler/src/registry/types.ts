import type { CssDeclaration } from "../output/schema.ts"

export type TokenRegistry = {
  declarations: Record<string, CssDeclaration[]>
  modeDeclarations: Record<string, CssDeclaration[]>
  references: Map<string, string>
}

export type KeyframesRegistry = {
  references: Map<string, string>
}

export type CompositeRegistry = {
  animations: Map<string, CssDeclaration[]>
  textStyles: Map<string, CssDeclaration[]>
}

export type CompilerRegistry = {
  tokens: TokenRegistry
  keyframes: KeyframesRegistry
  composites: CompositeRegistry
}
