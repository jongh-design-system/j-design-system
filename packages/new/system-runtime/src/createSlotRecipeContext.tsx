import {
  createContext,
  type ElementType,
  forwardRef,
  type PropsWithoutRef,
  type Ref,
  useContext,
} from "react"

import { cx } from "./cx"

type SlotRecipe<
  Props extends Record<string, unknown>,
  Slots extends string,
> = ((props?: Props) => Partial<Record<Slots, string>>) & {
  splitVariantProps: <T extends Record<string, unknown>>(
    props: T,
  ) => [Props, Omit<T, keyof Props>]
}

export function createSlotRecipeContext<
  Props extends Record<string, unknown>,
  Slots extends string,
>(recipe: SlotRecipe<Props, Slots>) {
  const ClassNamesContext = createContext<Partial<
    Record<Slots, string>
  > | null>(null)
  const PropsContext = createContext<Props | null>(null)

  function useSlotClasses(): Partial<Record<Slots, string>> {
    const context = useContext(ClassNamesContext)
    if (!context) {
      throw new Error("Slot recipe context is missing")
    }

    return context
  }

  function useRecipeProps(): Props | null {
    return useContext(PropsContext)
  }

  function withProvider<TElement, TProps extends { className?: string }>(
    Component: ElementType<TProps>,
    slot: Slots,
    options?: { defaultProps?: Partial<TProps> },
  ) {
    const Comp = Component as ElementType

    const StyledComponent = forwardRef(function SlotRecipeProvider(
      props: PropsWithoutRef<TProps>,
      ref: Ref<TElement>,
    ) {
      const mergedProps = {
        ...(options?.defaultProps ?? {}),
        ...props,
      } as PropsWithoutRef<TProps> & Record<string, unknown>
      const [variantProps, otherProps] = recipe.splitVariantProps(mergedProps)
      const classNames = recipe(variantProps)

      return (
        <PropsContext.Provider value={variantProps}>
          <ClassNamesContext.Provider value={classNames}>
            <Comp
              {...otherProps}
              className={cx(classNames[slot], props.className)}
              ref={ref}
            />
          </ClassNamesContext.Provider>
        </PropsContext.Provider>
      )
    })

    return StyledComponent
  }

  function withRootProvider<TProps>(
    Component: ElementType<TProps>,
    options?: { defaultProps?: Partial<TProps> },
  ) {
    const Comp = Component as ElementType

    return function SlotRecipeRoot(props: TProps) {
      const mergedProps = {
        ...(options?.defaultProps ?? {}),
        ...props,
      } as TProps & Record<string, unknown>
      const [variantProps, otherProps] = recipe.splitVariantProps(mergedProps)
      const classNames = recipe(variantProps)

      return (
        <PropsContext.Provider value={variantProps}>
          <ClassNamesContext.Provider value={classNames}>
            <Comp {...otherProps} />
          </ClassNamesContext.Provider>
        </PropsContext.Provider>
      )
    }
  }

  function withContext<TElement, TProps extends { className?: string }>(
    Component: ElementType<TProps>,
    slot: Slots,
  ) {
    const Comp = Component as ElementType

    const StyledComponent = forwardRef(function SlotRecipeContextComponent(
      props: PropsWithoutRef<TProps>,
      ref: Ref<TElement>,
    ) {
      const classNames = useSlotClasses()
      return (
        <Comp
          {...props}
          className={cx(classNames[slot], props.className)}
          ref={ref}
        />
      )
    })

    return StyledComponent
  }

  return {
    withProvider,
    withRootProvider,
    withContext,
    useSlotClasses,
    useRecipeProps,
  }
}
