type PossibleRef<T> = React.Ref<T> | undefined
export declare function composeRefs<T>(
  ...refs: PossibleRef<T>[]
): (node: T) => void
export declare function useComposedRefs<T>(
  ...refs: PossibleRef<T>[]
): (node: T) => void
export {}
