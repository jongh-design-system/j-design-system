import { checkPandaInit } from "./pre/checkPandaInit"
import { initTemplate } from "./pre/initTemplate"
export async function init() {
  const root = await checkPandaInit()
  initTemplate(root)
}
