import { beforeAll, describe, expect, test } from "vitest"
import fs from "fs-extra"
import path from "path"
import { transform } from "../radix-import/transform"
import { Project } from "ts-morph"

describe("radix-import", () => {
  beforeAll(async () => {})

  test("namespace import test", () => {
    const input = fs.readFileSync(
      path.join(__dirname, "./fixture/namespace_input.tsx"),
      "utf-8",
    )
    const output = fs.readFileSync(
      path.join(__dirname, "./fixture/namespace_output.tsx"),
      "utf-8",
    )

    const project = new Project()
    const sourceFile = project.createSourceFile("test.namespace.tsx", input, {
      overwrite: true,
    })

    transform(sourceFile)

    expect(sourceFile.getFullText().replace(/\s+/g, "")).toBe(
      output.replace(/\s+/g, ""),
    )
  })

  test("named import test", () => {
    const input = fs.readFileSync(
      path.join(__dirname, "./fixture/named_input.tsx"),
      "utf-8",
    )
    const output = fs.readFileSync(
      path.join(__dirname, "./fixture/named_output.tsx"),
      "utf-8",
    )

    const project = new Project()
    const sourceFile = project.createSourceFile("test.named.tsx", input, {
      overwrite: true,
    })

    transform(sourceFile)

    expect(sourceFile.getFullText().replace(/\s+/g, "")).toBe(
      output.replace(/\s+/g, ""),
    )
  })

  test("현재 사용하고 있던 컴포넌트명과 변경되어야 할 컴포넌트명이 동일할 경우", () => {
    const input = fs.readFileSync(
      path.join(__dirname, "./fixture/named_input_2.tsx"),
      "utf-8",
    )
    const output = fs.readFileSync(
      path.join(__dirname, "./fixture/named_output_2.tsx"),
      "utf-8",
    )

    const project = new Project()
    const sourceFile = project.createSourceFile("test.named_2.tsx", input, {
      overwrite: true,
    })

    transform(sourceFile)

    expect(sourceFile.getFullText().replace(/\s+/g, "")).toBe(
      output.replace(/\s+/g, ""),
    )
  })
})
