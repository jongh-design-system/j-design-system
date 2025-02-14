import { defineConfig, mergeConfig } from "vitest/config"
import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin"
// 👇 If you're using Next.js, apply this framework plugin as well
// import { storybookNextJsPlugin } from '@storybook/experimental-nextjs-vite/vite-plugin';

import viteConfig from "./vite.config"

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [storybookTest({})],
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
)
