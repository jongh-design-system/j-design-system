/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"

export function createContext<ContextValueType extends object | null>(
  rootComponentName: string,
  defaultContext?: ContextValueType,
) {
  const C = React.createContext<ContextValueType | undefined>(defaultContext) //context 생성
  const Provider = (
    props: ContextValueType & { children: React.ReactNode },
  ) => {
    const { children, ...context } = props
    // Only re-memoize when prop values change
    const value = React.useMemo(
      () => context,
      Object.values(context),
    ) as ContextValueType

    return <C.Provider value={value}>{children}</C.Provider>
  }

  function useContext(consumerName: string) {
    const context = React.useContext(C)
    if (context) return context
    if (defaultContext !== undefined) return defaultContext
    // if a defaultContext wasn't specified, it's a required context.
    throw new Error(
      `\`${consumerName}\` must be used within \`${rootComponentName}\``,
    )
  }

  Provider.displayName = rootComponentName + "Provider"
  return [Provider, useContext] as const
}
