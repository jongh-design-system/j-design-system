import { Command } from "commander"
import { z } from "zod"
import fs from "fs-extra"
import { Project } from "ts-morph"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const program = new Command()

const UI_WORKSPACE_PATH = path.resolve(__dirname, "../../ui/src/component") //ui 경로
const TARGET_PATH = path.resolve(__dirname, "../../../app/docs/public") //registry 파일이 생성될 경로

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
      }
      console.log("\n✅ 모든 컴포넌트의 Registry 파일 생성이 완료되었습니다!")
    } else {
      console.log(`🔄 ${component} 컴포넌트의 Registry 파일을 생성합니다.`)
      await createRegistryFile(component!)
      console.log(`✅ ${component} Registry 파일 생성이 완료되었습니다!`)
    }
  } catch (e) {
    console.error("❌ Registry 파일 생성에 실패했습니다", e)
  }
}

export async function createRegistryFile(component: string) {
  console.log(`📁 ${component} 컴포넌트 경로를 확인합니다...`)
  const componentPath = path.join(UI_WORKSPACE_PATH, `./${component}`)
  const files = await fs.readdir(componentPath)

  files.forEach((file) => {
    if (file !== `index.tsx` && file !== `recipe.ts`) {
      console.error(
        `⚠️ ${component} 파일 형식이 올바르지 않습니다. ${file}은 유효하지 않은 파일입니다.`,
      )
      process.exit(1)
    }
  })

  console.log(`📖 ${component} 파일 내용을 읽어들입니다...`)
  const fileContents: { name: string; content: string }[] = []
  const dependencies: string[] = []

  const project = new Project()
  for (const file of files) {
    const content = fs.readFileSync(path.join(componentPath, file), "utf-8")
    fileContents.push({ name: file, content })
    console.log(`✓ ${file} 파일을 읽었습니다.`)
  }
  const sourceFile = project.addSourceFileAtPath(
    path.join(componentPath, "index.tsx"),
  )

  console.log(`🔍 의존성을 분석합니다...`)
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

  console.log(`💾 Registry 파일을 저장합니다...`)
  await fs.writeFile(
    path.join(TARGET_PATH, `${component.toLowerCase()}.json`),
    stringifiedFileContent,
  )
}
