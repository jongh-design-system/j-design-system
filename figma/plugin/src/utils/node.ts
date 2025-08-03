const extractProps = (props: ComponentProperties) => {
  return Object.entries(
    Object.entries(props).map(([key, obj]) => [key, obj.value]),
  )
}

const extractVariable = async (
  variableAlias: SceneNodeMixin["boundVariables"],
): Promise<Record<string, string[]>> => {
  const result: Record<string, string[]> = {}

  if (!variableAlias) {
    return result
  }

  for (const key of Object.keys(variableAlias)) {
    const list = variableAlias[key]
    if (Array.isArray(list)) {
      result[key] = []
      for (const alias of list) {
        if (alias && alias.id) {
          try {
            const variable: Variable =
              await figma.variables.getVariableByIdAsync(alias.id)
            result[key].push(variable.codeSyntax.WEB)
          } catch (error) {
            console.error("Variable resolution failed:", error)
          }
        }
      }
    }
  }

  return result
}

// 스타일 속성에서 변수가 바인딩된 경우 -> codeSyntax.WEB 값으로 대체
const resolveStyleWithVariables = async (
  style: any,
  boundVariables: SceneNodeMixin["boundVariables"],
): Promise<any> => {
  if (!boundVariables) return style

  const resolvedStyle = { ...style }
  const variableMap = await extractVariable(boundVariables)

  // fills 처리
  if (variableMap.fills && variableMap.fills.length > 0) {
    resolvedStyle.fills = variableMap.fills
  }

  // strokes 처리
  if (variableMap.strokes && variableMap.strokes.length > 0) {
    resolvedStyle.strokes = variableMap.strokes
  }

  return resolvedStyle
}

export const instanceNodeToReactNode = async (
  figmaNode: InstanceNode,
): Promise<any> => {
  const baseStyle = {
    // 기존 속성
    x: figmaNode.x,
    y: figmaNode.y,
    width: figmaNode.width,
    height: figmaNode.height,
    layoutAlign: figmaNode.layoutAlign,
    layoutGrow: figmaNode.layoutGrow,
    layoutSizingHorizontal: figmaNode.layoutSizingHorizontal,
    layoutSizingVertical: figmaNode.layoutSizingVertical,

    // 코드 변환에 필수인 누락된 속성들

    // 스타일링 - CSS 생성에 필수
    fills: figmaNode.fills,
    strokes: figmaNode.strokes,
    cornerRadius: figmaNode.cornerRadius,
    opacity: figmaNode.opacity,

    // 자동 레이아웃 - Flexbox/Grid 변환에 필수
    layoutMode: figmaNode.layoutMode,
    primaryAxisAlignItems: figmaNode.primaryAxisAlignItems,
    counterAxisAlignItems: figmaNode.counterAxisAlignItems,
    primaryAxisSizingMode: figmaNode.primaryAxisSizingMode,
    counterAxisSizingMode: figmaNode.counterAxisSizingMode,
    itemSpacing: figmaNode.itemSpacing,

    // 패딩 - CSS padding 변환에 필수
    paddingLeft: figmaNode.paddingLeft,
    paddingRight: figmaNode.paddingRight,
    paddingTop: figmaNode.paddingTop,
    paddingBottom: figmaNode.paddingBottom,

    // 컴포넌트 정보 - React 컴포넌트 생성에 필요
    componentProperties: figmaNode.componentProperties,

    // 변수 바인딩 - CSS 변수/토큰 변환에 필요
    boundVariables: figmaNode.boundVariables,

    // 가시성 - 조건부 렌더링에 필요
    visible: figmaNode.visible,

    // 클리핑 - CSS overflow 변환에 필요
    clipsContent: figmaNode.clipsContent,
  }

  const resolvedStyle = await resolveStyleWithVariables(
    baseStyle,
    figmaNode.boundVariables,
  )

  const css = await figmaNode.getCSSAsync()

  return {
    type: figmaNode.name[0].toUpperCase() + figmaNode.name.slice(1),
    props: {
      ...extractProps(figmaNode.componentProperties),
      id: figmaNode.id,
      name: figmaNode.name,
      style: resolvedStyle,
      css,
    },
    boundVariables: figmaNode.boundVariables,
    children: figmaNode.children || [],
  }
}

export const textNodeToReactNode = async (
  figmaNode: TextNode,
): Promise<any> => {
  const baseStyle = {
    x: figmaNode.x,
    y: figmaNode.y,
    width: figmaNode.width,
    height: figmaNode.height,
    fontSize: figmaNode.fontSize,
    fontWeight: figmaNode.fontWeight,
    textAlign: figmaNode.textAlignHorizontal,
    fills: figmaNode.fills,
    fillStyleId: figmaNode.fillStyleId,
    layoutAlign: figmaNode.layoutAlign,
    layoutGrow: figmaNode.layoutGrow,
    layoutSizingHorizontal: figmaNode.layoutSizingHorizontal,
    layoutSizingVertical: figmaNode.layoutSizingVertical,
  }

  const resolvedStyle = await resolveStyleWithVariables(
    baseStyle,
    figmaNode.boundVariables,
  )

  const css = await figmaNode.getCSSAsync()

  return {
    type: "Text",
    props: {
      id: figmaNode.id,
      name: figmaNode.name,
      style: resolvedStyle,
      css,
    },
    children: figmaNode.characters || "",
  }
}

export const rectangleNodeToReactNode = async (
  figmaNode: RectangleNode,
): Promise<any> => {
  const baseStyle = {
    x: figmaNode.x,
    y: figmaNode.y,
    width: figmaNode.width,
    height: figmaNode.height,
    fills: figmaNode.fills,
    fillStyleId: figmaNode.fillStyleId,
    strokes: figmaNode.strokes,
    cornerRadius: figmaNode.cornerRadius,
    layoutAlign: figmaNode.layoutAlign,
    layoutGrow: figmaNode.layoutGrow,
    layoutSizingHorizontal: figmaNode.layoutSizingHorizontal,
    layoutSizingVertical: figmaNode.layoutSizingVertical,
  }

  const resolvedStyle = await resolveStyleWithVariables(
    baseStyle,
    figmaNode.boundVariables,
  )

  const css = await figmaNode.getCSSAsync()

  return {
    type: "Rectangle",
    props: {
      id: figmaNode.id,
      name: figmaNode.name,
      style: resolvedStyle,
      css,
    },
  }
}

export const groupNodeToReactNode = async (
  figmaNode: GroupNode,
): Promise<any> => {
  return {
    type: "Group",
    props: {
      id: figmaNode.id,
      name: figmaNode.name,
    },
    children: figmaNode.children || [],
  }
}

export const frameNodeToReactNode = async (
  figmaNode: FrameNode,
): Promise<any> => {
  const baseStyle = {
    x: figmaNode.x,
    y: figmaNode.y,
    width: figmaNode.width,
    height: figmaNode.height,
    fills: figmaNode.fills,
    strokes: figmaNode.strokes,
    cornerRadius: figmaNode.cornerRadius,
    layoutMode: figmaNode.layoutMode,
    primaryAxisAlignItems: figmaNode.primaryAxisAlignItems,
    counterAxisAlignItems: figmaNode.counterAxisAlignItems,
    primaryAxisSizingMode: figmaNode.primaryAxisSizingMode,
    counterAxisSizingMode: figmaNode.counterAxisSizingMode,
    paddingLeft: figmaNode.paddingLeft,
    paddingRight: figmaNode.paddingRight,
    paddingTop: figmaNode.paddingTop,
    paddingBottom: figmaNode.paddingBottom,
    itemSpacing: figmaNode.itemSpacing,
    layoutAlign: figmaNode.layoutAlign,
    layoutGrow: figmaNode.layoutGrow,
    layoutSizingHorizontal: figmaNode.layoutSizingHorizontal,
    layoutSizingVertical: figmaNode.layoutSizingVertical,
    layoutWrap: figmaNode.layoutWrap,
  }

  const resolvedStyle = await resolveStyleWithVariables(
    baseStyle,
    figmaNode.boundVariables,
  )

  const css = await figmaNode.getCSSAsync()

  return {
    type: "Frame", // div
    props: {
      id: figmaNode.id,
      name: figmaNode.name,
      style: resolvedStyle,
      boundVariables: figmaNode.boundVariables,
      css,
    },
    children: figmaNode.children || [],
  }
}
