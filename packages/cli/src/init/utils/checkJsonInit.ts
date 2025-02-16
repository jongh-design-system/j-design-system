import fs from "fs-extra"
import path from "path"

export async function checkJsonInit(root: string) {
  return await fs.pathExists(path.join(root, "components.json"))
}
