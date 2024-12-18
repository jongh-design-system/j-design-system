import fs from "fs-extra"
import path from "path"
import { packageDirectory } from "pkg-dir"

const panda = "@pandacss/dev"
const pandaConfig = /^panda\.config\.(ts|js|mjs|cjs)$/

//@pandacs/dev가 설치되어있는지, panda.config 파일이 존재하는지 확인

export async function checkPandaInit() {
  const root = await packageDirectory()
  if (!root) {
    throw new Error("❌")
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(root, "package.json"), "utf-8"),
  )

  const isInstalled =
    Object.keys(pkg.devDependencies).includes(panda) ||
    Object.keys(pkg.dependencies).includes(panda) //panda가 devDependencies나 dependencies에 있는지 확인

  if (!isInstalled) {
    throw new Error(
      "❌ @pandacss/dev is not installed. Please install it first.",
    )
  }

  const isInitialized = fs.readdirSync(root).filter((f) => pandaConfig.test(f)) //panda.config.ts가 있는지 확인

  if (!isInitialized.length) {
    throw new Error(
      `❌ cannot find ${pandaConfig}. Please run "(npx | pnpm | yarn) panda init --postcss" first.`,
    )
  }

  return root
}
