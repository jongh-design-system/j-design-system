import type { ReactElement } from "react"

interface Props<Case extends string | number> {
  caseBy: Partial<Record<Case, ReactElement>>
  value?: Case | null
  defaultComponent?: ReactElement | null
}

export function SwitchCase<Case extends string | number>({
  value,
  caseBy,
  defaultComponent: defaultComponent = null,
}: Props<Case>) {
  console.log(value)
  if (!value) {
    return defaultComponent
  }

  return caseBy[value] ?? defaultComponent
}
