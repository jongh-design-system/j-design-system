import type { CompileLayer, CssDeclaration, CssNode } from "../output/schema.ts"
import { stringifyCssNodes } from "./postcss.ts"

function layerToNodes(layer: CompileLayer): CssNode[] {
  const tokenDeclarations = layer.blocks.flatMap((block) =>
    block.kind === "token" ? block.declarations : [],
  )
  const modeDeclarations = new Map<string, CssDeclaration[]>()

  for (const block of layer.blocks) {
    if (block.kind !== "tokenMode") {
      continue
    }

    modeDeclarations.set(block.mode, [
      ...(modeDeclarations.get(block.mode) ?? []),
      ...block.declarations,
    ])
  }

  const nodes: CssNode[] =
    tokenDeclarations.length > 0
      ? [
          {
            kind: "rule",
            selector: ":root",
            declarations: tokenDeclarations,
          },
        ]
      : []

  for (const [mode, declarations] of modeDeclarations) {
    nodes.push({
      kind: "rule",
      selector: `.${mode}`,
      declarations,
    })
  }

  for (const block of layer.blocks) {
    if (block.kind === "css") {
      nodes.push(...block.nodes)
      continue
    }

    if (block.kind === "keyframes") {
      nodes.push({
        kind: "at-rule",
        name: "keyframes",
        params: block.name,
        children: block.frames.map((frame) => ({
          kind: "rule",
          selector: frame.selector,
          declarations: frame.declarations,
        })),
      })
      continue
    }

    if (block.kind === "recipe") {
      nodes.push(...block.nodes)
    }
  }

  return nodes
}

export function renderLayer(layer: CompileLayer): string {
  return stringifyCssNodes(layerToNodes(layer))
}
