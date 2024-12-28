import { styled, type HTMLStyledProps } from "@styled-system/jsx"
import { button } from "@styled-system/recipes"
import { Button as BaseButton } from "./Button"

export const Button = styled(BaseButton, button)
export type ButtonProps = HTMLStyledProps<typeof Button>
