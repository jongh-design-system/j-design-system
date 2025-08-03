import {
  BLEND_MODE_TO_CSS,
  COUNTER_AXIS_ALIGN_TO_ALIGN_ITEMS,
  figmaColorToCSS,
  figmaValueToPixels,
  FONT_WEIGHT_TO_CSS,
  LAYOUT_ALIGN_TO_ALIGN_SELF,
  LAYOUT_MODE_TO_FLEX_DIRECTION,
  PRIMARY_AXIS_ALIGN_TO_JUSTIFY_CONTENT,
  safeMapValue,
  TEXT_ALIGN_HORIZONTAL_TO_CSS,
  TEXT_CASE_TO_CSS,
  TEXT_DECORATION_TO_CSS,
} from "./map"

// =============================================================================
// 공통 스타일 변환 유틸리티
// =============================================================================

/** Figma 노드의 공통 스타일을 CSS로 변환 */
const convertCommonStyles = (node: SceneNode) => {
  const styles: Record<string, any> = {}

  // 기본 크기
  styles.width = figmaValueToPixels(node.width)
  styles.height = figmaValueToPixels(node.height)

  // 위치 처리 - 부모의 레이아웃 모드에 따라 결정
  const parent = node.parent
  if (parent) {
    // 페이지 직속 자식은 위치값 무시 (캔버스 좌표)
    if (parent.type === "PAGE") {
      styles.position = "relative"
    }
    // Auto Layout 부모의 자식은 위치값 무시 (flexbox가 배치)
    else if ("layoutMode" in parent && parent.layoutMode !== "NONE") {
      // flexbox 자식은 위치값 불필요
    }
    // 절대 위치 레이아웃의 자식은 위치값 사용
    else {
      styles.position = "absolute"
      styles.left = figmaValueToPixels(node.x)
      styles.top = figmaValueToPixels(node.y)
    }
  }

  // 투명도
  if ("opacity" in node && node.opacity < 1) {
    styles.opacity = node.opacity
  }

  // 회전
  if ("rotation" in node && node.rotation !== 0) {
    styles.transform = `rotate(${node.rotation}deg)`
  }

  // 가시성
  if (!node.visible) {
    styles.display = "none"
  }

  // 블렌드 모드
  if ("blendMode" in node && node.blendMode !== "PASS_THROUGH") {
    styles.mixBlendMode = safeMapValue(
      BLEND_MODE_TO_CSS,
      node.blendMode,
      "normal",
    )
  }

  return styles
}

/** Auto Layout 스타일 변환 */
const convertAutoLayoutStyles = (
  node: FrameNode | InstanceNode | ComponentNode,
) => {
  const styles: Record<string, any> = {}

  if (node.layoutMode !== "NONE") {
    styles.display = "flex"
    styles.flexDirection = LAYOUT_MODE_TO_FLEX_DIRECTION[node.layoutMode]
    styles.justifyContent =
      PRIMARY_AXIS_ALIGN_TO_JUSTIFY_CONTENT[node.primaryAxisAlignItems]
    styles.alignItems =
      COUNTER_AXIS_ALIGN_TO_ALIGN_ITEMS[node.counterAxisAlignItems]

    // 패딩 처리 (스마트 축약)
    const { paddingTop, paddingRight, paddingBottom, paddingLeft } = node
    if (
      paddingTop === paddingRight &&
      paddingTop === paddingBottom &&
      paddingTop === paddingLeft
    ) {
      if (paddingTop > 0) {
        styles.padding = figmaValueToPixels(paddingTop)
      }
    } else if (paddingTop === paddingBottom && paddingLeft === paddingRight) {
      styles.padding = `${figmaValueToPixels(paddingTop)} ${figmaValueToPixels(paddingLeft)}`
    } else {
      styles.padding = `${figmaValueToPixels(paddingTop)} ${figmaValueToPixels(paddingRight)} ${figmaValueToPixels(paddingBottom)} ${figmaValueToPixels(paddingLeft)}`
    }

    // 간격
    if (
      node.itemSpacing > 0 &&
      node.primaryAxisAlignItems !== "SPACE_BETWEEN"
    ) {
      styles.gap = figmaValueToPixels(node.itemSpacing)
    }

    // 레이아웃 래핑
    if ("layoutWrap" in node && node.layoutWrap === "WRAP") {
      styles.flexWrap = "wrap"
    }

    // Primary/Counter Axis Sizing Mode
    if (
      "primaryAxisSizingMode" in node &&
      node.primaryAxisSizingMode === "AUTO"
    ) {
      if (node.layoutMode === "HORIZONTAL") {
        styles.width = "auto"
      } else {
        styles.height = "auto"
      }
    }

    if (
      "counterAxisSizingMode" in node &&
      node.counterAxisSizingMode === "AUTO"
    ) {
      if (node.layoutMode === "HORIZONTAL") {
        styles.height = "auto"
      } else {
        styles.width = "auto"
      }
    }
  }

  return styles
}

/** Layout 관련 스타일 변환 (Auto Layout이 아닌 경우에도 적용) */
const convertLayoutStyles = (node: SceneNode) => {
  const styles: Record<string, any> = {}

  // Layout Align (자식 요소의 정렬)
  if ("layoutAlign" in node && node.layoutAlign !== "INHERIT") {
    styles.alignSelf = LAYOUT_ALIGN_TO_ALIGN_SELF[node.layoutAlign]
  }

  // Layout Grow (flexbox grow)
  if ("layoutGrow" in node && node.layoutGrow > 0) {
    styles.flex = node.layoutGrow.toString()
  }

  // Layout Sizing (반응형 크기)
  if ("layoutSizingHorizontal" in node) {
    switch (node.layoutSizingHorizontal) {
      case "FILL":
        styles.width = "100%"
        break
      case "HUG":
        styles.width = "auto"
        break
      // FIXED는 기본값이므로 그대로 둠
    }
  }

  if ("layoutSizingVertical" in node) {
    switch (node.layoutSizingVertical) {
      case "FILL":
        styles.height = "100%"
        break
      case "HUG":
        styles.height = "auto"
        break
      // FIXED는 기본값이므로 그대로 둠
    }
  }

  return styles
}

/** 텍스트 스타일 변환 */
const convertTextStyles = (node: TextNode) => {
  const styles: Record<string, any> = {}

  // 폰트 관련
  if (typeof node.fontSize === "number") {
    styles.fontSize = figmaValueToPixels(node.fontSize)
  }

  if ("fontName" in node && typeof node.fontName === "object") {
    styles.fontFamily = node.fontName.family
  }

  if (typeof node.fontWeight === "number") {
    styles.fontWeight =
      FONT_WEIGHT_TO_CSS[node.fontWeight] || node.fontWeight.toString()
  }

  // 텍스트 정렬
  styles.textAlign = TEXT_ALIGN_HORIZONTAL_TO_CSS[node.textAlignHorizontal]
  styles.verticalAlign = safeMapValue(
    { TOP: "top", CENTER: "middle", BOTTOM: "bottom" },
    node.textAlignVertical,
    "top",
  )

  // 텍스트 장식
  if ("textDecoration" in node && node.textDecoration !== "NONE") {
    styles.textDecoration = TEXT_DECORATION_TO_CSS[node.textDecoration]
  }

  // 텍스트 케이스
  if ("textCase" in node && node.textCase !== "ORIGINAL") {
    styles.textTransform = TEXT_CASE_TO_CSS[node.textCase]
  }

  // 자간
  if (
    "letterSpacing" in node &&
    typeof node.letterSpacing === "object" &&
    node.letterSpacing.value !== 0
  ) {
    styles.letterSpacing =
      node.letterSpacing.unit === "PIXELS"
        ? figmaValueToPixels(node.letterSpacing.value)
        : `${node.letterSpacing.value}%`
  }

  // 행간
  if ("lineHeight" in node && typeof node.lineHeight === "object") {
    if (node.lineHeight.unit === "AUTO") {
      styles.lineHeight = "auto"
    } else {
      styles.lineHeight =
        node.lineHeight.unit === "PIXELS"
          ? figmaValueToPixels(node.lineHeight.value)
          : `${node.lineHeight.value}%`
    }
  }

  return styles
}

/** 배경 및 테두리 스타일 변환 */
const convertFillAndStrokeStyles = (node: any) => {
  const styles: Record<string, any> = {}

  // 배경 (fills)
  if (node.fills && Array.isArray(node.fills) && node.fills.length > 0) {
    const fill = node.fills[0]
    if (fill.type === "SOLID") {
      styles.backgroundColor = figmaColorToCSS(fill.color, fill.opacity)
    }
  }

  // 테두리 (strokes)
  if (node.strokes && Array.isArray(node.strokes) && node.strokes.length > 0) {
    const stroke = node.strokes[0]
    if (stroke.type === "SOLID") {
      const width =
        "strokeWeight" in node ? figmaValueToPixels(node.strokeWeight) : "1px"
      const color = figmaColorToCSS(stroke.color, stroke.opacity)
      styles.border = `${width} solid ${color}`
    }
  }

  // 모서리 반경
  if ("cornerRadius" in node && node.cornerRadius) {
    if (typeof node.cornerRadius === "number") {
      styles.borderRadius = figmaValueToPixels(node.cornerRadius)
    } else {
      // 개별 모서리 반경
      const {
        topLeftRadius,
        topRightRadius,
        bottomRightRadius,
        bottomLeftRadius,
      } = node
      styles.borderRadius = `${figmaValueToPixels(topLeftRadius)} ${figmaValueToPixels(topRightRadius)} ${figmaValueToPixels(bottomRightRadius)} ${figmaValueToPixels(bottomLeftRadius)}`
    }
  }

  return styles
}

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

const resolveStyleWithVariables = async (
  style: any,
  boundVariables: SceneNodeMixin["boundVariables"],
): Promise<any> => {
  if (!boundVariables) return style

  const resolvedStyle = { ...style }
  const variableMap = await extractVariable(boundVariables)

  if (variableMap.fills && variableMap.fills.length > 0) {
    resolvedStyle.fills = variableMap.fills
  }

  if (variableMap.strokes && variableMap.strokes.length > 0) {
    resolvedStyle.strokes = variableMap.strokes
  }

  return resolvedStyle
}

// =============================================================================
// 통합된 스타일 변환 함수
// =============================================================================

/** 모든 스타일을 통합하여 변환 */
const convertNodeStyles = async (node: SceneNode) => {
  let styles: Record<string, any> = {}

  // 1. 공통 스타일 적용
  styles = { ...styles, ...convertCommonStyles(node) }

  // 2. Layout 관련 스타일 적용 (모든 노드에 적용)
  styles = { ...styles, ...convertLayoutStyles(node) }

  // 3. 노드 타입별 스타일 적용
  if (
    node.type === "FRAME" ||
    node.type === "INSTANCE" ||
    node.type === "COMPONENT"
  ) {
    styles = { ...styles, ...convertAutoLayoutStyles(node as FrameNode) }
    styles = { ...styles, ...convertFillAndStrokeStyles(node) }
  }

  if (node.type === "TEXT") {
    styles = { ...styles, ...convertTextStyles(node as TextNode) }
    styles = { ...styles, ...convertFillAndStrokeStyles(node) }

    // 🔥 텍스트 특화 레이아웃 속성들
    const textNode = node as TextNode

    // Text Auto Resize
    if ("textAutoResize" in textNode) {
      switch (textNode.textAutoResize) {
        case "WIDTH_AND_HEIGHT":
          styles.width = "auto"
          styles.height = "auto"
          break
        case "HEIGHT":
          styles.height = "auto"
          break
        case "TRUNCATE":
          styles.overflow = "hidden"
          styles.textOverflow = "ellipsis"
          styles.whiteSpace = "nowrap"
          break
      }
    }

    // Max Lines (for text truncation)
    if ("maxLines" in textNode && textNode.maxLines && textNode.maxLines > 1) {
      styles.display = "-webkit-box"
      styles.WebkitBoxOrient = "vertical"
      styles.WebkitLineClamp = textNode.maxLines.toString()
      styles.overflow = "hidden"
    }
  }

  if (node.type === "RECTANGLE") {
    styles = { ...styles, ...convertFillAndStrokeStyles(node) }
  }

  const resolvedStyles = await resolveStyleWithVariables(
    styles,
    node.boundVariables,
  )

  return resolvedStyles
}

export const instanceNodeToReactNode = async (
  figmaNode: InstanceNode,
): Promise<any> => {
  const convertedStyles = await convertNodeStyles(figmaNode)
  const css = await figmaNode.getCSSAsync()

  return {
    type: figmaNode.name[0].toUpperCase() + figmaNode.name.slice(1),
    props: {
      ...extractProps(figmaNode.componentProperties),
      id: figmaNode.id,
      name: figmaNode.name,
      style: convertedStyles,
      css,
    },
    boundVariables: figmaNode.boundVariables,
    children: figmaNode.children || [],
  }
}

export const textNodeToReactNode = async (
  figmaNode: TextNode,
): Promise<any> => {
  const convertedStyles = await convertNodeStyles(figmaNode)
  const css = await figmaNode.getCSSAsync()

  return {
    type: "Text",
    props: {
      id: figmaNode.id,
      name: figmaNode.name,
      style: convertedStyles,
      css,
    },
    children: figmaNode.characters || "",
  }
}

export const rectangleNodeToReactNode = async (
  figmaNode: RectangleNode,
): Promise<any> => {
  const convertedStyles = await convertNodeStyles(figmaNode)
  const css = await figmaNode.getCSSAsync()

  return {
    type: "Rectangle",
    props: {
      id: figmaNode.id,
      name: figmaNode.name,
      style: convertedStyles,
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
  const convertedStyles = await convertNodeStyles(figmaNode)
  const css = await figmaNode.getCSSAsync()

  return {
    type: "Frame",
    props: {
      id: figmaNode.id,
      name: figmaNode.name,
      style: convertedStyles,
      boundVariables: figmaNode.boundVariables,
      css,
    },
    children: figmaNode.children || [],
  }
}
