// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { config } from "@jongh/eslint/react-internal"
import storybook from "eslint-plugin-storybook"

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
  ...storybook.configs["flat/recommended"],
]
