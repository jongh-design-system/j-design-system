import { defineSemanticTokens } from "../../define.ts"

export const semanticColor = defineSemanticTokens.color({
  bg: {
    canvas: { light: "color.slate.50", dark: "color.slate.950" },
    surface: { light: "color.slate.100", dark: "color.slate.900" },
    subtle: { light: "color.slate.200", dark: "color.slate.800" },
    elevated: { light: "color.common.white", dark: "color.slate.900" },
    accent: { light: "color.blue.600", dark: "color.blue.500" },
    "accent-hovered": { light: "color.blue.700", dark: "color.blue.400" },
    "accent-active": { light: "color.blue.800", dark: "color.blue.300" },
  },
  fg: {
    default: { light: "color.slate.950", dark: "color.slate.50" },
    muted: { light: "color.slate.700", dark: "color.slate.300" },
    subtle: { light: "color.slate.600", dark: "color.slate.400" },
    inverse: { light: "color.common.white", dark: "color.slate.950" },
    accent: { light: "color.blue.700", dark: "color.blue.300" },
  },
  stroke: {
    default: { light: "color.slate.300", dark: "color.slate.700" },
    subtle: { light: "color.slate.200", dark: "color.slate.800" },
    strong: { light: "color.slate.400", dark: "color.slate.600" },
    accent: { light: "color.blue.500", dark: "color.blue.400" },
  },
  icon: {
    default: { light: "color.slate.800", dark: "color.slate.200" },
    muted: { light: "color.slate.600", dark: "color.slate.400" },
    accent: { light: "color.blue.600", dark: "color.blue.400" },
  },
  focus: {
    ring: { light: "color.blue.500", dark: "color.blue.400" },
  },
  overlay: {
    default: { light: "color.common.black", dark: "color.common.black" },
  },
  success: {
    default: { light: "color.green.600", dark: "color.green.500" },
  },
  warning: {
    default: { light: "color.amber.600", dark: "color.amber.500" },
  },
  danger: {
    default: { light: "color.red.600", dark: "color.red.500" },
  },
  info: {
    default: { light: "color.sky.600", dark: "color.sky.500" },
  },
} as const)
