import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  clean: true,
  sourcemap: false,
  minify: true,
  target: "esnext",
  treeshake: true,
})
