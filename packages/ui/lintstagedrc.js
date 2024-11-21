import { baseConfig } from "../../.lintstagedrc"

export default {
  ...baseConfig,
  "*.md": "prettier --write",
}
