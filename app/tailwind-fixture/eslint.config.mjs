import { config } from "@jongh/eslint/react-internal"

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,
  {
    ignores: [".turbo/**"],
  },
]
