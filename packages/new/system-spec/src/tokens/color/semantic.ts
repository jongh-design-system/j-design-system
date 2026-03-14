import { defineSemanticTokens } from "../../define.ts"

export const semanticColor = defineSemanticTokens.color({
  bg: {
    canvas: { light: "color.neutral.1", dark: "color.neutral.12" },
    surface: { light: "color.neutral.2", dark: "color.neutral.11" },
    subtle: { light: "color.neutral.3", dark: "color.neutral.10" },
    elevated: { light: "color.neutral.1", dark: "color.neutral.11" },
    accent: { light: "color.brand.9", dark: "color.brand.8" },
    "accent-hovered": { light: "color.brand.10", dark: "color.brand.9" },
    "accent-active": { light: "color.brand.11", dark: "color.brand.10" },
  },
  fg: {
    default: { light: "color.neutral.12", dark: "color.neutral.1" },
    muted: { light: "color.neutral.10", dark: "color.neutral.4" },
    subtle: { light: "color.neutral.8", dark: "color.neutral.6" },
    inverse: { light: "color.neutral.1", dark: "color.neutral.12" },
    accent: { light: "color.brand.11", dark: "color.brand.4" },
  },
  stroke: {
    default: { light: "color.neutral.5", dark: "color.neutral.9" },
    subtle: { light: "color.neutral.4", dark: "color.neutral.10" },
    strong: { light: "color.neutral.7", dark: "color.neutral.7" },
    accent: { light: "color.brand.8", dark: "color.brand.7" },
  },
  icon: {
    default: { light: "color.neutral.11", dark: "color.neutral.3" },
    muted: { light: "color.neutral.9", dark: "color.neutral.6" },
    accent: { light: "color.brand.10", dark: "color.brand.5" },
  },
  focus: {
    ring: { light: "color.brand.8", dark: "color.brand.7" },
  },
  overlay: {
    default: { light: "color.neutral.12", dark: "color.neutral.12" },
  },
  success: {
    default: { light: "color.success.9", dark: "color.success.8" },
  },
  warning: {
    default: { light: "color.warning.9", dark: "color.warning.8" },
  },
  danger: {
    default: { light: "color.danger.9", dark: "color.danger.8" },
  },
  info: {
    default: { light: "color.info.9", dark: "color.info.8" },
  },
} as const)
