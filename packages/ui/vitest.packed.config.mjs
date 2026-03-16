import path from "node:path"
import { fileURLToPath } from "node:url"

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import { defineConfig, mergeConfig } from "vitest/config"

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

import viteConfig from "./vite.config"

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      storybookTest({
        configDir: path.join(dirname, ".storybook"),
        storybookScript: "pnpm storybook --ci",
        tags: {
          include: ["packed"],
        },
      }),
    ],
    test: {
      browser: {
        enabled: true,
        api: {
          host: "127.0.0.1",
          port: 63315,
          strictPort: true,
        },
        instances: [
          {
            browser: "chromium",
          },
        ],
        provider: "playwright",
        headless: true,
      },
      isolate: false,
      setupFiles: ["./.storybook/vitest.setup.ts"],
    },
  }),
)
