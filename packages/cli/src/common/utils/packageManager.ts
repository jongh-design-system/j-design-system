import { detect } from "package-manager-detector"

export async function getPackageManagerRunner(cwd: string) {
  const pm = await detect({ cwd })
  if (!pm) {
    throw new Error("package manager not found")
  }
  if (pm.name === "pnpm") {
    return "pnpm exec"
  }
  if (pm.name === "bun") {
    return "bunx"
  }
  if (pm.name === "yarn") {
    return "yarn dlx"
  } else {
    return "npx"
  }
}
