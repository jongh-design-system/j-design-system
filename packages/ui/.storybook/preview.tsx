import type { Preview } from "@storybook/react"
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
  // decorators: [
  //   (Story) => {
  //     return (
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         {Story()}
  //       </div>
  //     )
  //   },
  // ],
}

export default preview
