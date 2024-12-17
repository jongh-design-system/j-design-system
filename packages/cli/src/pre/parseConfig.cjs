import * as parser from "@babel/parser"
import traverse from "@babel/traverse"
import generate from "@babel/generator"

import * as t from "@babel/types"
import fs from "fs-extra"
import path from "path"
import { packageDirectorySync } from "pkg-dir"

const required_presets = ["@pandacss/preset-panda"]

export async function parseConfig() {
  const root = packageDirectorySync()
  const config = fs.readFileSync(path.join(root, "panda.config.ts"), "utf-8")

  const ast = parser.parse(config, {
    sourceType: "module",
    plugins: ["typescript"],
  })

  traverse(ast, {
    ObjectExpression(path) {
      if (path.parent.callee && path.parent.callee.name === "defineConfig") {
        const presetsExists = path.node.properties.some(
          (prop) => prop.key.name === "presets",
        )

        if (presetsExists) {
          // presets 속성을 찾아서 새 요소 추가
          path.node.properties.forEach((prop) => {
            if (prop.key.name === "presets") {
              prop.value.elements.push([
                ...required_presets.map((preset) => t.stringLiteral(preset)),
              ])
            }
          })
        } else {
          // presets 속성이 없으면 새로 생성
          path.node.properties.push(
            t.objectProperty(
              t.identifier("presets"),
              t.arrayExpression([t.stringLiteral("@pandacss/preset-base")]),
            ),
          )
        }
      }
    },
  })

  const output = generate(ast, {}, config)
  fs.writeFileSync(path.join(root, "panda.config.ts"), output.code)
}
