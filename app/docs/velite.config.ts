import rehypeShiki from "@shikijs/rehype"
import { defineCollection, defineConfig, s } from "velite"

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.

const components = defineCollection({
  name: "Components", // collection type name
  pattern: "docs/components/*.mdx", // content files glob pattern
  schema: s
    .object({
      title: s.string().max(99), // Zod primitive type
      slug: s.slug("components"), // validate format, unique in posts collection
      code: s.mdx(),
      draft: s.boolean().optional(),
    })
    // more additional fields (computed fields)
    .transform((data) => {
      return { ...data, permalink: `/blog/${data.slug}` }
    }),
})

const intro = defineCollection({
  name: "Intro",
  pattern: "docs/intro/*.mdx",
  schema: s.object({
    code: s.mdx(),
    slug: s.slug("docs"),
  }),
})

export default defineConfig({
  collections: {
    components,
    intro,
  },
  mdx: {
    rehypePlugins: [
      [
        rehypeShiki as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        {
          theme: "vitesse-light",
        },
      ],
    ],
  },
})
