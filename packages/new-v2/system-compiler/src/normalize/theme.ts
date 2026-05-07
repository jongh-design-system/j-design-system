import type { SystemDefinition, TokenSource } from "@jongh/new-v2-system-core"

import { entriesOf, isRecord, type RecordObject } from "./utils.ts"

function mergeRecords(base: unknown, override: unknown): RecordObject {
  const merged: RecordObject = { ...(isRecord(base) ? base : {}) }

  for (const [key, value] of entriesOf(override)) {
    const current = merged[key]
    merged[key] =
      isRecord(current) && isRecord(value)
        ? mergeRecords(current, value)
        : value
  }

  return merged
}

export function normalizeTheme<TTheme extends TokenSource>(
  system: SystemDefinition<TTheme>,
) {
  return [system.theme, ...(system.presets ?? [])].reduce<RecordObject>(
    (theme, nextTheme) => mergeRecords(theme, nextTheme),
    {},
  )
}
