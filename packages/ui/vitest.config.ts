import path from "node:path"
import { fileURLToPath } from "node:url"

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import { defineConfig, defineProject, mergeConfig } from "vitest/config"

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

import viteConfig from "./vite.config"

export default defineProject(
  mergeConfig(
    viteConfig,
    defineConfig({
      plugins: [
        storybookTest({
          configDir: path.join(dirname, ".storybook"),
          storybookScript: "pnpm storybook --ci",
        }),
      ],
      test: {
        browser: {
          instances: [
            {
              browser: "chromium",
            },
          ],
          enabled: true,
          provider: "playwright",
          headless: true,
        },
        // Speed up tests and better match how they run in Storybook itself
        // https://vitest.dev/config/#isolate
        // Consider removing this if you have flaky tests
        isolate: false,
        setupFiles: ["./.storybook/vitest.setup.ts"],
      },
    }),
  ),
)
