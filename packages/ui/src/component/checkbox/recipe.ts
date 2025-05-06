import { sva } from "@styled-system/css"

/**
 * 체크박스 컴포넌트의 스타일 레시피
 */
export const checkboxRecipe = sva({
  slots: [
    "root", // 체크박스 컨테이너
    "icon", // 체크 아이콘/인디케이터
    "indeterminateLine", // indeterminate 상태일 때 보여지는 가로선
  ],
  base: {
    root: {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      borderRadius: "sm",
      border: "input",
      cursor: "pointer",
      _disabled: {
        cursor: "not-allowed",
        opacity: "0.5",
      },
    },
    icon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexShrink: "0",
      color: "primary.foreground",
    },
    indeterminateLine: {
      width: "3",
      height: "0.5",
      bg: "primary.foreground",
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          p: "1",
          width: "4",
          height: "4",
        },
        icon: {
          height: "3.5",
          width: "3.5",
        },
      },
      md: {
        root: {
          p: "1.5",
          width: "5",
          height: "5",
        },
        icon: {
          height: "3",
          width: "3",
        },
      },
    },
    state: {
      unchecked: {
        root: {
          bg: "transparent",
          _hover: {
            borderColor: "primary",
            bg: "layer.active",
          },
        },
      },
      checked: {
        root: {
          borderColor: "primary",
          bg: "primary",
        },
      },
      indeterminate: {
        root: {
          bg: "primary",
        },
        indeterminateLine: {
          display: "block",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    state: "unchecked",
  },
})
