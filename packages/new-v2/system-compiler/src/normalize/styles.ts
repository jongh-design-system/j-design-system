import { entriesOf } from "./utils.ts"

const nestedStyleKeys = {
  selector: (property: string) =>
    property.startsWith("_") || property.startsWith("&"),
  atRule: (property: string) =>
    property.startsWith("@media ") ||
    property.startsWith("@supports ") ||
    property.startsWith("@container "),
}

export function normalizeStyle(style: unknown) {
  const output: unknown[] = []
  const stack: Array<{
    scope: unknown[]
    style: unknown
  }> = [
    {
      scope: [],
      style,
    },
  ]

  for (let index = 0; index < stack.length; index += 1) {
    const item = stack[index]

    if (item === undefined) {
      continue
    }

    for (const [property, value] of entriesOf(item.style)) {
      if (value === undefined) {
        continue
      }

      if (nestedStyleKeys.selector(property)) {
        stack.push({
          scope: [
            ...item.scope,
            {
              kind: "selector",
              value: property,
            },
          ],
          style: value,
        })
        continue
      }

      if (nestedStyleKeys.atRule(property)) {
        const [name = "", ...params] = property.slice(1).split(" ")

        stack.push({
          scope: [
            ...item.scope,
            {
              kind: "atRule",
              name,
              ...(params.length > 0 ? { params: params.join(" ") } : {}),
            },
          ],
          style: value,
        })
        continue
      }

      output.push({
        scope: item.scope,
        property,
        value,
      })
    }
  }

  return output
}
