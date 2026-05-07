export type RecordObject = Record<string, unknown>

export function isRecord(value: unknown): value is RecordObject {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function entriesOf(value: unknown): Array<[string, unknown]> {
  return isRecord(value) ? Object.entries(value) : []
}
