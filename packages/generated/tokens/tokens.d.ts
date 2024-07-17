/* eslint-disable */
export type Token = "radii.sm" | "radii.lg" | "radii.rounded" | "fontSizes.xs" | "fontSizes.sm" | "fontSizes.lg" | "fontSizes.xl" | "fontSizes.2xl" | "fontSizes.3xl" | "colors.bg_main" | "colors.bg_elevated" | "colors.border_basic" | "colors.border_basic2" | "colors.text_primary" | "colors.text_secondary" | "colors.text_danger" | "colors.grey_100" | "colors.grey_200" | "colors.grey_300" | "colors.grey_400" | "colors.grey_500" | "colors.white" | "colors.blue_100" | "colors.blue_200" | "colors.blue_300" | "colors.blue_400" | "colors.blue_500" | "colors.red_100" | "colors.red_200" | "colors.red_300" | "colors.red_400" | "colors.red_500" | "colors.colorPalette"

export type ColorPalette = "bg_main" | "bg_elevated" | "border_basic" | "border_basic2" | "text_primary" | "text_secondary" | "text_danger" | "grey_100" | "grey_200" | "grey_300" | "grey_400" | "grey_500" | "white" | "blue_100" | "blue_200" | "blue_300" | "blue_400" | "blue_500" | "red_100" | "red_200" | "red_300" | "red_400" | "red_500"

export type RadiusToken = "sm" | "lg" | "rounded"

export type FontSizeToken = "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl"

export type ColorToken = "bg_main" | "bg_elevated" | "border_basic" | "border_basic2" | "text_primary" | "text_secondary" | "text_danger" | "grey_100" | "grey_200" | "grey_300" | "grey_400" | "grey_500" | "white" | "blue_100" | "blue_200" | "blue_300" | "blue_400" | "blue_500" | "red_100" | "red_200" | "red_300" | "red_400" | "red_500" | "colorPalette"

export type Tokens = {
		radii: RadiusToken
		fontSizes: FontSizeToken
		colors: ColorToken
} & { [token: string]: never }

export type TokenCategory = "aspectRatios" | "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "shadows" | "spacing" | "radii" | "borders" | "borderWidths" | "durations" | "easings" | "animations" | "blurs" | "gradients" | "breakpoints" | "assets"