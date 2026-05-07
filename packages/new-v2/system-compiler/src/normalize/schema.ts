import { z } from "zod"

const styleDeclarationSchema = z.object({
  scope: z.array(
    z.discriminatedUnion("kind", [
      z.object({
        kind: z.literal("selector"),
        value: z.string(),
      }),
      z.object({
        kind: z.literal("atRule"),
        name: z.string(),
        params: z.string().optional(),
      }),
    ]),
  ),
  property: z.string().min(1),
  value: z.union([z.string(), z.number()]),
})

export const compilerSystemSchema = z.object({
  name: z.string().min(1),
  prefix: z.string().min(1),
  tokens: z.object({
    primitive: z.array(
      z.object({
        family: z.string().min(1),
        path: z.string().min(1),
        value: z.string(),
      }),
    ),
    semantic: z.array(
      z.object({
        family: z.string().min(1),
        path: z.string().min(1),
        modes: z
          .record(z.string(), z.string())
          .refine((modes) => Object.keys(modes).length > 0),
      }),
    ),
  }),
  keyframes: z.array(
    z.object({
      name: z.string().min(1),
      frames: z.array(
        z.object({
          selector: z.string().regex(/^(?:from|to|\d+%)$/),
          declarations: z.array(
            z.object({
              property: z.string(),
              value: z.string(),
            }),
          ),
        }),
      ),
    }),
  ),
  composites: z.object({
    textStyles: z.array(
      z.object({
        name: z.string().min(1),
        fontSize: z.string(),
        lineHeight: z.string(),
        fontWeight: z.string(),
        letterSpacing: z.string().optional(),
      }),
    ),
    animations: z.array(
      z.object({
        name: z.string().min(1),
        keyframes: z.string().regex(/^keyframes\..+$/),
        duration: z.string(),
        easing: z.string(),
        delay: z.string().optional(),
        fillMode: z.string().optional(),
        iterationCount: z.union([z.string(), z.number()]).optional(),
        direction: z.string().optional(),
      }),
    ),
  }),
  recipes: z.array(
    z.discriminatedUnion("kind", [
      z.object({
        kind: z.literal("recipe"),
        name: z.string().min(1),
        base: z.array(styleDeclarationSchema),
        variants: z.array(
          z.object({
            name: z.string(),
            value: z.string(),
            style: z.array(styleDeclarationSchema),
          }),
        ),
        compoundVariants: z.array(
          z.object({
            when: z.record(z.string(), z.string()),
            style: z.array(styleDeclarationSchema),
          }),
        ),
        defaultVariants: z.record(z.string(), z.string()),
      }),
      z.object({
        kind: z.literal("slotRecipe"),
        name: z.string().min(1),
        slots: z.array(z.string().min(1)),
        base: z.array(
          z.object({
            slot: z.string(),
            style: z.array(styleDeclarationSchema),
          }),
        ),
        variants: z.array(
          z.object({
            name: z.string(),
            value: z.string(),
            slots: z.array(
              z.object({
                slot: z.string(),
                style: z.array(styleDeclarationSchema),
              }),
            ),
          }),
        ),
        compoundVariants: z.array(
          z.object({
            when: z.record(z.string(), z.string()),
            slots: z.array(
              z.object({
                slot: z.string(),
                style: z.array(styleDeclarationSchema),
              }),
            ),
          }),
        ),
        defaultVariants: z.record(z.string(), z.string()),
      }),
    ]),
  ),
})
