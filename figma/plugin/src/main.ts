// Read the docs https://plugma.dev/docs
import { readMyDesignWithCSS } from "./utils/readDesign"

// WebSocket 상태 관리
const state = {
  serverPort: 3055,
  connected: false,
  socket: null as any,
  pendingRequests: new Map(),
  channel: null as string | null,
}

export default function () {
  figma.showUI(__html__, { width: 300, height: 260, themeColors: true })

  // UI로부터 메시지 처리
  figma.ui.onmessage = async (msg) => {
    switch (msg.type) {
      case "connect-websocket":
        await connectToServer(msg.port || 3055)
        break
      case "disconnect-websocket":
        disconnectFromServer()
        break
      case "execute-command":
        // MCP 서버로부터의 명령 실행
        try {
          const result = await handleCommand(msg.command, msg.params)
          figma.ui.postMessage({
            type: "command-result",
            id: msg.id,
            result,
          })
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error"
          figma.ui.postMessage({
            type: "command-error",
            id: msg.id,
            error: errorMessage,
          })
        }
        break
    }
  }

  // 선택된 노드가 변경될 때마다 디자인 정보를 읽어서 UI로 전송
  async function handleSelectionChange() {
    try {
      const selectedNodes = figma.currentPage.selection
      const designData = await readMyDesignWithCSS(selectedNodes)

      figma.ui.postMessage({
        type: "DESIGN_DATA",
        data: designData,
      })

      console.log("디자인 데이터:", designData)
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error"
      console.error("디자인 읽기 오류:", errorMessage)

      figma.ui.postMessage({
        type: "ERROR",
        message: errorMessage,
      })
    }
  }

  // WebSocket 서버 연결
  async function connectToServer(port: number) {
    try {
      if (state.connected && state.socket) {
        figma.ui.postMessage({
          type: "connection-status",
          connected: true,
          message: "Already connected to server",
        })
        return
      }

      state.serverPort = port
      // 참고: Figma 플러그인에서는 WebSocket을 직접 사용할 수 없으므로
      // UI에서 WebSocket 연결을 관리해야 합니다.
      figma.ui.postMessage({
        type: "connection-status",
        connected: false,
        message: "WebSocket connection must be handled by UI",
      })
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error"
      figma.ui.postMessage({
        type: "connection-status",
        connected: false,
        message: `Connection error: ${errorMessage}`,
      })
    }
  }

  // WebSocket 연결 해제
  function disconnectFromServer() {
    if (state.socket) {
      state.socket = null
      state.connected = false
      figma.ui.postMessage({
        type: "connection-status",
        connected: false,
        message: "Disconnected from server",
      })
    }
  }

  async function handleCommand(command: string, params: any) {
    switch (command) {
      case "get_document_info":
        return await getDocumentInfo()
      case "get_selection":
        return await getSelection()
      case "get_node_info":
        if (!params?.nodeId) throw new Error("Missing nodeId parameter")
        return await getNodeInfo(params.nodeId)
      default:
        throw new Error(`Unknown command: ${command}`)
    }
  }

  // Figma API 래퍼 함수들
  async function getDocumentInfo() {
    await figma.currentPage.loadAsync()
    const page = figma.currentPage
    return {
      name: page.name,
      id: page.id,
      type: page.type,
      children: page.children.map((node) => ({
        id: node.id,
        name: node.name,
        type: node.type,
      })),
      currentPage: {
        id: page.id,
        name: page.name,
        childCount: page.children.length,
      },
    }
  }

  async function getSelection() {
    const selection = figma.currentPage.selection
    return {
      selectionCount: selection.length,
      selection: selection.map((node) => ({
        id: node.id,
        name: node.name,
        type: node.type,
        visible: node.visible,
      })),
    }
  }

  async function getNodeInfo(nodeId: string) {
    const node = await figma.getNodeByIdAsync(nodeId)
    if (!node) {
      throw new Error(`Node not found with ID: ${nodeId}`)
    }

    // exportAsync를 지원하는 노드인지 확인
    if ("exportAsync" in node) {
      const response = await (node as any).exportAsync({
        format: "JSON_REST_V1",
      })
      return response.document
    } else {
      // exportAsync를 지원하지 않는 노드의 경우 기본 정보 반환
      return {
        id: node.id,
        name: node.name,
        type: node.type,
        ...("visible" in node ? { visible: (node as any).visible } : {}),
      }
    }
  }

  // 노드 선택 변경 이벤트 리스너
  figma.on("selectionchange", handleSelectionChange)

  // 초기 로드 시에도 실행
  handleSelectionChange()
}
