export type ObjectKeys<T extends Record<PropertyKey, unknown>> =
  `${Exclude<keyof T, symbol>}`
export declare function objectKeys<T extends Record<PropertyKey, unknown>>(
  obj: T,
): Array<ObjectKeys<T>>
export declare function objectValues<T extends Record<PropertyKey, unknown>>(
  obj: T,
): Array<T[ObjectKeys<T>]>
export declare function objectEntries<T extends Record<PropertyKey, unknown>>(
  obj: T,
): Array<[ObjectKeys<T>, T[ObjectKeys<T>]]>
