import type { SVGProps } from "react"
import * as React from "react"
import { forwardRef, Ref } from "react"
const Lightmode = (
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
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12m10-6h1M12 2V1m0 22v-1m8-2-1-1m1-15-1 1M4 20l1-1M4 4l1 1m-4 7h1"
    />
  </svg>
)
const ForwardRef = forwardRef(Lightmode)
export default ForwardRef
