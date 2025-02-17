import { confirm, spinner } from "@clack/prompts"
import { Command } from "commander"
import fs from "fs-extra"
import path from "path"
import { packageDirectory } from "pkg-dir"
import { z } from "zod"

import { checkJsonInit, getTsConfigAlias } from "@/common/get-config"
import { getPandacssConfigPath } from "@/common/get-config"
import { resolvePandaConfig } from "@/common/resolve"
import { transformPandaConfig } from "@/common/transform"
import { configSchema, type ConfigType } from "@/common/types"
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

  // const project = new Project()
  // project.addSourceFileAtPath(pandacssConfigPath)
  // const sourceFile = project.getSourceFileOrThrow(pandacssConfigPath)

  // const defineCofigExpression = sourceFile
  //   .getDescendantsOfKind(SyntaxKind.CallExpression)
  //   .filter((v) => v.getExpression().getText() === "defineConfig")[0]

  // const object = defineCofigExpression.getChildrenOfKind(
  //   SyntaxKind.ObjectLiteralExpression,
  // )[0]

  // for (const property of object.getProperties()) {
  //   if (property.getText().startsWith("outdir")) {
  //     return property.getText().split(":")[1].replace(/"/g, "")
  //   }
  // }

  //styled-system은 상대경로가 어떻게 되어있나만 체크하면 됨
  //outdir 속성이 없으면 default로 styled-system으로 지정되어있음 -> 이 경로에 해당하는 tsconfig alias를 찾아야함
  //outdir 속성이 있으면 -> 해당 값의 경로에 해당하는 tsconfig alias를 찾아야함
  //importMap 속성이 있으면 -> 해당 값 그대로 사용
  //string일수도 , object일수도 있음
  //string이면 -> 그대로 사용
  //object면 -> css라는 속성값만 찾아서 사용

  let defaultStyledSystemAlias = "styled-system"

  const { outdir, importMap } = await resolvePandaConfig(pandacssConfigFile) //outdir와 importMap이 있는지

  if (outdir) {
    defaultStyledSystemAlias = outdir //outdir이 있으면 경로는 outdir
  }

  const { baseAlias, styledSystemAlias } = getTsConfigAlias(
    root,
    defaultStyledSystemAlias,
  ) //tsconfig에 접근해서 찾아내기

  if (!baseAlias || !styledSystemAlias) {
    throw new Error("Failed to find tsconfig alias")
  }

  if (importMap) {
    defaultStyledSystemAlias = importMap //importMap이 있으면 그대로 사용
  } else {
    defaultStyledSystemAlias = styledSystemAlias //importMap이 없으면 찾은 값 사용
  }

  const config = {
    utils: `${baseAlias}/utils`,
    components: `${baseAlias}/components`,
    hooks: `${baseAlias}/hooks`,
    styledsystem: defaultStyledSystemAlias,
  } satisfies ConfigType

  configSchema.schema.parse(config)

  const preset = await fetchPreset()

  fs.writeFile(path.join(root, preset.name), JSON.parse(preset.file))

  //modify panda.config.ts
  transformPandaConfig(path.resolve(root, pandacssConfigPath))

  await fs.writeFile(
    path.resolve(root, "components.json"),
    JSON.stringify(config),
    "utf-8",
  )

  return config
}
