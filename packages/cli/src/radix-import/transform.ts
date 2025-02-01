import { SyntaxKind, type SourceFile } from "ts-morph"

const importMap = {
  "@radix-ui/react-accessible-icon": "AccessibleIcon",
  "@radix-ui/react-accordion": "Accordion",
  "@radix-ui/react-alert-dialog": "AlertDialog",
  "@radix-ui/react-aspect-ratio": "AspectRatio",
  "@radix-ui/react-avatar": "Avatar",
  "@radix-ui/react-checkbox": "Checkbox",
  "@radix-ui/react-collapsible": "Collapsible",
  "@radix-ui/react-context-menu": "ContextMenu",
  "@radix-ui/react-dialog": "Dialog",
  "@radix-ui/react-direction": "Direction",
  "@radix-ui/react-dropdown-menu": "DropdownMenu",
  "@radix-ui/react-form": "Form",
  "@radix-ui/react-hover-card": "HoverCard",
  "@radix-ui/react-label": "Label",
  "@radix-ui/react-menubar": "Menubar",
  "@radix-ui/react-navigation-menu": "NavigationMenu",
  "@radix-ui/react-popover": "Popover",
  "@radix-ui/react-portal": "Portal",
  "@radix-ui/react-progress": "Progress",
  "@radix-ui/react-radio-group": "RadioGroup",
  "@radix-ui/react-scroll-area": "ScrollArea",
  "@radix-ui/react-select": "Select",
  "@radix-ui/react-separator": "Separator",
  "@radix-ui/react-slider": "Slider",
  "@radix-ui/react-slot": "Slot",
  "@radix-ui/react-switch": "Switch",
  "@radix-ui/react-tabs": "Tabs",
  "@radix-ui/react-toast": "Toast",
  "@radix-ui/react-toggle": "Toggle",
  "@radix-ui/react-toggle-group": "ToggleGroup",
  "@radix-ui/react-toolbar": "Toolbar",
  "@radix-ui/react-tooltip": "Tooltip",
  "@radix-ui/react-visually-hidden": "VisuallyHidden",
} as const //기존의 개별 export하던 패키지이름 - 현재 radix-ui에서 export하는 이름

export function shouldReplace(
  target: string,
  importName: string,
  alias?: string,
) {
  return alias ? target === alias : target === importName
}

export function radixImportFormat(specifier: string) {
  return `import {${specifier}} from "radix-ui"`
}

export function transform(sourceFile: SourceFile) {
  const installedPackages: string[] = []
  sourceFile.getImportDeclarations().forEach((importDeclaration) => {
    const moduleName = importDeclaration.getModuleSpecifierValue()
    if (moduleName in importMap === false) {
      return
    }

    let componentNameByRadix = importMap[moduleName as keyof typeof importMap]
    installedPackages.push(moduleName)

    const namespaceIdentifier = importDeclaration.getNamespaceImport() //import * as
    if (namespaceIdentifier) {
      const alias = namespaceIdentifier.getText()
      if (componentNameByRadix !== alias) {
        componentNameByRadix += ` as ${alias}`
      }
      importDeclaration.replaceWithText(radixImportFormat(componentNameByRadix))
      return
    }

    const namedSpecifiers = importDeclaration.getNamedImports() // import {a,b}

    if (namedSpecifiers.length) {
      const originalImportName = componentNameByRadix // 원본 저장
      namedSpecifiers.forEach((namedSpecifier) => {
        const importName = namedSpecifier.getName()
        const alias = namedSpecifier.getAliasNode()?.getText()

        const fullImportName = `${originalImportName}.${importName}`

        //as 키워드 사용 못함
        for (const syntaxKind of [
          SyntaxKind.JsxOpeningElement,
          SyntaxKind.JsxClosingElement,
          SyntaxKind.JsxSelfClosingElement,
        ] as const) {
          sourceFile.getDescendantsOfKind(syntaxKind).forEach((kind) => {
            const target = kind.getTagNameNode().getText()
            if (shouldReplace(target, importName, alias)) {
              kind.getTagNameNode().replaceWithText(fullImportName)
            }
          })
        }
        //type
        sourceFile
          .getDescendantsOfKind(SyntaxKind.TypeQuery)
          .forEach((kind) => {
            kind.getChildren().forEach((v) => {
              const target = v.getText()
              if (shouldReplace(target, importName, alias)) {
                v.replaceWithText(fullImportName)
              }
            })
          })
        //Expression statement
        sourceFile
          .getDescendantsOfKind(SyntaxKind.ExpressionStatement)
          .forEach((kind) => {
            const children = kind.getChildrenOfKind(
              SyntaxKind.BinaryExpression, //a=b
            )

            children.forEach((child) => {
              const rightNode = child.getRight()
              rightNode.getChildren().forEach((v) => {
                const target = v.getText()
                if (shouldReplace(target, importName, alias)) {
                  v.replaceWithText(fullImportName)
                }
              })
            })
          })

        sourceFile
          .getDescendantsOfKind(SyntaxKind.VariableDeclaration)
          .forEach((kind) => {
            const initializer = kind.getInitializer()
            if (!initializer) {
              return
            }

            initializer.getChildren().forEach((v) => {
              const target = v.getText()
              if (shouldReplace(target, importName, alias)) {
                v.replaceWithText(fullImportName)
              }
            })
            // if (initializer.asKind(SyntaxKind.PropertyAccessExpression)) {
            //   initializer.getChildren().forEach((child) => {
            //     const target = child.getText()
            //     if (shouldReplace(target, importName, alias)) {
            //       child.replaceWithText(fullImportName)
            //     }
            //   })
            // }
            // if (initializer.asKind(SyntaxKind.Identifier)) {
            //   if (shouldReplace(initializer.getText(), importName, alias)) {
            //     initializer.replaceWithText(fullImportName)
            //   }
            // }
          })
      })
      importDeclaration.replaceWithText(radixImportFormat(originalImportName))
    }
  })
  return { source: sourceFile.getFullText(), packages: installedPackages }
}
