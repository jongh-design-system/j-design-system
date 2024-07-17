/* eslint-disable @typescript-eslint/no-explicit-any */

export function mergeProps(
  slotProps: Record<string, any>,
  childProps: Record<string, any>,
) {
  const overrideProps = { ...childProps }
  for (const propName in childProps) {
    const [slotPropValue, childPropValue] = [
      slotProps[propName],
      childProps[propName],
    ]
    const isHandler = /^on[A-Z]/.test(propName)
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          //두 핸들러 함수를 받아서 둘다 실행
          childPropValue(...args)
          slotPropValue(...args)
        }
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue
      } //childProps에 있는건 이미 들어가있음
    }
    if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue }
    }
    if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(" ")
    }
  }
  return { ...slotProps, ...overrideProps }
}
