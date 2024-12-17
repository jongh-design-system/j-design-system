import { checkPandaInit } from "./pre/checkPandaInit"
import { initTemplate } from "./pre/initTemplate"
// import { parseConfig } from "./pre/parseConfig.cjs"
export async function init() {
  const root = await checkPandaInit()
  initTemplate(root)
  // parseConfig()
}
