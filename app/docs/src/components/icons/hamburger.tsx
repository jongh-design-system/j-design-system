import type { SVGProps } from "react"
import * as React from "react"
import { forwardRef, Ref } from "react"
const Hamburger = (
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
    <path stroke="currentColor" d="M3 6h18M3 12h18M3 18h18" />
  </svg>
)
const ForwardRef = forwardRef(Hamburger)
export default ForwardRef
