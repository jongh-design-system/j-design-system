import { config } from "@jongh/eslint/react-internal"

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    rules: {
      "react/display-name": "off",
    },
  },
  {
    ignores: [
      "styled-system/*",
      ".storybook/*",
      "postcss.config.*",
      "storybook-static/*",
    ],
  },
]
