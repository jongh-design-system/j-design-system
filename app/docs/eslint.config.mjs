import { config as baseConfig } from "@jongh/eslint/base"
import nextPlugin from "@next/eslint-plugin-next"

/** @type {import("eslint").Linter.Config} */
const config = [
  { ignores: ["public/**", "styled-system/**"] },
  ...baseConfig,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
]

export default config
