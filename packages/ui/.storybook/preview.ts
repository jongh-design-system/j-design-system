import type { Preview, ReactRenderer } from "@storybook/react-vite"
import { withThemeByDataAttribute } from "@storybook/addon-themes"
import "../src/styles.css"
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
