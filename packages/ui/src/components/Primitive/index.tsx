/* eslint-disable @typescript-eslint/no-explicit-any */
//radix ui Primitive를  참고하여 작성한 코드
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

const NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul",
] as const

type Primitives = {
  [E in (typeof NODES)[number]]: PrimitiveForwardRefComponent<E>
}
type PrimitivePropsWithRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E> & {
    asChild?: boolean
  }

interface PrimitiveForwardRefComponent<E extends React.ElementType>
  extends React.ForwardRefExoticComponent<PrimitivePropsWithRef<E>> {}

/* -------------------------------------------------------------------------------------------------
 * Primitive
 * -----------------------------------------------------------------------------------------------*/

const Primitive = NODES.reduce((primitive, node) => {
  const Node = React.forwardRef(
    (props: PrimitivePropsWithRef<typeof node>, forwardedRef: any) => {
      const { asChild, ...primitiveProps } = props
      const Comp: any = asChild ? Slot : node

      return <Comp {...primitiveProps} ref={forwardedRef} />
    },
  )

  Node.displayName = `Primitive.${node}`

  return { ...primitive, [node]: Node }
}, {} as Primitives)

const Root = Primitive

export { Primitive, Root }
export type { PrimitivePropsWithRef }
