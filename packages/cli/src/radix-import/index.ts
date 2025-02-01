import { Command } from "commander"
import fg from "fast-glob"
import path from "path"
import { transform } from "./transform"
import { Project } from "ts-morph"
import { intro, log, outro } from "@clack/prompts"
import chalk from "chalk"
export const codemodCommand = new Command()
  .name("radix-ui-import")
  .action(() => {
    intro("find .tsx files...")
    const filePaths = fg.sync("**/*.tsx", {
      ignore: ["**/node_modules/**"],
      dot: false,
    })
    const project = new Project()
    let msg = ""
    filePaths.forEach((filePath) => {
      const sourceFile = project.addSourceFileAtPathIfExists(
        path.join(process.cwd(), filePath),
      )
      if (!sourceFile) {
        return
      }
      try {
        const { packages } = transform(sourceFile)
        msg += packages.join("  ")
        sourceFile.save()
      } catch (e) {
        log.error(`failed to transform ${filePath} ${e}`)
      }
    })
    if (!msg.length) {
      outro("no transform occured")
    } else {
      ;`copy this to delete and install new package\n <your package manager's delete command> ${msg} \n <your package manager's install command> ${chalk.bgGreen("radix-ui")}`
        .split("\n")
        .forEach(log.step)
    }
  })
