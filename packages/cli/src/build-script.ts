import path, { dirname } from "node:path"
import { fileURLToPath } from "node:url"

import { Command } from "commander"
import fs from "fs-extra"
import { Project } from "ts-morph"
import { z } from "zod"

import { fileSchema, registrySchema } from "./common/types"

const currentDirectory = dirname(fileURLToPath(import.meta.url))
const componentDirectory = path.resolve(
  currentDirectory,
  "../../ui/src/component",
)
const uiEntryPath = path.resolve(currentDirectory, "../../ui/src/index.ts")
const hooksDirectory = path.resolve(currentDirectory, "../../ui/src/hooks")
const registryDirectory = path.resolve(currentDirectory, "../../../registry")

const registryOptionSchema = z.object({
  component: z.string().optional(),
  all: z.boolean(),
})

const ignoredDependencies = [
  /^next\/.+/,
  "react",
  "react-dom",
  /^react-dom\/.+/,
  /^@styled-system\/.+/,
  /^@\/component\/.+/,
  /^@hooks\/.+/,
  /^@components\/.+/,
  /^@utils\/.+/,
  /^\.\.?\/.+/,
]

const program = new Command()
  .name("registry")
  .description("Create CLI registry files")
  .option("-c, --component <component>", "single component name")
  .option("-a, --all", "process all copyable components", false)
  .action(async (options) => {
    const { all, component } = registryOptionSchema.parse(options)

    if (all) {
      const project = new Project()
      const uiEntry = project.addSourceFileAtPath(uiEntryPath)
      const publicComponents = new Set(
        uiEntry
          .getExportDeclarations()
          .map((declaration) => declaration.getModuleSpecifierValue())
          .filter(
            (module): module is string =>
              module?.startsWith("./component/") ?? false,
          )
          .map((module) => module.slice("./component/".length)),
      )
      const components = (
        await fs.readdir(componentDirectory, {
          withFileTypes: true,
        })
      )
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort()

      await fs.emptyDir(registryDirectory)
      for (const name of components) {
        if (!publicComponents.has(name)) {
          await createRegistryFile(name)
        }
      }
      return
    }

    if (!component) {
      throw new Error("Specify --component or --all")
    }

    await fs.ensureDir(registryDirectory)
    await createRegistryFile(component)
  })

async function createRegistryFile(component: string) {
  const sourceDirectory = path.join(componentDirectory, component)
  if (!(await fs.pathExists(sourceDirectory))) {
    throw new Error(`Component ${component} does not exist`)
  }

  const dependencies = new Set<string>()
  const files: Array<z.infer<typeof fileSchema>> = []
  const visitedFiles = new Set<string>()
  const project = new Project()
  const sourceFiles = (await fs.readdir(sourceDirectory))
    .filter((file) => file.endsWith(".ts") || file.endsWith(".tsx"))
    .sort()

  for (const file of sourceFiles) {
    await collectRegistryFile({
      dependencies,
      files,
      filePath: path.join(sourceDirectory, file),
      project,
      type: "ui",
      visitedFiles,
    })
  }

  const registry = registrySchema.parse({
    name: component,
    dependencies: normalizeDependencies([...dependencies]),
    files,
  })

  await fs.outputFile(
    path.join(registryDirectory, `${component.toLowerCase()}.json`),
    `${JSON.stringify(registry, null, 2)}\n`,
  )
}

async function collectRegistryFile({
  dependencies,
  files,
  filePath,
  project,
  type,
  visitedFiles,
}: {
  dependencies: Set<string>
  files: Array<z.infer<typeof fileSchema>>
  filePath: string
  project: Project
  type: z.infer<typeof fileSchema>["type"]
  visitedFiles: Set<string>
}) {
  if (visitedFiles.has(filePath)) return
  visitedFiles.add(filePath)

  files.push({
    name: path.basename(filePath),
    content: await fs.readFile(filePath, "utf8"),
    type,
  })

  const sourceFile = project.addSourceFileAtPath(filePath)
  for (const declaration of sourceFile.getImportDeclarations()) {
    const module = declaration.getModuleSpecifierValue()
    dependencies.add(module)

    if (!module.startsWith("@hooks/")) continue

    const relativePath = module.slice("@hooks/".length)
    for (const extension of [".ts", ".tsx"]) {
      const internalFile = path.join(
        hooksDirectory,
        `${relativePath}${extension}`,
      )
      if (!(await fs.pathExists(internalFile))) continue

      await collectRegistryFile({
        dependencies,
        files,
        filePath: internalFile,
        project,
        type: "hooks",
        visitedFiles,
      })
      break
    }
  }
}

function normalizeDependencies(dependencies: string[]) {
  return [
    ...new Set(
      dependencies
        .filter(
          (dependency) =>
            !ignoredDependencies.some((ignored) =>
              typeof ignored === "string"
                ? dependency === ignored
                : ignored.test(dependency),
            ),
        )
        .map((dependency) => {
          if (dependency.startsWith("@")) {
            return dependency.split("/").slice(0, 2).join("/")
          }
          return dependency.split("/")[0]
        }),
    ),
  ].sort()
}

await program.parseAsync()
