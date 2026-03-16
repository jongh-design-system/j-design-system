import { fileURLToPath } from "node:url"

export const resetCssPath = fileURLToPath(
  new URL("./reset.css", import.meta.url),
)
