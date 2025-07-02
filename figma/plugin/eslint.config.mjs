import { config } from "@jongh/eslint/react-internal"

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]
