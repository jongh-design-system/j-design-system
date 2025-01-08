// registry.ts
import { Command } from "commander"
import { z } from "zod"
import fs from "fs-extra"
import { Project } from "ts-morph"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const program = new Command()

const UI_WORKSPACE_PATH = path.resolve(__dirname, "../../ui/src/component")

const registryOptionSchema = z.object({
  component: z.string().optional(),
  all: z.boolean(),
})

//install하지 않아도 되는 리스트
const WHITE_LIST = [
  /^next\/.+/, // next/image, next/link 등
  "react", // react, react-dom, @types/react 등
  "react-dom",
  /^@styled-system\/.+/,
  /^@utils\/.+/,
]

export const registry = program
  .name("registry")
  .description("create component registry file")
  .option("-c, --component <component>", "single component name")
  .option("-a, --all", "process all components", false)
  .action(handleRegistryCommand)

program.parse()
export async function handleRegistryCommand(
  option: z.infer<typeof registryOptionSchema>,
) {
  const { component, all } = registryOptionSchema.parse(option)
  if (all && !component) {
    const components = await fs.readdir(path.resolve(UI_WORKSPACE_PATH))
    for (const component of components) {
      await createRegistryFile(component)
    }
  } else {
    await createRegistryFile(component!)
  }
}

export async function createRegistryFile(component: string) {
  const componentPath = path.join(UI_WORKSPACE_PATH, `./${component}`)
  const files = await fs.readdir(componentPath)

  files.forEach((file) => {
    if (file !== `index.tsx` && file !== `recipe.ts`) {
      console.log(
        `${component} 파일 형식이 올바르지 않음 , ${file}은 유효하지 않음`,
      )
      process.exit(1)
    }
  })

  const fileContents: { name: string; content: string }[] = []
  const dependencies: string[] = []

  const project = new Project()
  for (const file of files) {
    const content = fs.readFileSync(path.join(componentPath, file), "utf-8")
    fileContents.push({ name: file, content })
  }
  const sourceFile = project.addSourceFileAtPath(
    path.join(componentPath, "index.tsx"),
  )

  sourceFile.getImportDeclarations().forEach((importDeclaration) => {
    const module = importDeclaration.getModuleSpecifier().getLiteralValue()
    dependencies.push(module)
  })

  const fileContent = {
    name: `${component}`,
    dependencies: dependencies.filter(
      (dep) =>
        !WHITE_LIST.some((w) =>
          typeof w === "string" ? dep === w : w.test(dep),
        ),
    ),
    files: fileContents,
  }
  const stringifiedFileContent = JSON.stringify(fileContent)

  await fs.writeFile(
    path.join(__dirname, `../../app/src/${component}.json`),
    stringifiedFileContent,
  )
}
