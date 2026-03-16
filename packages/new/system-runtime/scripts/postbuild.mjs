import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(currentDir, "../dist")
const entries = await fs.readdir(distDir)
const declarationFile = entries.find((entry) => /^index-.*\.d\.ts$/.test(entry))

if (!declarationFile) {
  throw new Error("Expected a generated index-*.d.ts file in dist")
}

await fs.copyFile(
  path.join(distDir, declarationFile),
  path.join(distDir, "index.d.ts"),
)

const facadeEntries = {
  recipe: ["createClassName", "mergeVariants", "splitVariantProps"],
  theme: ["applyTheme", "generateThemeScript"],
  react: [
    "createRecipeContext",
    "createSlotRecipeContext",
    "createStyleContext",
  ],
  tokens: ["createVarName", "tokenVar"],
}

for (const [entryName, exports] of Object.entries(facadeEntries)) {
  const exportList = exports.join(", ")

  await fs.writeFile(
    path.join(distDir, `${entryName}.js`),
    `export { ${exportList} } from "./index.js"\n`,
    "utf8",
  )

  await fs.writeFile(
    path.join(distDir, `${entryName}.d.ts`),
    `export { ${exportList} } from "./index.js"\n`,
    "utf8",
  )
}
