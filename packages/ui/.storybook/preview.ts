import type { Preview, ReactRenderer } from "@storybook/react-vite"
import { withThemeByDataAttribute } from "@storybook/addon-themes"
import "@jongh/new-system-output/styles/reset.css"
import "@jongh/new-system-output/styles/all.css"
import "./index.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
  decorators: [
    withThemeByDataAttribute<ReactRenderer>({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
}

export default preview
