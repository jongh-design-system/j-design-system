import { detect, resolveCommand } from "package-manager-detector"
/**
 * 사용하는 패키지 매니저를 감지하고, install 관련 올바른 command를 return
 *
 * ex) npm -> npm install, pnpm -> pnpm add
 *
 * www.npmjs.com/package/package-manager-detector
 */
export async function getPackageManagerCommand(cwd: string, args: string[]) {
  const pm = await detect({ cwd })
  const command = resolveCommand(pm?.agent || "npm", "add", args)
  if (!command) {
    return undefined
  }
  return command
}
