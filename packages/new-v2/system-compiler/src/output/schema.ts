import { z } from "zod"

const declarationSchema = z.object({
  property: z.string(),
  value: z.string(),
})

type CssNodeShape =
  | {
      kind: "rule"
      selector: string
      declarations: Array<z.infer<typeof declarationSchema>>
      children?: CssNodeShape[]
    }
  | {
      kind: "at-rule"
      name: string
      params?: string
      declarations?: Array<z.infer<typeof declarationSchema>>
      children?: CssNodeShape[]
    }

const cssNodeSchema: z.ZodType<CssNodeShape> = z.lazy(() =>
  z.discriminatedUnion("kind", [
    z.object({
      kind: z.literal("rule"),
      selector: z.string(),
      declarations: z.array(declarationSchema),
      children: z.array(cssNodeSchema).optional(),
    }),
    z.object({
      kind: z.literal("at-rule"),
      name: z.string(),
      params: z.string().optional(),
      declarations: z.array(declarationSchema).optional(),
      children: z.array(cssNodeSchema).optional(),
    }),
  ]),
)

export const compileDocumentSchema = z.object({
  layers: z.array(
    z.object({
      name: z.string(),
      blocks: z.array(
        z.discriminatedUnion("kind", [
          z.object({
            kind: z.literal("token"),
            family: z.string(),
            declarations: z.array(declarationSchema),
          }),
          z.object({
            kind: z.literal("tokenMode"),
            mode: z.string().min(1),
            declarations: z.array(declarationSchema),
          }),
          z.object({
            kind: z.literal("css"),
            nodes: z.array(cssNodeSchema),
          }),
          z.object({
            kind: z.literal("keyframes"),
            name: z.string(),
            frames: z.array(
              z.object({
                selector: z.union([
                  z.literal("from"),
                  z.literal("to"),
                  z.string().regex(/^\d+%$/),
                ]),
                declarations: z.array(declarationSchema),
              }),
            ),
          }),
          z.object({
            kind: z.literal("composite"),
            name: z.string(),
            type: z.union([z.literal("textStyle"), z.literal("animation")]),
            declarations: z.array(declarationSchema),
          }),
          z.object({
            kind: z.literal("recipe"),
            name: z.string(),
            nodes: z.array(cssNodeSchema),
          }),
        ]),
      ),
    }),
  ),
})

export type CompileDocument = z.infer<typeof compileDocumentSchema>
export type CompileLayer = CompileDocument["layers"][number]
export type CompileBlock = CompileLayer["blocks"][number]
export type CssDeclaration = z.infer<typeof declarationSchema>
export type CssNode = z.infer<typeof cssNodeSchema>
export type CssRule = Extract<CssNode, { kind: "rule" }>
export type CssAtRule = Extract<CssNode, { kind: "at-rule" }>
