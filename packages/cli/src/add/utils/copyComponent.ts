// src/copy-components.ts
import path from "node:path"
import fs from "fs-extra"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const COMPONENTS_DIR = path.join(__dirname, "./components/Button/index.tsx")

export async function copyComponent(componentName: string, outputPath: string) {
  try {
    // 1. 우리 패키지 안의 컴포넌트 경로
    const sourceFile = COMPONENTS_DIR

    // 2. 유저 프로젝트의 목적지 경로 (CLI 실행 위치 기준)
    const targetFile = path.join(
      process.cwd(),
      outputPath,
      `${componentName}.tsx`,
    )

    // 3. 복사 실행
    await fs.copy(sourceFile, targetFile)

    console.log(`${componentName} copied to ${outputPath}`)
  } catch (error) {
    throw new Error(`Failed to copy component: ${error}`)
  }
}
