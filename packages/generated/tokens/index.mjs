const tokens = {
  "radii.sm": {
    "value": "3px",
    "variable": "var(--radii-sm)"
  },
  "radii.lg": {
    "value": "5px",
    "variable": "var(--radii-lg)"
  },
  "radii.rounded": {
    "value": "30px",
    "variable": "var(--radii-rounded)"
  },
  "fontSizes.xs": {
    "value": "0.75rem",
    "variable": "var(--font-sizes-xs)"
  },
  "fontSizes.sm": {
    "value": "1rem",
    "variable": "var(--font-sizes-sm)"
  },
  "fontSizes.lg": {
    "value": "1.5rem",
    "variable": "var(--font-sizes-lg)"
  },
  "fontSizes.xl": {
    "value": "1.75rem",
    "variable": "var(--font-sizes-xl)"
  },
  "fontSizes.2xl": {
    "value": "2rem",
    "variable": "var(--font-sizes-2xl)"
  },
  "fontSizes.3xl": {
    "value": "3rem",
    "variable": "var(--font-sizes-3xl)"
  },
  "colors.grey_100": {
    "value": "var(--colors-grey_100)",
    "variable": "var(--colors-grey_100)"
  },
  "colors.grey_200": {
    "value": "var(--colors-grey_200)",
    "variable": "var(--colors-grey_200)"
  },
  "colors.grey_300": {
    "value": "var(--colors-grey_300)",
    "variable": "var(--colors-grey_300)"
  },
  "colors.grey_400": {
    "value": "var(--colors-grey_400)",
    "variable": "var(--colors-grey_400)"
  },
  "colors.grey_500": {
    "value": "var(--colors-grey_500)",
    "variable": "var(--colors-grey_500)"
  },
  "colors.red_100": {
    "value": "var(--colors-red_100)",
    "variable": "var(--colors-red_100)"
  },
  "colors.red_200": {
    "value": "var(--colors-red_200)",
    "variable": "var(--colors-red_200)"
  },
  "colors.red_300": {
    "value": "var(--colors-red_300)",
    "variable": "var(--colors-red_300)"
  },
  "colors.blue_100": {
    "value": "var(--colors-blue_100)",
    "variable": "var(--colors-blue_100)"
  },
  "colors.blue_200": {
    "value": "var(--colors-blue_200)",
    "variable": "var(--colors-blue_200)"
  },
  "colors.blue_300": {
    "value": "var(--colors-blue_300)",
    "variable": "var(--colors-blue_300)"
  },
  "colors.bg_main": {
    "value": "var(--colors-bg_main)",
    "variable": "var(--colors-bg_main)"
  },
  "colors.bg_elevated": {
    "value": "var(--colors-bg_elevated)",
    "variable": "var(--colors-bg_elevated)"
  },
  "colors.border_basic": {
    "value": "var(--colors-border_basic)",
    "variable": "var(--colors-border_basic)"
  },
  "colors.border_basic2": {
    "value": "var(--colors-border_basic2)",
    "variable": "var(--colors-border_basic2)"
  },
  "colors.text_primary": {
    "value": "var(--colors-text_primary)",
    "variable": "var(--colors-text_primary)"
  },
  "colors.text_secondary": {
    "value": "var(--colors-text_secondary)",
    "variable": "var(--colors-text_secondary)"
  },
  "colors.text_danger": {
    "value": "var(--colors-text_danger)",
    "variable": "var(--colors-text_danger)"
  },
  "colors.white": {
    "value": "var(--colors-white)",
    "variable": "var(--colors-white)"
  },
  "colors.colorPalette": {
    "value": "var(--colors-color-palette)",
    "variable": "var(--colors-color-palette)"
  }
}

export function token(path, fallback) {
  return tokens[path]?.value || fallback
}

function tokenVar(path, fallback) {
  return tokens[path]?.variable || fallback
}

token.var = tokenVar