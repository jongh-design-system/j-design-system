import { config } from "@jongh/eslint/next-js"
import betterTailwindcss from "eslint-plugin-better-tailwindcss"

/** @type {import("eslint").Linter.Config} */
export default [
  { ignores: ["public/**"] },
  ...config,
  {
    ...betterTailwindcss.configs["recommended"],
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/app/globals.css",
      },
    },
  },
]
