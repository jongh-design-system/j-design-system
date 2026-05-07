import type { RecordObject } from "./utils.ts"
import { entriesOf, isRecord } from "./utils.ts"

function normalizePrimitiveTokens(tokens: unknown) {
  const output: unknown[] = []
  const stack = entriesOf(tokens).map(([family, value]) => ({
    family,
    path: [family],
    value,
  }))

  for (let index = 0; index < stack.length; index += 1) {
    const item = stack[index]

    if (item === undefined || item.value === undefined) {
      continue
    }

    if (isRecord(item.value)) {
      for (const [key, child] of Object.entries(item.value)) {
        stack.push({
          family: item.family,
          path: [...item.path, key],
          value: child,
        })
      }

      continue
    }

    output.push({
      family: item.family,
      path: item.path.join("."),
      value: typeof item.value === "number" ? String(item.value) : item.value,
    })
  }

  return output
}

function normalizeSemanticTokens(tokens: unknown) {
  const output: unknown[] = []
  const stack = entriesOf(tokens).map(([family, value]) => ({
    family,
    path: [family],
    value,
  }))

  for (let index = 0; index < stack.length; index += 1) {
    const item = stack[index]

    if (item === undefined || item.value === undefined) {
      continue
    }

    const values = isRecord(item.value) ? Object.values(item.value) : []
    const isLeaf =
      values.length > 0 && values.every((mode) => typeof mode === "string")

    if (isLeaf) {
      output.push({
        family: item.family,
        path: item.path.join("."),
        modes: item.value,
      })
      continue
    }

    for (const [key, child] of entriesOf(item.value)) {
      stack.push({
        family: item.family,
        path: [...item.path, key],
        value: child,
      })
    }
  }

  return output
}

export function normalizeTokens(theme: RecordObject) {
  return {
    primitive: normalizePrimitiveTokens(theme.primitiveTokens),
    semantic: normalizeSemanticTokens(theme.semanticTokens),
  }
}
