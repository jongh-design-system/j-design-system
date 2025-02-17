import {
  Node,
  type ObjectLiteralExpression,
  Project,
  SyntaxKind,
} from "ts-morph"

import type { ConfigType } from "../types"

export function transformImports(content: string, config: ConfigType) {
  let transformedContent = content

  // 모든 가능한 import 패턴들을 변환
  const transformPatterns = [
    // utils
    {
      from: /@utils\//g,
      to: `${config.utils}/`,
    },
    // hooks
    {
      from: /@hooks\//g,
      to: `${config.hooks}/`,
    },
    // styled-system
    {
      from: /@styled-system\//g,
      to: `${config.styledsystem}/`,
    },
    // components
    {
      from: /@components\//g,
      to: `${config.components}/`,
    },
  ]

  // 각 패턴에 대해 변환 수행
  transformPatterns.forEach(({ from, to }) => {
    transformedContent = transformedContent.replace(from, to)
  })

  return transformedContent
}

export function transformPreset(
  filePath: string,
  recipeName: string,
  recipePath: string,
) {
  const project = new Project()
  const sourceFile = project.addSourceFileAtPath(filePath)

  // definePreset 호출을 찾음
  const definePresetCall = sourceFile.getFirstDescendant(
    (node) =>
      Node.isCallExpression(node) &&
      node.getExpression().getText() === "definePreset",
  )

  if (!definePresetCall) return

  // recipes 객체를 찾음
  const recipesObj = definePresetCall?.getFirstDescendant(
    (node) => Node.isPropertyAssignment(node) && node.getName() === "recipes",
  )

  if (!recipesObj) return

  // recipes의 객체 리터럴을 가져옴
  const objectLiteral = recipesObj.getFirstDescendantByKind(
    SyntaxKind.ObjectLiteralExpression,
  )

  if (!objectLiteral) return

  const isImportExists = sourceFile
    .getImportDeclarations()
    .some((importDeclaration) => {
      const moduleSpecifier = importDeclaration.getModuleSpecifierValue()
      const namedImports = importDeclaration.getNamedImports()
      return (
        moduleSpecifier === recipePath &&
        namedImports.some(
          (importSpecifier) =>
            importSpecifier.getName() === `${recipeName}Recipe`,
        )
      )
    })

  // 새로운 import 문 추가
  if (!isImportExists) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: recipePath,
      namedImports: [{ name: `${recipeName}Recipe` }],
    })

    // recipes 객체에 새로운 속성 추가
    objectLiteral.addPropertyAssignment({
      name: recipeName,
      initializer: `${recipeName}Recipe`,
    })
  }

  // 변경사항 저장
  sourceFile.saveSync()
}

export function transformPandaConfig(path: string) {
  const project = new Project()
  const sourceFile = project.addSourceFileAtPath(path)

  const importToIncludes = [
    {
      namedImports: [{ name: "preset" }],
      moduleSpecifier: "panda-animation",
    },
    {
      namedImports: [{ name: "defaultPreset" }],
      moduleSpecifier: "./preset",
    },
  ]

  sourceFile.addImportDeclarations(importToIncludes)

  //export defineConfig() 형식으로 사용한 경우에만 가능
  const defineConfigCall = sourceFile.getFirstDescendantByKind(
    SyntaxKind.CallExpression,
  )
  // 설정 객체 가져오기
  const configObject =
    defineConfigCall?.getArguments()[0] as ObjectLiteralExpression

  //panda.config.ts파일에 presets에 추가하기
  if (configObject) {
    // presets 속성이 이미 있는지 확인
    const existingPresets = configObject.getProperty("presets")

    if (!existingPresets) {
      // presets 속성이 없다면 추가
      configObject.addPropertyAssignment({
        name: "presets",
        initializer: `[preset(), "@pandacss/preset-panda", defaultPreset"]`,
      })
    }

    // 변경사항 저장
    sourceFile.saveSync()
  } else {
    console.warn(
      "Could not modify panda.config.ts. add presets : [preset(), @pandacss/preset-panda, defaultPreset] in your panda.config",
    )
  }
}
