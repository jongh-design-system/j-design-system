import { define } from "../../../dev"

export const tabRecipe = define.recipe({
  className: "tab",
  base: {
    display: "flex",
    flexDirection: "row",
  },
  variants: {
    type: {
      underline: {
        borderBottom: "1px solid",
        borderColor: "blue_300",
      },
      pills: {
        border: "none",
      },
    },
  },
})

export const tabItemRecipe = define.recipe({
  className: "tabItem",
  base: {
    _focus: {
      borderBottom: "3px solid",
      borderColor: "blue_300",
    },
  },
})

//indicator를 옮겨버리기?
