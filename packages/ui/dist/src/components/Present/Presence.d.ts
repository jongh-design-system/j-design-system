import { ReactElement } from "react"

interface PresenceProps {
  children?:
    | ReactElement
    | (({ present }: { present: boolean }) => ReactElement)
  present: boolean
}
export declare const Presence: ({
  children,
  present,
}: PresenceProps) => ReactElement<
  any,
  string | import("react").JSXElementConstructor<any>
> | null
export {}
