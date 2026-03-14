import { accordionRecipe } from "./accordion.ts"
import { avatarRecipe } from "./avatar.ts"
import { buttonRecipe } from "./button.ts"
import { calendarRecipe } from "./calendar.ts"
import { checkboxRecipe } from "./checkbox.ts"
import { chipRecipe } from "./chip.ts"
import { dialogRecipe } from "./dialog.ts"
import { selectRecipe } from "./select.ts"
import { sliderRecipe } from "./slider.ts"
import { tabsRecipe } from "./tabs.ts"
import { textfieldRecipe } from "./textfield.ts"
import { toastRecipe } from "./toast.ts"

export const recipes = {
  accordion: accordionRecipe,
  avatar: avatarRecipe,
  button: buttonRecipe,
  calendar: calendarRecipe,
  checkbox: checkboxRecipe,
  chip: chipRecipe,
  dialog: dialogRecipe,
  select: selectRecipe,
  slider: sliderRecipe,
  tabs: tabsRecipe,
  textfield: textfieldRecipe,
  toast: toastRecipe,
} as const
