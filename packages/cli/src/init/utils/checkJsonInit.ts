import path from "path"
import fs from "fs-extra"

export async function checkJsonInit(root: string) {
  return await fs.pathExists(path.join(root, "components.json"))
}
