import { config } from "@jongh/eslint/next-js"

/** @type {import("eslint").Linter.Config} */
export default [{ ignores: ["public/**"] }, ...config]
