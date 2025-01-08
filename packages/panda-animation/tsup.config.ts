import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  clean: true,
  sourcemap: false,
  minify: false,
  dts: true,
  external: ["@pandacss/dev"],
})
