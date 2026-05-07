import { defineConfig } from "tsdown"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  outExtensions: () => ({ js: ".js" }),
  clean: true,
  sourcemap: false,
  minify: false,
  dts: true,
  platform: "node",
  target: "node22",
  deps: {
    neverBundle: ["@jongh/new-v2-system-core", "postcss", "zod"],
  },
})
