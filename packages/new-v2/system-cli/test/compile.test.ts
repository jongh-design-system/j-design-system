import { mkdtemp, readFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"

import { afterAll, beforeAll, describe, expect, test } from "vitest"

import { runCompile } from "../src/compile.ts"
import config from "./fixtures/basic-system.config.ts"

let outdir: string

beforeAll(async () => {
  outdir = await mkdtemp(path.join(tmpdir(), "system-cli-"))
})

afterAll(async () => {
  await rm(outdir, {
    recursive: true,
    force: true,
  })
})

describe("runCompile", () => {
  test("loads a TypeScript system config and writes compiler output files", async () => {
    const result = await runCompile({
      cwd: path.resolve("."),
      config: "test/fixtures/basic-system.config.ts",
      outdir,
    })
    const expectedCssByFile = {
      [config.options.outputFiles.tokens]: `:root {
    --jds-spacing-1: 0.25rem;
    --jds-spacing-2: 0.5rem;
    --jds-radius-md: 0.375rem;
    --jds-shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.08);
    --jds-font-size-body-md: 1rem;
    --jds-font-weight-regular: 400;
    --jds-line-height-body-md: 1.5;
    --jds-letter-spacing-tight: -0.01em;
    --jds-color-slate-50: #f8fafc;
    --jds-color-slate-900: #0f172a;
    --jds-color-surface: var(--jds-color-slate-50);
    --jds-motion-duration-fast: 120ms;
    --jds-motion-easing-standard: ease
}
.dark {
    --jds-color-surface: var(--jds-color-slate-900)
}`,
      [config.options.outputFiles.keyframes]: `@keyframes fadeIn {
    from {
        opacity: 0
    }
    to {
        opacity: 1
    }
}`,
      [config.options.outputFiles.recipes]: `.jds-button {
    animation-name: fadeIn;
    animation-duration: var(--jds-motion-duration-fast);
    animation-timing-function: var(--jds-motion-easing-standard);
    animation-fill-mode: both;
    color: var(--jds-color-surface);
    padding: var(--jds-spacing-1);
    border-radius: var(--jds-radius-md);
    font-size: var(--jds-font-size-body-md);
    line-height: var(--jds-line-height-body-md);
    font-weight: var(--jds-font-weight-regular);
    letter-spacing: var(--jds-letter-spacing-tight)
}
.jds-button:hover {
    color: var(--jds-color-slate-900)
}
.jds-button--size_sm {
    padding: var(--jds-spacing-1)
}
.jds-button--size_md {
    padding: var(--jds-spacing-2)
}
.jds-button--size_md {
    border-radius: var(--jds-radius-md)
}
.jds-tabs__root {
    color: var(--jds-color-surface)
}
.jds-tabs__trigger--tone_solid {
    color: var(--jds-color-slate-900)
}`,
    }
    const expectedWrittenFiles = Object.keys(expectedCssByFile).map((file) =>
      path.join(outdir, file),
    )

    expect(result.files.map((file) => file.path)).toEqual(
      Object.keys(expectedCssByFile),
    )
    expect(result.writtenFiles).toEqual(expectedWrittenFiles)
    await Promise.all(
      result.writtenFiles.map(async (file, index) => {
        await expect(readFile(file, "utf8")).resolves.toBe(
          Object.values(expectedCssByFile)[index],
        )
      }),
    )
  })
})
