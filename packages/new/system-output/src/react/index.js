import { createContext, forwardRef, useContext } from "react"
import { jsx } from "react/jsx-runtime"

import { cx } from "../internal/recipe.js"

export function createRecipeContext(recipe) {
  const PropsContext = createContext(null)

  function useRecipeProps() {
    return useContext(PropsContext)
  }

  function withProvider(Component, options) {
    const Comp = Component

    return forwardRef(function RecipeProvider(props, ref) {
      const mergedProps = {
        ...(options?.defaultProps ?? {}),
        ...props,
      }
      const [variantProps, otherProps] = recipe.splitVariantProps(mergedProps)
      const className = recipe(variantProps)

      return jsx(PropsContext.Provider, {
        value: variantProps,
        children: jsx(Comp, {
          ...otherProps,
          className: cx(className, props.className),
          ref,
        }),
      })
    })
  }

  function withContext(Component) {
    const Comp = Component

    return forwardRef(function RecipeContextComponent(props, ref) {
      const mergedProps = {
        ...(useRecipeProps() ?? {}),
        ...props,
      }
      const [variantProps, otherProps] = recipe.splitVariantProps(mergedProps)
      const className = recipe(variantProps)

      return jsx(Comp, {
        ...otherProps,
        className: cx(className, props.className),
        ref,
      })
    })
  }

  return {
    withProvider,
    withContext,
    useRecipeProps,
  }
}

export function createSlotRecipeContext(recipe) {
  const ClassNamesContext = createContext(null)
  const PropsContext = createContext(null)

  function useSlotClasses() {
    const context = useContext(ClassNamesContext)
    if (!context) {
      throw new Error("Slot recipe context is missing")
    }

    return context
  }

  function useRecipeProps() {
    return useContext(PropsContext)
  }

  function withProvider(Component, slot, options) {
    const Comp = Component

    return forwardRef(function SlotRecipeProvider(props, ref) {
      const mergedProps = {
        ...(options?.defaultProps ?? {}),
        ...props,
      }
      const [variantProps, otherProps] = recipe.splitVariantProps(mergedProps)
      const classNames = recipe(variantProps)

      return jsx(PropsContext.Provider, {
        value: variantProps,
        children: jsx(ClassNamesContext.Provider, {
          value: classNames,
          children: jsx(Comp, {
            ...otherProps,
            className: cx(classNames[slot], props.className),
            ref,
          }),
        }),
      })
    })
  }

  function withRootProvider(Component, options) {
    const Comp = Component

    return function SlotRecipeRoot(props) {
      const mergedProps = {
        ...(options?.defaultProps ?? {}),
        ...props,
      }
      const [variantProps, otherProps] = recipe.splitVariantProps(mergedProps)
      const classNames = recipe(variantProps)

      return jsx(PropsContext.Provider, {
        value: variantProps,
        children: jsx(ClassNamesContext.Provider, {
          value: classNames,
          children: jsx(Comp, {
            ...otherProps,
          }),
        }),
      })
    }
  }

  function withContext(Component, slot) {
    const Comp = Component

    return forwardRef(function SlotRecipeContextComponent(props, ref) {
      const classNames = useSlotClasses()

      return jsx(Comp, {
        ...props,
        className: cx(classNames[slot], props.className),
        ref,
      })
    })
  }

  return {
    withProvider,
    withRootProvider,
    withContext,
    useSlotClasses,
    useRecipeProps,
  }
}

export const createStyleContext = createSlotRecipeContext
export { cx }
