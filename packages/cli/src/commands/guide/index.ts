import { Command } from "commander"

import { guideRegistrySchema } from "@/common/types"

const BASE_URL = (
  process.env.JDS_REGISTRY_URL ?? "https://jds-docs.vercel.app"
).replace(/\/$/, "")

export const guideCommand = new Command()
  .name("guide")
  .description("Print component authoring guidance")
  .argument("<component>")
  .action(async (component: string) => {
    const name = component.trim().toLowerCase()

    try {
      const response = await fetch(`${BASE_URL}/guides/${name}.json`)
      if (!response.ok) {
        throw new Error(
          `Failed to fetch guide for ${name}: ${response.status} ${response.statusText}`,
        )
      }

      const guide = guideRegistrySchema.parse(await response.json())
      process.stdout.write(guide.content)
    } catch (error) {
      process.stderr.write(
        `${error instanceof Error ? error.message : String(error)}\n`,
      )
      process.exitCode = 1
    }
  })
