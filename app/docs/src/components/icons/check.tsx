import type { SVGProps } from "react"
import * as React from "react"
import { forwardRef, Ref } from "react"
const Check = (
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
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <path
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 12.611 8.923 17.5 20 6.5"
    />
  </svg>
)
const ForwardRef = forwardRef(Check)
export default ForwardRef
