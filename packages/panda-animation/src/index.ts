import { definePreset } from "@pandacss/dev"
import { keyframes } from "./tokens/keyframes"
export const preset = () =>
  definePreset({
    name: "panda-animation",
    theme: {
      extend: {
        keyframes,
      },
    },
  })
