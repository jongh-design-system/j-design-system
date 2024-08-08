import { Dispatch, SetStateAction } from "react"

export declare const useCallbackRef: <T extends (...args: any[]) => any>(
  callback?: T,
) => (...args: any[]) => any
export declare const useUncontrolledState: <T>({
  defaultValue,
  onChange,
}: {
  defaultValue?: T | undefined
  onChange?: (params: T) => void
}) => [T | undefined, Dispatch<SetStateAction<T | undefined>>]
type UseControllableState<T> = {
  prop?: T | undefined
  defaultProp?: T | undefined
  onChange?: (state: T) => void
}
export declare const useControlledState: <T>({
  prop,
  defaultProp,
  onChange,
}: UseControllableState<T>) => readonly [
  T | undefined,
  Dispatch<SetStateAction<T | undefined>>,
]
export {}
