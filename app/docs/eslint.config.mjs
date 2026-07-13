import { config } from "@jongh/eslint/next-js"

/** @type {import("eslint").Linter.Config} */
export default [
  {
    ignores: [
      ".next/**",
      ".velite/**",
      "out/**",
      "public/**",
      "styled-system/**",
    ],
  },
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
