import { Node, Project } from "ts-morph"

import { ComponentDetector } from "./componentDetector"

interface ComponentInfo {
  name: string
  kind: string
  jsDoc: string | null
  node: Node
}

export async function parseFile({
  tsconfigPath,
  filePath,
}: {
  tsconfigPath: string
  filePath: string
}) {
  const project = new Project({ tsConfigFilePath: tsconfigPath })

  const sourceFile = project.getSourceFileOrThrow(filePath)
  const components: ComponentInfo[] = []
  const detector = new ComponentDetector()

  // 1. 함수 선언 컴포넌트
  sourceFile.getFunctions().forEach((func) => {
    if (detector.isBasicComponent(func)) {
      const jsDocComments = func.getJsDocs()
      const jsDocText =
        jsDocComments.length > 0
          ? jsDocComments.map((doc) => doc.getFullText()).join("\n")
          : null

      components.push({
        name: func.getName() || "Anonymous",
        kind: "FunctionDeclaration",
        jsDoc: jsDocText,
        node: func,
      })
    }
  })

  // 2. 변수 선언 컴포넌트
  sourceFile.getVariableDeclarations().forEach((varDecl) => {
    const name = varDecl.getName()
    const componentKind = detector.detectComponentKind(varDecl)

    if (componentKind) {
      const variableStatement = varDecl.getVariableStatement()
      const jsDocComments = variableStatement?.getJsDocs() || []
      const jsDocText =
        jsDocComments.length > 0
          ? jsDocComments.map((doc) => doc.getFullText()).join("\n")
          : null

      components.push({
        name: name,
        kind: componentKind,
        jsDoc: jsDocText,
        node: varDecl,
      })
    }
  })

  // 4. default export
  sourceFile.getExportAssignments().forEach((exportAssignment) => {
    if (detector.isDefaultExportComponent(exportAssignment)) {
      components.push({
        name: "default",
        kind: "DefaultExport",
        jsDoc: null,
        node: exportAssignment,
      })
    }
  })
}
