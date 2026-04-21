import { config } from "@jongh/eslint/next-js"

/** @type {import("eslint").Linter.Config} */
export default [
  { ignores: ["public/**"] },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    settings: {
      next: {
        rootDir: ".",
      },
    },
  },
  ...config,
]
