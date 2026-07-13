/* eslint-disable @typescript-eslint/naming-convention */
import { Command } from "commander"
import fs from "fs-extra"
import path, { dirname } from "path"
import { Project } from "ts-morph"
import { fileURLToPath } from "url"
import { z } from "zod"

import { fileSchema, guideRegistrySchema, styleSchema } from "./common/types"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const program = new Command()

const UI_WORKSPACE_PATH = path.resolve(__dirname, "../../ui/src/component") //ui 경로
const TARGET_PATH = path.resolve(__dirname, "../../../app/docs/public") //registry 파일이 생성될 경로
const UI_PRESET_PATH = path.resolve(__dirname, "../../ui")
const UI_TOKENS_PATH = path.resolve(__dirname, "../../ui/src/tokens")
const UI_HOOKS_PATH = path.resolve(__dirname, "../../ui/src/hooks")

const registryOptionSchema = z.object({
  component: z.string().optional(),
  all: z.boolean(),
})

//install하지 않아도 되는 리스트
const WHITE_LIST = [
  /^next\/.+/, // next/image, next/link 등
  "react", // react, react-dom, @types/react 등
  "react-dom",
  /^@styled-system\/.+/, //내부 패키지들
  /^@\/component\/.+/,
  /^@utils\/.+/,
  /^@components\/.+/,
  /^@hooks\/.+/,
  "tailwind-variants",
  /^\.\/.+/,
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
  try {
    console.log("🚀 Registry 파일 생성을 시작합니다...")
    const { component, all } = registryOptionSchema.parse(option)
    if (all && !component) {
      console.log("📑 모든 컴포넌트에 대한 Registry 파일을 생성합니다.")
      const components = await fs.readdir(path.resolve(UI_WORKSPACE_PATH))
      console.log(`📋 총 ${components.length}개의 컴포넌트를 처리합니다.`)
      for (const component of components) {
        console.log(`\n🔄 ${component} 처리 중...`)
        await createRegistryFile(component)
        await createGuideRegistryFile(component)
      }
      await createPresetFile()
      await createTailwindTokenFile()
      console.log("\n✅ 모든 컴포넌트의 Registry 파일 생성이 완료되었습니다!")
    } else {
      console.log(`🔄 ${component} 컴포넌트의 Registry 파일을 생성합니다.`)
      await createRegistryFile(component!)
      await createGuideRegistryFile(component!)
      console.log(`✅ ${component} Registry 파일 생성이 완료되었습니다!`)
    }
  } catch (e) {
    console.error("❌ Registry 파일 생성에 실패했습니다", e)
  }
}

export async function createRegistryFile(component: string) {
  console.log(`📁 ${component} 컴포넌트 경로를 확인합니다...`)
  const componentPath = path.join(UI_WORKSPACE_PATH, `./${component}`)

  const styles: Record<
    string,
    {
      dependencies: string[]
      files: Array<z.infer<typeof fileSchema>>
    }
  > = {}

  for (const styleDirectory of styleSchema.options) {
    const folderPath = path.join(componentPath, styleDirectory)
    const exist = await fs.pathExists(folderPath)
    if (!exist) {
      continue
    }

    const project = new Project()
    const fileContents: Array<z.infer<typeof fileSchema>> = []
    const dependencies = new Set<string>()
    const visitedFiles = new Set<string>()
    const files = await fs.readdir(folderPath)

    for (const file of files) {
      await collectRegistryFile({
        dependencies,
        fileContents,
        filePath: path.join(folderPath, file),
        project,
        type: "ui",
        visitedFiles,
      })
    }

    styles[styleDirectory] = {
      dependencies: normalizeDependencies([...dependencies]),
      files: fileContents,
    }
  }

  if (!Object.keys(styles).length) {
    console.warn(`⚠️ ${component} 컴포넌트에 유효한 style 디렉토리가 없습니다.`)
    return
  }

  const fileContent = {
    name: `${component}`,
    styles,
  }
  const stringifiedFileContent = JSON.stringify(fileContent)

  console.log(`💾 Registry 파일을 저장합니다...`)
  await fs.writeFile(
    path.join(TARGET_PATH, `${component.toLowerCase()}.json`),
    stringifiedFileContent,
  )
}

export async function createGuideRegistryFile(component: string) {
  const guidePath = path.join(UI_WORKSPACE_PATH, component, "guide.md")
  if (!(await fs.pathExists(guidePath))) {
    return
  }

  const guide = guideRegistrySchema.parse({
    name: component,
    content: await fs.readFile(guidePath, "utf-8"),
  })

  await fs.outputFile(
    path.join(TARGET_PATH, "guides", `${component.toLowerCase()}.json`),
    JSON.stringify(guide),
  )
}

async function collectRegistryFile({
  dependencies,
  fileContents,
  filePath,
  project,
  type,
  visitedFiles,
}: {
  dependencies: Set<string>
  fileContents: Array<z.infer<typeof fileSchema>>
  filePath: string
  project: Project
  type: z.infer<typeof fileSchema>["type"]
  visitedFiles: Set<string>
}) {
  if (visitedFiles.has(filePath)) {
    return
  }
  visitedFiles.add(filePath)

  const content = await fs.readFile(filePath, "utf-8")
  fileContents.push({ name: path.basename(filePath), content, type })
  console.log(`✓ ${path.basename(filePath)} 파일을 읽었습니다.`)

  const sourceFile = project.addSourceFileAtPath(filePath)
  console.log(`🔍 의존성을 분석합니다...`)
  for (const importDeclaration of sourceFile.getImportDeclarations()) {
    const module = importDeclaration.getModuleSpecifier().getLiteralValue()
    dependencies.add(module)

    const internalFile = resolveInternalFile(module)
    if (internalFile) {
      await collectRegistryFile({
        dependencies,
        fileContents,
        filePath: internalFile.filePath,
        project,
        type: internalFile.type,
        visitedFiles,
      })
    }
  }
}

function resolveInternalFile(module: string) {
  const internalRoots = [
    { prefix: "@hooks/", root: UI_HOOKS_PATH, type: "hooks" as const },
  ]

  const target = internalRoots.find(({ prefix }) => module.startsWith(prefix))
  if (!target) {
    return null
  }

  const relativePath = module.slice(target.prefix.length)
  for (const extension of [".ts", ".tsx"]) {
    const filePath = path.join(target.root, `${relativePath}${extension}`)
    if (fs.pathExistsSync(filePath)) {
      return { filePath, type: target.type }
    }
  }

  return null
}

function normalizeDependencies(dependencies: string[]) {
  return [
    ...new Set(
      dependencies
        .filter(
          (dep) =>
            !WHITE_LIST.some((w) =>
              typeof w === "string" ? dep === w : w.test(dep),
            ),
        )
        .map((dep) => {
          if (dep.startsWith("@")) {
            const [scope, name] = dep.split("/")
            return `${scope}/${name}`
          }

          return dep.split("/")[0]
        }),
    ),
  ]
}

export async function createPresetFile() {
  //TODO: 다양한 preset파일을 폴더형태로 제공
  const content = await fs.readFile(
    path.join(UI_PRESET_PATH, "preset.ts"),
    "utf-8",
  )
  const fileContent = {
    name: "preset.ts",
    dependencies: [],
    file: JSON.stringify(content),
  }
  fs.writeFile(
    path.join(TARGET_PATH, "preset.json"),
    JSON.stringify(fileContent),
  )
}

export async function createTailwindTokenFile() {
  const content = await fs.readFile(
    path.join(UI_TOKENS_PATH, "tailwind.template.css"),
    "utf-8",
  )
  const fileContent = {
    name: "tailwind.css",
    dependencies: ["tailwindcss"],
    file: JSON.stringify(content),
  }
  fs.writeFile(
    path.join(TARGET_PATH, "tailwind.json"),
    JSON.stringify(fileContent),
  )
}
