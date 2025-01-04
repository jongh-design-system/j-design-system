#!/usr/bin/env node

import { getAbsolutePath } from "./utils/config"
import * as p from "@clack/prompts"

const main = async () => {
  try {
    await getAbsolutePath(process.cwd())
  } catch (error) {
    if (error instanceof Error) {
      p.cancel(error.message)
      process.exit(1)
    }
  }
}

main()
