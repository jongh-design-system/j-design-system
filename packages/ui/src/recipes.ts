import { defineRecipe } from "@pandacss/dev"

import { accordionRecipe } from "./component/accordion/style"
import { avatarRecipe } from "./component/avatar/style"
import { badgeRecipe } from "./component/badge/style"
import { buttonRecipe } from "./component/button/style"
import { calendarRecipe } from "./component/calendar/style"
import { centerRecipe } from "./component/center/style"
import { checkboxRecipe } from "./component/checkbox/style"
import { dialogRecipe } from "./component/dialog/style"
import { selectRecipe } from "./component/select/style"
import { sliderRecipe } from "./component/slider/style"
import { tabsRecipe } from "./component/tabs/style"
import { textfieldRecipe } from "./component/textfield/style"
import { layoutRecipeBase } from "./layout"

export const layoutRecipe = defineRecipe({
  className: "layout",
  base: layoutRecipeBase,
})

export const recipes = { buttonRecipe, centerRecipe, layoutRecipe }

export const slotRecipes = {
  accordionRecipe,
  avatarRecipe,
  badgeRecipe,
  calendarRecipe,
  checkboxRecipe,
  dialogRecipe,
  selectRecipe,
  sliderRecipe,
  tabsRecipe,
  textfieldRecipe,
}
