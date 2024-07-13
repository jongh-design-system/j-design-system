export type ObjectKeys<T extends Record<PropertyKey, unknown>> =
  `${Exclude<keyof T, symbol>}`

export function objectKeys<T extends Record<PropertyKey, unknown>>(
  obj: T,
): Array<ObjectKeys<T>> {
  return Object.keys(obj) as Array<ObjectKeys<T>>
}

export function objectValues<T extends Record<PropertyKey, unknown>>(
  obj: T,
): Array<T[ObjectKeys<T>]> {
  return Object.values(obj) as Array<T[ObjectKeys<T>]>
}

export function objectEntries<T extends Record<PropertyKey, unknown>>(
  obj: T,
): Array<[ObjectKeys<T>, T[ObjectKeys<T>]]> {
  return Object.entries(obj) as Array<[ObjectKeys<T>, T[ObjectKeys<T>]]>
}
