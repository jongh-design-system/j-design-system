import rehypeShiki from "@shikijs/rehype"
import { defineConfig, s } from "velite"

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.

export default defineConfig({
  collections: {
    posts: {
      name: "Docs", // collection type name
      pattern: "docs/*.mdx", // content files glob pattern
      schema: s
        .object({
          title: s.string().max(99), // Zod primitive type
          slug: s.slug("posts"), // validate format, unique in posts collection
          code: s.mdx(),
          draft: s.boolean().optional(),
        })
        // more additional fields (computed fields)
        .transform((data) => {
          return { ...data, permalink: `/blog/${data.slug}` }
        }),
    },
  },
  mdx: {
    rehypePlugins: [
      [
        rehypeShiki as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        {
          theme: "one-dark-pro",
        },
      ],
    ],
  },
  prepare: (data) => {
    if (process.env.NODE_ENV === "development") {
      return
    }
    data.posts = data.posts.filter((post) => post.draft === true)
  },
})
