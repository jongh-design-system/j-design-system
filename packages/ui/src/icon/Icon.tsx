import type { ColorToken } from "@styled-system/tokens"
import type { ComponentPropsWithoutRef, ComponentType } from "react"

type SvgProps = ComponentPropsWithoutRef<"svg">

export type IconProps = Omit<
  SvgProps,
  "children" | "color" | "height" | "width"
> & {
  svg: ComponentType<SvgProps>
  size?: 12 | 16 | 20 | 24
  color?: Extract<ColorToken, `fg.${string}`>
}

export const Icon = ({
  svg: Svg,
  size = 24,
  color,
  style,
  ...props
}: IconProps) => (
  <Svg
    aria-hidden="true"
    focusable="false"
    {...props}
    style={{
      ...style,
      color: color
        ? `var(--colors-${color.replaceAll(".", "-")})`
        : style?.color,
      height: size,
      width: size,
    }}
  />
)
