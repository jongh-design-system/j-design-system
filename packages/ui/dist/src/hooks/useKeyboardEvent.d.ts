import { KeyboardEvent } from "react"

type UseKeybaordEvent = {
  keyList: string[]
  changeIndex?: (index: number) => void
}
export declare const useKeyboardEvent: ({
  keyList,
  changeIndex,
}: UseKeybaordEvent) => {
  refs: import("react").MutableRefObject<HTMLElement[]>
  handleKeyDown: (
    event: KeyboardEvent<HTMLElement>,
    callback?: () => void,
  ) => void
}
export default useKeyboardEvent
