import type {
  PrimitiveFamilyPath,
  PrimitiveTokensDefinition,
  TokenFamilyName,
} from "./primitive/types.ts"
import type {
  SemanticTokenNode,
  SemanticTokensDefinition,
} from "./semantic/types.ts"
import type { LeafPaths } from "./utils.ts"

export interface TokenSource {
  primitiveTokens: PrimitiveTokensDefinition
  semanticTokens: SemanticTokensDefinition
}

type TokenSourceFamilyName<TTokenSource extends TokenSource> = TokenFamilyName<
  TTokenSource["primitiveTokens"]
>

type TokenFamilyKey<
  TTokenSource extends TokenSource,
  TFamily extends keyof PrimitiveTokensDefinition & string,
> = Extract<TFamily, TokenSourceFamilyName<TTokenSource>>

type SemanticFamilyTree<
  TTokenSource extends TokenSource,
  TFamily extends TokenSourceFamilyName<TTokenSource>,
> = TFamily extends keyof TTokenSource["semanticTokens"]
  ? Exclude<TTokenSource["semanticTokens"][TFamily], undefined>
  : never

export type PrimitiveTokenPathByFamily<
  TTokenSource extends TokenSource,
  TFamily extends TokenSourceFamilyName<TTokenSource>,
> = PrimitiveFamilyPath<TTokenSource["primitiveTokens"], TFamily>

export type SemanticTokenPathByFamily<
  TTokenSource extends TokenSource,
  TFamily extends TokenSourceFamilyName<TTokenSource>,
> = [SemanticFamilyTree<TTokenSource, TFamily>] extends [never]
  ? never
  : `${TFamily}.${LeafPaths<
      SemanticFamilyTree<TTokenSource, TFamily>,
      SemanticTokenNode<string>
    >}`

export type TokenPathByFamily<
  TTokenSource extends TokenSource,
  TFamily extends TokenSourceFamilyName<TTokenSource>,
> =
  | PrimitiveTokenPathByFamily<TTokenSource, TFamily>
  | SemanticTokenPathByFamily<TTokenSource, TFamily>

export type TokenPathMap<TTokenSource extends TokenSource> = {
  readonly [TFamily in keyof PrimitiveTokensDefinition &
    string]: TokenPathByFamily<
    TTokenSource,
    TokenFamilyKey<TTokenSource, TFamily>
  >
}
