import { config } from "../../../configs/eslint/base.js"

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,
  {
    ignores: ["src/generated/**"],
  },
]
