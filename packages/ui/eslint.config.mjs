import { config } from "@jongh/eslint/react-internal"
import betterTailwindcss from "eslint-plugin-better-tailwindcss"

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    ...betterTailwindcss.configs["recommended"],
    settings: {
      "better-tailwindcss": {
        entryPoint: ".storybook/index.css",
      },
    },
  },
  {
    rules: {
      "react/display-name": "off",
    },
  },
  {
    ignores: [".storybook/*", "storybook-static/*"],
  },
]
