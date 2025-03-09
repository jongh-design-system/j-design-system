import type { SVGProps } from "react"
import * as React from "react"
import { forwardRef, Ref } from "react"
const Search = (
  {
    size = 24,
    ...props
  }: SVGProps<SVGSVGElement> & {
    size?: number | string
  },
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    ref={ref}
    {...props}
  >
    <circle cx={11} cy={11} r={8} fill="none" stroke="currentColor" />
    <path stroke="currentColor" d="m21 21-6-6" />
  </svg>
)
const ForwardRef = forwardRef(Search)
export default ForwardRef
