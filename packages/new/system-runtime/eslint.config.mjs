import { config } from "../../../configs/eslint/react-internal.js"

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,
  {
    settings: {
      react: {
        version: "18.2",
      },
    },
  },
]
