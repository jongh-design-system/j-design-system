import { Node, Type } from "ts-morph"

import type { PropsInfo } from "../types"

export function formatPropsType(type: Type, depth = 0): string {
  const indent = "  ".repeat(depth)
  const lines: string[] = []

  const properties = type.getProperties()

  if (properties.length > 0) {
    lines.push(`${indent}/**`)
    lines.push(`${indent} * Props Type:`)
    lines.push(`${indent} * {`)

    for (const prop of properties) {
      const propName = prop.getName()
      const propDeclarations = prop.getDeclarations()

      if (propDeclarations.length === 0) continue

      const propDecl = propDeclarations[0]
      const propType = prop.getTypeAtLocation(propDecl)

      const propTypeText = resolveTypeText(propType, depth + 1)

      let description = ""

      if (Node.isJSDocable(propDecl)) {
        const jsDocs = propDecl.getJsDocs()
        if (jsDocs.length > 0) {
          description = jsDocs[0].getDescription().trim()
        }
      }

      const isOptional = prop.isOptional()
      const optionalMark = isOptional ? "?" : ""

      if (description) {
        lines.push(
          `${indent} *   ${propName}${optionalMark}: ${propTypeText} - ${description}`,
        )
      } else {
        lines.push(`${indent} *   ${propName}${optionalMark}: ${propTypeText}`)
      }
    }

    lines.push(`${indent} * }`)
    lines.push(`${indent} */`)
  } else {
    const typeText = type.getText().replace(/import\("[^"]+"\)\./g, "")
    lines.push(`${indent}/**`)
    lines.push(`${indent} * Props Type: ${typeText}`)
    lines.push(`${indent} */`)
  }

  return lines.join("\n")
}

export function resolveTypeText(type: Type, depth = 0): string {
  const typeText = type.getText()

  if (!typeText.includes("import(")) {
    return typeText
  }

  const intersectionTypes = type.getIntersectionTypes()
  if (intersectionTypes.length > 0) {
    const resolvedParts: string[] = []
    for (const intersectType of intersectionTypes) {
      const resolved = resolveTypeRecursive(intersectType, depth)
      resolvedParts.push(resolved)
    }
    return resolvedParts.join(" & ")
  }

  const unionTypes = type.getUnionTypes()
  if (unionTypes.length > 0) {
    const resolvedParts: string[] = []
    for (const unionType of unionTypes) {
      const resolved = resolveTypeRecursive(unionType, depth)
      resolvedParts.push(resolved)
    }
    return resolvedParts.join(" | ")
  }

  return resolveTypeRecursive(type, depth)
}

function resolveTypeRecursive(type: Type, depth = 0): string {
  console.log(
    `\n${"  ".repeat(depth)}[resolveTypeRecursive] 타입 텍스트:`,
    type.getText(),
  )

  const symbol = type.getSymbol() || type.getAliasSymbol()

  if (symbol) {
    console.log(`${"  ".repeat(depth)}  Symbol 이름:`, symbol.getName())

    const declarations = symbol.getDeclarations()
    console.log(`${"  ".repeat(depth)}  선언 개수:`, declarations.length)

    if (declarations.length > 0) {
      const decl = declarations[0]
      const sourceFile = decl.getSourceFile().getFilePath()
      console.log(`${"  ".repeat(depth)}  선언 위치:`, sourceFile)
      console.log(`${"  ".repeat(depth)}  선언 종류:`, decl.getKindName())

      if (Node.isTypeAliasDeclaration(decl)) {
        const typeNode = decl.getTypeNode()
        if (typeNode) {
          const result = typeNode.getText()
          console.log(`${"  ".repeat(depth)}  TypeAlias 결과:`, result)
          return result
        }
      }

      if (Node.isInterfaceDeclaration(decl)) {
        console.log(`${"  ".repeat(depth)}  Interface 발견!`)

        const interfaceType = decl.getType()
        const props = interfaceType.getProperties()
        console.log(
          `${"  ".repeat(depth)}  Interface Type의 프로퍼티 개수:`,
          props.length,
        )

        const extendsTypes = decl.getExtends()
        console.log(`${"  ".repeat(depth)}  extends 개수:`, extendsTypes.length)
        if (extendsTypes.length > 0) {
          extendsTypes.forEach((ext, i) => {
            console.log(
              `${"  ".repeat(depth)}    extends[${i}]:`,
              ext.getText(),
            )
          })
        }

        if (props.length > 0) {
          const propStrings = props.map((p) => {
            const propName = p.getName()
            const propDecls = p.getDeclarations()
            if (propDecls.length === 0) return `${propName}: unknown`

            const propType = p.getTypeAtLocation(propDecls[0])
            const isOptional = p.isOptional()
            console.log(
              `${"  ".repeat(depth)}    - ${propName}${isOptional ? "?" : ""}: ${propType.getText()}`,
            )
            return `${propName}${isOptional ? "?" : ""}: ${propType.getText()}`
          })
          const result = `{ ${propStrings.join("; ")} }`
          console.log(`${"  ".repeat(depth)}  Interface 결과:`, result)
          return result
        } else {
          console.log(`${"  ".repeat(depth)}  프로퍼티가 없음 - 원본 타입 사용`)
        }
      }
    }
  } else {
    console.log(`${"  ".repeat(depth)}  Symbol 없음`)
  }

  const properties = type.getProperties()
  console.log(
    `${"  ".repeat(depth)}  Type 자체의 프로퍼티 개수:`,
    properties.length,
  )

  if (properties.length > 0) {
    const propStrings = properties.map((p) => {
      const propName = p.getName()
      const propDecls = p.getDeclarations()
      if (propDecls.length === 0) return `${propName}: unknown`

      const propType = p.getTypeAtLocation(propDecls[0])
      const isOptional = p.isOptional()
      console.log(
        `${"  ".repeat(depth)}    - ${propName}${isOptional ? "?" : ""}: ${propType.getText()}`,
      )
      return `${propName}${isOptional ? "?" : ""}: ${propType.getText()}`
    })
    const result = `{ ${propStrings.join("; ")} }`
    console.log(`${"  ".repeat(depth)}  Type 프로퍼티 펼침 결과:`, result)
    return result
  }

  const result = type.getText().replace(/import\("[^"]+"\)\./g, "")
  console.log(`${"  ".repeat(depth)}  기본 결과 (import 제거):`, result)
  return result
}

// -------- Structured formatting (data -> jsdoc) --------

function sanitizeTypeText(text: string): string {
  return text.replace(/import\("[^"]+"\)\./g, "")
}

export function formatPropsInfo(info: PropsInfo, depth = 0): string {
  const indent = "  ".repeat(depth)
  const lines: string[] = []
  if (info.kind === "object") {
    lines.push(`${indent}/**`)
    lines.push(`${indent} * Props Type:`)
    lines.push(`${indent} * {`)
    for (const p of info.props) {
      const opt = p.optional ? "?" : ""
      if (p.description) {
        lines.push(
          `${indent} *   ${p.name}${opt}: ${sanitizeTypeText(p.type)} - ${p.description}`,
        )
      } else {
        lines.push(`${indent} *   ${p.name}${opt}: ${sanitizeTypeText(p.type)}`)
      }
    }
    lines.push(`${indent} * }`)
    lines.push(`${indent} */`)
    return lines.join("\n")
  }
  // alias
  lines.push(`${indent}/**`)
  lines.push(`${indent} * Props Type: ${sanitizeTypeText(info.typeText)}`)
  lines.push(`${indent} */`)
  return lines.join("\n")
}
