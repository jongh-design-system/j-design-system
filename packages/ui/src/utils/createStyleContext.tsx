import { createContext, type ElementType, forwardRef, useContext } from "react"

import { cn } from "./cn"

type SlotFn = (props?: { className?: string }) => string
type SlotRecord = Record<string, SlotFn>

const StyleContext = createContext<SlotRecord>({})

type RecipeWithSlots = {
  (...args: any[]): SlotRecord
  variantKeys: Array<string | number>
}

function splitVariantProps(
  props: Record<string, any>,
  variantKeys: Array<string | number>,
): [Record<string, any>, Record<string, any>] {
  const variants: Record<string, any> = {}
  const rest: Record<string, any> = {}

  for (const [key, value] of Object.entries(props)) {
    if (variantKeys.includes(key)) {
      variants[key] = value
    } else {
      rest[key] = value
    }
  }

  return [variants, rest]
}

export function createStyleContext(recipe: RecipeWithSlots) {
  function withProvider(Component: ElementType, slot: string) {
    const Comp = forwardRef<any, any>((props, ref) => {
      const [variantProps, rest] = splitVariantProps(props, recipe.variantKeys)
      const slots = recipe(variantProps)

      return (
        <StyleContext.Provider value={slots}>
          <Component
            ref={ref}
            {...rest}
            className={cn(slots[slot]?.(), rest.className)}
          />
        </StyleContext.Provider>
      )
    })
    Comp.displayName =
      (Component as any).displayName || (Component as any).name || "Component"
    return Comp
  }

  function withRootProvider(Component: ElementType) {
    const Comp = forwardRef<any, any>((props, ref) => {
      const [variantProps, rest] = splitVariantProps(props, recipe.variantKeys)
      const slots = recipe(variantProps)

      return (
        <StyleContext.Provider value={slots}>
          <Component ref={ref} {...rest} />
        </StyleContext.Provider>
      )
    })
    Comp.displayName =
      (Component as any).displayName || (Component as any).name || "Component"
    return Comp
  }

  function withContext(Component: ElementType, slot: string) {
    const Comp = forwardRef<any, any>((props, ref) => {
      const slots = useContext(StyleContext)

      return (
        <Component
          ref={ref}
          {...props}
          className={cn(slots[slot]?.(), props.className)}
        />
      )
    })
    Comp.displayName =
      (Component as any).displayName || (Component as any).name || "Component"
    return Comp
  }

  return { withProvider, withRootProvider, withContext }
}
