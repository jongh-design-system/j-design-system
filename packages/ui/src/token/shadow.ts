import { defineSemanticTokens } from "@pandacss/dev"

export const shadowTokens = defineSemanticTokens.shadows({
  s1: {
    value: {
      base: [
        {
          offsetX: "0px",
          offsetY: "1px",
          blur: "4px",
          spread: "0px",
          color: "#00000014",
        },
      ],
      _dark: [
        {
          offsetX: "0px",
          offsetY: "1px",
          blur: "4px",
          spread: "0px",
          color: "#00000080",
        },
      ],
    },
  },
  s2: {
    value: {
      base: [
        {
          offsetX: "0px",
          offsetY: "2px",
          blur: "10px",
          spread: "0px",
          color: "#0000001a",
        },
      ],
      _dark: [
        {
          offsetX: "0px",
          offsetY: "2px",
          blur: "10px",
          spread: "0px",
          color: "#000000ad",
        },
      ],
    },
  },
  s3: {
    description:
      "화면의 다른 요소들보다 가장 높은 계층에 위치할 때 사용됩니다.",
    value: {
      base: [
        {
          offsetX: "0px",
          offsetY: "4px",
          blur: "16px",
          spread: "0px",
          color: "#0000001f",
        },
      ],
      _dark: [
        {
          offsetX: "0px",
          offsetY: "4px",
          blur: "16px",
          spread: "0px",
          color: "#000000cc",
        },
      ],
    },
  },
})
