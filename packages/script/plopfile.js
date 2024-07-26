import { promises as fs } from "fs"
import path from "path"
import { fileURLToPath } from "url"

async function getAllFiles(dirPath) {
  let files = []
  const items = await fs.readdir(dirPath, { withFileTypes: true })

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name)

    if (item.isDirectory()) {
      const nestedFiles = await getAllFiles(fullPath)
      files = files.concat(nestedFiles)
    } else {
      files.push(fullPath)
    }
  }

  return files
}

export default async function writeStories(plop) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const dir = path.join(__dirname, "../ui/src/components")
  const files = await getAllFiles(dir)
  const fileNames = files.map((file) => path.relative(dir, file))

  plop.setGenerator("Story", {
    description: "Create a story file",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "스토리를 작성할 컴포넌트 이름을 입력해주세요",
        validate: (input) => {
          const componentPath = `${input}.tsx`
          const isValid = fileNames.some((fileName) =>
            fileName.endsWith(componentPath),
          )

          if (!isValid) {
            console.log("\n만들어진 컴포넌트 이름을 입력해주세요.")
            return false
          }

          return true
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "../ui/src/stories/{{pascalCase name}}.stories.tsx",
        templateFile: "Stories.tsx.hbs",
      },
    ],
  })
}
