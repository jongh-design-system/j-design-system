import type { TokenGroup } from "../utils.ts"

export type SemanticTokenValue = string | number

export type SemanticTokenNode<
  TValue extends SemanticTokenValue = SemanticTokenValue,
  TMode extends string = string,
> = Readonly<Record<TMode, TValue>>

export type SemanticTokenTree<
  TValue extends SemanticTokenValue = SemanticTokenValue,
  TMode extends string = string,
> = TokenGroup<SemanticTokenNode<TValue, TMode>>

export type SemanticTokensDefinition = Partial<
  Record<string, SemanticTokenTree<SemanticTokenValue>>
>
