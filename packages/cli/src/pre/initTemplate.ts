import path from "path"
import fs from "fs-extra"
import { template } from "./template"

export function initTemplate(dir: string) {
  try {
    const tokenPath = path.join(dir, "tokens.ts")
    fs.writeFileSync(tokenPath, template)
  } catch (e) {
    throw new Error(`Failed to create tokens.ts file: ${e}`)
  }
}
