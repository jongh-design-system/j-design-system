import { checkPandaInit } from "./utils/checkPandaInit"
import { initTemplate } from "./utils/initTemplate"
export async function init() {
  const root = await checkPandaInit()
  initTemplate(root)
}
