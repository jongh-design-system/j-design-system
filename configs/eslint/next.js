import { FlatCompat } from "@eslint/eslintrc"
import { config as baseConfig } from "./base.js"

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
})
export const config = [
  ...baseConfig,
  ...compat.config({
    extends: ["next", "next/core-web-vitals", "next/typescript"],
  }),
]
