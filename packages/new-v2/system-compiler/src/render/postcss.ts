import postcss from "postcss"

import type {
  CssAtRule,
  CssDeclaration,
  CssNode,
  CssRule,
} from "../output/schema.ts"

function appendDeclarations(
  container: postcss.Container,
  declarations: CssDeclaration[] | undefined,
): void {
  for (const declaration of declarations ?? []) {
    container.append(
      postcss.decl({
        prop: declaration.property,
        value: declaration.value,
      }),
    )
  }
}

function toPostcssNode(node: CssNode): postcss.Rule | postcss.AtRule {
  if (node.kind === "rule") {
    return toPostcssRule(node)
  }

  return toPostcssAtRule(node)
}

function toPostcssRule(node: CssRule): postcss.Rule {
  const rule = postcss.rule({
    selector: node.selector,
  })

  appendDeclarations(rule, node.declarations)

  for (const child of node.children ?? []) {
    rule.append(toPostcssNode(child))
  }

  return rule
}

function toPostcssAtRule(node: CssAtRule): postcss.AtRule {
  const atRule = postcss.atRule({
    name: node.name,
    params: node.params,
  })

  appendDeclarations(atRule, node.declarations)

  for (const child of node.children ?? []) {
    atRule.append(toPostcssNode(child))
  }

  return atRule
}

export function stringifyCssNodes(nodes: CssNode[]): string {
  const root = postcss.root()

  for (const node of nodes) {
    root.append(toPostcssNode(node))
  }

  return root.toString()
}
