import { ComponentProps, CSSProperties } from "react"

import svgPaths from "./icons.json"

export interface IconProps extends ComponentProps<"svg"> {
  icon: keyof typeof svgPaths
  style?: CSSProperties
  className?: string
}

const Icon = ({ icon, style, className, ...props }: IconProps) => {
  const { width, height, path } = svgPaths[icon]

  return (
    <svg
      width={width}
      height={height}
      fillRule="evenodd"
      clipRule="evenodd"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
      {...props}
    >
      <path d={path} />
    </svg>
  )
}

export default Icon
