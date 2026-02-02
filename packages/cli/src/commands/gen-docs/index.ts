import path from "node:path"

import chalk from "chalk"
import { Command } from "commander"
import { z } from "zod"

const info = chalk.bold.blue
const error = chalk.bold.red

export const genDocsSchema = z.object({
  cwd: z.string(),
  file: z.string(),
  tsconfig: z.string().default("tsconfig.json"),
})

export const genDocsCommand = new Command()
  .name("genDocs")
  .description("Generate documentation for your design")
  .option(
    "-c, --cwd <cwd>",
    "current working directory, default to process.cwd()",
    process.cwd(),
  )
  .requiredOption("-f, --file <file>", "target source file (tsx) to parse")
  .option(
    "-t, --tsconfig <tsconfig>",
    "tsconfig path relative to cwd",
    "tsconfig.json",
  )
  .action(async (opts) => {
    try {
      const options = genDocsSchema.parse({
        cwd: path.resolve(opts.cwd),
        file: opts.file,
        tsconfig: opts.tsconfig,
      })

      await genDocs(options)
    } catch (e) {
      console.log(error("failed to run genDocs"))
      if (e instanceof z.ZodError) {
        console.log(error(e.message))
      }
      if (e instanceof Error) {
        console.log(error(e.message))
      }
      process.exit(1)
    }
  })

export async function genDocs(options: z.infer<typeof genDocsSchema>) {
  console.log(info(`generating docs from ${options.cwd}`))
}
