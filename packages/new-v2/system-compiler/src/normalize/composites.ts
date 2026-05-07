import { entriesOf, isRecord } from "./utils.ts"

function normalizeAnimations(animations: unknown) {
  return entriesOf(animations).map(([name, animation]) => ({
    name,
    ...(isRecord(animation) ? animation : {}),
  }))
}

function normalizeTextStyles(textStyles: unknown) {
  const output: unknown[] = []
  const stack = entriesOf(textStyles).map(([key, value]) => ({
    path: [key],
    value,
  }))

  for (let index = 0; index < stack.length; index += 1) {
    const item = stack[index]

    if (item === undefined || item.value === undefined) {
      continue
    }

    if (!isRecord(item.value)) {
      continue
    }

    const values = Object.values(item.value)
    const isLeaf =
      values.length > 0 && values.every((value) => !isRecord(value))

    if (isLeaf) {
      output.push({
        name: item.path.join("."),
        ...item.value,
      })
      continue
    }

    for (const [key, child] of entriesOf(item.value)) {
      stack.push({
        path: [...item.path, key],
        value: child,
      })
    }
  }

  return output
}

export function normalizeComposites(composites: unknown) {
  return {
    textStyles: normalizeTextStyles(
      isRecord(composites) ? composites.textStyles : undefined,
    ),
    animations: normalizeAnimations(
      isRecord(composites) ? composites.animations : undefined,
    ),
  }
}
