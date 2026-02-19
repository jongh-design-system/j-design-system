import plugin from "tailwindcss/plugin"

import { animations, keyframes } from "./keyframes"

export default plugin.withOptions(
  () =>
    ({ addBase }) => {
      for (const [name, steps] of Object.entries(keyframes)) {
        addBase({ [`@keyframes ${name}`]: steps })
      }
    },
  () => ({
    theme: {
      extend: {
        animation: animations,
      },
    },
  }),
)
