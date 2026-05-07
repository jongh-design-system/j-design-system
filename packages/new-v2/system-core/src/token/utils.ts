export type TokenKey = string | number

type KeyOf<T> = keyof T & TokenKey
type StringifyKey<T> = T extends TokenKey ? `${T}` : never
type Join<Head extends string, Tail extends string> = `${Head}.${Tail}`

type LeafPathForValue<
  TKey extends TokenKey,
  TValue,
  TLeaf,
> = TValue extends TLeaf
  ? StringifyKey<TKey>
  : TValue extends object
    ? Join<StringifyKey<TKey>, LeafPaths<TValue, TLeaf>>
    : never

export type TokenGroup<TValue> = {
  readonly [key in TokenKey]: TValue | TokenGroup<TValue>
}

export type LeafPaths<T, TLeaf> = T extends object
  ? {
      [K in KeyOf<T>]: LeafPathForValue<K, T[K], TLeaf>
    }[KeyOf<T>]
  : never
