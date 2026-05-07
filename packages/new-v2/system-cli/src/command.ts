import { Command } from "commander"

import { runCompile } from "./compile.ts"
import { cliOptionsSchema } from "./schema.ts"

export function createCompileCommand() {
  return new Command()
    .name("compile")
    .description("Compile a design system config to CSS files.")
    .option(
      "-c, --cwd <cwd>",
      "current working directory, defaults to process.cwd()",
    )
    .option("--config <path>", "config path")
    .option("--outdir <dir>", "output directory override")
    .option("--target <target>", "compiler target")
    .action(async (rawOptions) => {
      const options = cliOptionsSchema.parse({
        ...rawOptions,
        cwd: rawOptions.cwd ?? process.cwd(),
      })

      await runCompile(options)
    })
}
