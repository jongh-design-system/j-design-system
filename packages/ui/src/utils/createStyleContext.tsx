/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  type ElementType,
  forwardRef,
  type ForwardRefExoticComponent,
  type PropsWithoutRef,
  type RefAttributes,
  useContext,
} from "react"
import { cx } from "styled-system/css"
import { isCssProperty, styled, type StyledComponent } from "styled-system/jsx"

type Props = Record<PropertyKey, any>
type Recipe = {
  (props?: Props): Props
  splitVariantProps: (props: Props) => [Props, Props]
}
type Slot<R extends Recipe> = keyof ReturnType<R>
type Options = { forwardProps?: string[] }

const shouldForwardProp = (
  prop: string,
  variantKeys: string[],
  options: Options = {},
) =>
  options.forwardProps?.includes(prop) ||
  (!variantKeys.includes(prop) && !isCssProperty(prop))

export const createStyleContext = <R extends Recipe>(recipe: R) => {
  const StyleContext = createContext<Record<Slot<R>, string> | null>(null)

  const withRootProvider = <OriginalProps extends Record<string, any>>(
    Component: React.ComponentType<OriginalProps>,
  ): React.ComponentType<OriginalProps> => {
    const StyledComponent: React.ComponentType<OriginalProps> = (props) => {
      const slotStyles = recipe(recipe) as Record<Slot<R>, string>
      return (
        <StyleContext.Provider value={slotStyles}>
          <Component {...props} />
        </StyleContext.Provider>
      )
    }
    return StyledComponent
  }

  const withProvider = <
    T,
    OriginalProps extends Props,
    HasClassName extends boolean = true,
  >(
    Component: ElementType<OriginalProps>,
    slot?: Slot<R>,
    options?: Options,
  ): ForwardRefExoticComponent<
    PropsWithoutRef<
      HasClassName extends true
        ? OriginalProps & { className?: string }
        : OriginalProps
    > &
      RefAttributes<T>
  > => {
    const StyledComponent = styled(
      Component,
      {},
      {
        shouldForwardProp: (prop, variantKeys) =>
          shouldForwardProp(prop, variantKeys, options),
      },
    ) as StyledComponent<ElementType>
    const StyledSlotProvider = forwardRef<
      T,
      HasClassName extends true
        ? OriginalProps & { className?: string }
        : OriginalProps
    >((props, ref) => {
      const [variantProps, otherProps] = recipe.splitVariantProps(props)

      const slotStyles = recipe(variantProps) as Record<Slot<R>, string>

      return (
        <StyleContext.Provider value={slotStyles}>
          <StyledComponent
            {...otherProps}
            ref={ref}
            className={cx(slot && slotStyles?.[slot], props?.className)}
          />
        </StyleContext.Provider>
      )
    })

    StyledSlotProvider.displayName =
      typeof Component === "function"
        ? Component.displayName || Component.name
        : String(Component)

    return StyledSlotProvider
  }

  const withContext = <T, P extends Props>(
    Component: ElementType,
    slot?: Slot<R>,
  ): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> => {
    const StyledComponent = styled(Component)
    const StyledSlotComponent = forwardRef<T, P>((props, ref) => {
      const slotStyles = useContext(StyleContext)

      return (
        <StyledComponent
          {...props}
          ref={ref}
          className={cx(slot && slotStyles?.[slot], props?.className)}
        />
      )
    })

    StyledSlotComponent.displayName =
      typeof Component === "function"
        ? Component.displayName || Component.name
        : String(Component)

    return StyledSlotComponent
  }

  return {
    withRootProvider,
    withProvider,
    withContext,
  }
}
