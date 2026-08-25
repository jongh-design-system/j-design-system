import { defineSemanticTokens } from "@pandacss/dev"

export const gradientTokens = defineSemanticTokens.gradients({
  glow: {
    magic: {
      DEFAULT: {
        description: "반짝이는 것처럼 느껴지는 배경에 쓰이는 ai 컬러입니다.",
        value: {
          base: {
            type: "linear",
            placement: "88deg",
            stops: ["#fef6f7 0%", "#fef0e7 80%", "#f9f7f5 100%"],
          },
          _dark: {
            type: "linear",
            placement: "88deg",
            stops: ["#2d252d 0%", "#3a312b 80%", "#333232 100%"],
          },
        },
      },
      pressed: {
        description:
          "반짝이는 것처럼 느껴지는 배경에 쓰이는 ai 컬러의 pressed컬러입니다.",
        value: {
          base: {
            type: "linear",
            placement: "88deg",
            stops: ["#fbf0f2 0%", "#ffe8db 80%", "#f5f2ef 100%"],
          },
          _dark: {
            type: "linear",
            placement: "88deg",
            stops: ["#3e333e 0%", "#51453e 80%", "#434242 100%"],
          },
        },
      },
    },
  },
  highlight: {
    magic: {
      DEFAULT: {
        description:
          "아이콘 및 shape 영역에서 AI 기능을 표현할 때 사용하는 컬러입니다.",
        value: {
          base: {
            type: "linear",
            placement: "90deg",
            stops: ["#ff6600 20%", "#d25aca 100%"],
          },
          _dark: {
            type: "linear",
            placement: "90deg",
            stops: ["#ff6600 20%", "#d25aca 100%"],
          },
        },
      },
      pressed: {
        value: {
          base: {
            type: "linear",
            placement: "90deg",
            stops: ["#e14f00 20%", "#ae58bf 100%"],
          },
          _dark: {
            type: "linear",
            placement: "90deg",
            stops: ["#ff9e65 20%", "#e89bee 100%"],
          },
        },
      },
    },
  },
  shimmer: {
    magic: {
      description: "Skeleton AI shimmer",
      value: {
        base: {
          type: "linear",
          placement: "90deg",
          stops: [
            "#fff9f500 0%",
            "#fff9f5cc 46%",
            "#fff9f5cc 54%",
            "#fff9f500 100%",
          ],
        },
        _dark: {
          type: "linear",
          placement: "90deg",
          stops: [
            "#fff9f500 0%",
            "#fff9f51a 46%",
            "#fff9f51a 54%",
            "#fff9f500 100%",
          ],
        },
      },
    },
    neutral: {
      description: "Skeleton shimmer",
      value: {
        base: {
          type: "linear",
          placement: "90deg",
          stops: [
            "#ffffff00 0%",
            "#ffffffab 46%",
            "#ffffffab 54%",
            "#ffffff00 100%",
          ],
        },
        _dark: {
          type: "linear",
          placement: "90deg",
          stops: [
            "#ffffff00 0%",
            "#ffffff1a 46%",
            "#ffffff1a 54%",
            "#ffffff00 100%",
          ],
        },
      },
    },
  },
})
