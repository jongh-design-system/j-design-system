import type { ConfigType } from "../types"

export function transformImports(content: string, config: ConfigType) {
  let transformedContent = content

  const transformPatterns = [
    {
      from: /@\/component\/([^/"']+)/g,
      to: `${config.components}/$1`,
    },
    {
      from: /@utils\//g,
      to: `${config.utils}/`,
    },
    {
      from: /@hooks\//g,
      to: `${config.hooks}/`,
    },
    {
      from: /@components\//g,
      to: `${config.components}/`,
    },
  ]

  transformPatterns.forEach(({ from, to }) => {
    transformedContent = transformedContent.replace(from, to)
  })

  return transformedContent
}
