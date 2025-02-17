import { confirm, spinner } from "@clack/prompts"
import { Command } from "commander"
import fs from "fs-extra"
import path from "path"
import { packageDirectory } from "pkg-dir"
import { z } from "zod"

import { checkJsonInit, getBaseAlias, getStyleAlias } from "@/common/get-config"
import { getPandacssConfigPath } from "@/common/get-config"
import { resolvePandaConfig } from "@/common/resolve"
import { transformPandaConfig } from "@/common/transform"
import { configSchema } from "@/common/types"
import { fetchPreset } from "@/common/utils/fetchRegistry"

const initSchema = z.object({
  cwd: z.string(),
})

export const initCommand = new Command()
  .name("init")
  .description("Initialize the project")
  .option(
    "-c, --cwd <cwd>",
    "current working directory, default to process.cwd()",
    process.cwd(),
  )
  .action(async (opts) => {
    const s = spinner()
    s.start("Initializing")
    try {
      const options = initSchema.parse({
        cwd: path.resolve(opts.cwd),
      })
      await init(options)
      s.stop("Initialized")
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
      s.stop("Failed to initialize")
      process.exit(0)
    }
  })

export async function init(options: z.infer<typeof initSchema>) {
  const root = options.cwd || (await packageDirectory()) //뒤에꺼 절대 실행안되고 있음
  if (!root) {
    throw new Error("Failed to find package root")
  }

  const isInitialize = await checkJsonInit(root)
  if (isInitialize) {
    const conf = await confirm({
      message: "you already initialize,are you want to overwrite it?",
    })
    if (!conf) {
      process.exit(1)
    }
  }

  const pandacssConfigPath = await getPandacssConfigPath(root)
  const pandacssConfigFile = await fs.readFile(
    path.join(root, pandacssConfigPath),
    "utf-8",
  )

  let defaultStyledSystemAlias = "styled-system"

  const { outdir, importMap } = await resolvePandaConfig(pandacssConfigFile)
  // outdir은 생성된 파일들이 저장될 디렉토리를 지정하는 옵션이고,
  // importMap은 그 디렉토리를 애플리케이션 코드에서 어떻게 import할지 경로를 매핑하는 역할

  //만약 importMap이 있으면 그 값을 그대로 사용
  if (importMap) {
    defaultStyledSystemAlias = importMap
  } else {
    //존재하지 않을 경우 - outdir || styled-system으로 되어있는 alias를 찾아본 뒤
    defaultStyledSystemAlias =
      getStyleAlias(root, outdir || "styled-system") || "." //없다면 현재 디렉토리의 root경로에 있다고 가정(.)
  }
  if (outdir) {
    defaultStyledSystemAlias = outdir //outdir이 있으면 경로는 outdir
  }

  const baseAlias = getBaseAlias(root)

  const config = configSchema.schema.parse({
    utils: `${baseAlias}/utils`,
    components: `${baseAlias}/components`,
    hooks: `${baseAlias}/hooks`,
    styledsystem: defaultStyledSystemAlias,
  })

  const preset = await fetchPreset()

  fs.writeFile(path.join(root, preset.name), JSON.parse(preset.file))

  transformPandaConfig(path.resolve(root, pandacssConfigPath))

  await fs.writeFile(
    path.resolve(root, "components.json"),
    JSON.stringify(config),
    "utf-8",
  )

  return config
}
