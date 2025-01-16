import type { ConfigType } from "../../common/types"
import { Project, Node, SyntaxKind } from "ts-morph"

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

  // 새로운 import 문 추가
  sourceFile.addImportDeclaration({
    moduleSpecifier: recipePath,
    namedImports: [{ name: `${recipeName}Recipe` }],
  })

  // recipes 객체에 새로운 속성 추가
  objectLiteral.addPropertyAssignment({
    name: recipeName,
    initializer: `${recipeName}Recipe`,
  })

  // 변경사항 저장
  sourceFile.saveSync()
}
