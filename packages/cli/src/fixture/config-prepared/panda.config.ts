export default defineConfig({
  preflight: true,
  presets: ["@pandacss/preset-panda"],
  jsxFramework: "react",
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./src/stories/*.{js,jsx,ts,tsx}"],
  outdir: "styled-system",
  strictTokens: true,
})
