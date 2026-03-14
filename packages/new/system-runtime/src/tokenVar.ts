export function createVarName(path: string, prefix = "jds"): string {
  return `--${prefix}-${path.replaceAll(".", "-")}`
}

export function tokenVar(path: string, prefix = "jds"): string {
  return `var(${createVarName(path, prefix)})`
}
