import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { resolve } from "node:path"

import { transform } from "@svgr/core"
import jsx from "@svgr/plugin-jsx"
import svgo from "@svgr/plugin-svgo"

const packageRoot = resolve(import.meta.dirname, "..")
const sourceFile = resolve(packageRoot, "icons/icons.json")
const outputDirectory = resolve(packageRoot, "src/icon/generated")
const iconSources = JSON.parse(await readFile(sourceFile, "utf8"))

await rm(outputDirectory, { recursive: true, force: true })
await mkdir(outputDirectory, { recursive: true })

const exportLines = []

for (const [componentName, svg] of Object.entries(iconSources).sort(
  ([left], [right]) => left.localeCompare(right),
)) {
  if (!/^Icon[A-Z][A-Za-z0-9]*$/.test(componentName)) {
    throw new Error(`Invalid icon component name: ${componentName}`)
  }

  if (typeof svg !== "string") {
    throw new Error(`Icon source must be an SVG string: ${componentName}`)
  }

  const component = await transform(
    svg,
    {
      dimensions: false,
      expandProps: "end",
      jsxRuntime: "automatic",
      plugins: [svgo, jsx],
      typescript: true,
    },
    { componentName },
  )

  await writeFile(resolve(outputDirectory, `${componentName}.tsx`), component)
  exportLines.push(
    `export { default as ${componentName} } from "./${componentName}"`,
  )
}

await writeFile(
  resolve(outputDirectory, "index.ts"),
  `${exportLines.join("\n")}\n`,
)
