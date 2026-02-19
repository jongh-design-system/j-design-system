"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  createContext,
  createElement,
  type ElementType,
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
  useContext,
} from "react"
import type { VariantProps } from "tailwind-variants"

import { cn } from "./cn"

// ----------------------------------------------------------
// Foundation Types
// ----------------------------------------------------------

type SlotFn = (slotProps?: { className?: string }) => string

type SlottedRecipe = {
  (props?: Record<string, unknown>): Record<string, SlotFn>
  variantKeys: ReadonlyArray<string | number>
}

type SlotOf<R extends SlottedRecipe> = keyof ReturnType<R> & string

const StyleContext = createContext<Record<string, SlotFn>>({})

// ----------------------------------------------------------
// Helpers
// ----------------------------------------------------------

function getDisplayName(Component: ElementType): string {
  if (typeof Component === "string") return Component
  return (
    (Component as { displayName?: string }).displayName ||
    (Component as { name?: string }).name ||
    "Component"
  )
}

function splitVariantProps(
  props: Record<string, unknown>,
  variantKeys: ReadonlyArray<string | number>,
): [Record<string, unknown>, Record<string, unknown>] {
  const variants: Record<string, unknown> = {}
  const rest: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(props)) {
    if (variantKeys.includes(key)) {
      variants[key] = value
    } else {
      rest[key] = value
    }
  }

  return [variants, rest]
}

// ----------------------------------------------------------
// Main Factory
// ----------------------------------------------------------

export function createStyleContext<R extends SlottedRecipe>(recipe: R) {
  type Slot = SlotOf<R>
  type RecipeVariantProps = VariantProps<R>

  function withProvider<C extends ElementType>(
    Component: C,
    slot: Slot,
  ): ForwardRefExoticComponent<
    ComponentPropsWithoutRef<C> &
      RecipeVariantProps &
      RefAttributes<ComponentRef<C>>
  > {
    const Comp = forwardRef((props: any, ref: any) => {
      const [variantProps, rest] = splitVariantProps(props, recipe.variantKeys)
      const slots = recipe(variantProps) as Record<Slot, SlotFn>

      return createElement(
        StyleContext.Provider,
        { value: slots },
        createElement(Component as any, {
          ref,
          ...rest,
          className: cn(slots[slot]?.(), rest.className as string),
        }),
      )
    })
    Comp.displayName = getDisplayName(Component)
    return Comp as any
  }

  function withRootProvider<C extends ElementType>(
    Component: C,
  ): ForwardRefExoticComponent<
    ComponentPropsWithoutRef<C> &
      RecipeVariantProps &
      RefAttributes<ComponentRef<C>>
  > {
    const Comp = forwardRef((props: any, ref: any) => {
      const [variantProps, rest] = splitVariantProps(props, recipe.variantKeys)
      const slots = recipe(variantProps) as Record<Slot, SlotFn>

      return createElement(
        StyleContext.Provider,
        { value: slots },
        createElement(Component as any, { ref, ...rest }),
      )
    })
    Comp.displayName = getDisplayName(Component)
    return Comp as any
  }

  function withContext<C extends ElementType>(
    Component: C,
    slot: Slot,
  ): ForwardRefExoticComponent<
    ComponentPropsWithoutRef<C> & RefAttributes<ComponentRef<C>>
  > {
    const Comp = forwardRef((props: any, ref: any) => {
      const slots = useContext(StyleContext)

      return createElement(Component as any, {
        ref,
        ...props,
        className: cn(slots[slot as string]?.(), props.className as string),
      })
    })
    Comp.displayName = getDisplayName(Component)
    return Comp as any
  }

  return { withProvider, withRootProvider, withContext }
}
