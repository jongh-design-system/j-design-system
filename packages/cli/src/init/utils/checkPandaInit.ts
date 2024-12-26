import fs from "fs-extra"
import path from "path"
import { getPandacssConfigFile } from "./directoryUtils"

const panda = "@pandacss/dev"

//@pandacs/dev가 설치되어있는지, panda.config 파일이 존재하는지 확인

export async function checkPandaInit(cwd: string) {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(cwd, "package.json"), "utf-8"),
  )

  const devDeps = pkg?.devDependencies || {}
  const deps = pkg?.dependencies || {}

  const isInstalled =
    Object.keys(devDeps).includes(panda) || Object.keys(deps).includes(panda) //panda가 devDependencies나 dependencies에 있는지 확인

  const pandaConfig = await getPandacssConfigFile(cwd)

  return isInstalled && !!pandaConfig
}
