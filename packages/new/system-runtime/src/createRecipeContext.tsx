import {
  createContext,
  type ElementType,
  forwardRef,
  type PropsWithoutRef,
  type Ref,
  useContext,
} from "react"

import { cx } from "./cx"

type Recipe<Props extends Record<string, unknown>> = ((
  props?: Props,
) => string) & {
  splitVariantProps: <T extends Record<string, unknown>>(
    props: T,
  ) => [Props, Omit<T, keyof Props>]
}

export function createRecipeContext<Props extends Record<string, unknown>>(
  recipe: Recipe<Props>,
) {
  const PropsContext = createContext<Props | null>(null)

  function useRecipeProps(): Props | null {
    return useContext(PropsContext)
  }

  function withProvider<TElement, TProps extends { className?: string }>(
    Component: ElementType<TProps>,
    options?: { defaultProps?: Partial<TProps> },
  ) {
    const Comp = Component as ElementType

    const StyledComponent = forwardRef(function RecipeProvider(
      props: PropsWithoutRef<TProps>,
      ref: Ref<TElement>,
    ) {
      const mergedProps = {
        ...(options?.defaultProps ?? {}),
        ...props,
      } as PropsWithoutRef<TProps> & Record<string, unknown>
      const [variantProps, otherProps] = recipe.splitVariantProps(mergedProps)
      const className = recipe(variantProps)

      return (
        <PropsContext.Provider value={variantProps}>
          <Comp
            {...otherProps}
            className={cx(className, props.className)}
            ref={ref}
          />
        </PropsContext.Provider>
      )
    })

    return StyledComponent
  }

  function withContext<TElement, TProps extends { className?: string }>(
    Component: ElementType<TProps>,
  ) {
    const Comp = Component as ElementType

    const StyledComponent = forwardRef(function RecipeContextComponent(
      props: PropsWithoutRef<TProps>,
      ref: Ref<TElement>,
    ) {
      const inheritedProps = useRecipeProps()
      const mergedProps = {
        ...(inheritedProps ?? {}),
        ...props,
      } as PropsWithoutRef<TProps> & Record<string, unknown>
      const [variantProps, otherProps] = recipe.splitVariantProps(mergedProps)
      const className = recipe(variantProps)

      return (
        <Comp
          {...otherProps}
          className={cx(className, props.className)}
          ref={ref}
        />
      )
    })

    return StyledComponent
  }

  return {
    withProvider,
    withContext,
    useRecipeProps,
  }
}
