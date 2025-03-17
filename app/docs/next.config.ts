import createMDX from "@next/mdx"
import type { NextConfig } from "next"
const nextConfig: NextConfig = {
  /* config options here */

  pageExtensions: ["js", "md", "mdx", "ts", "tsx"],
}

const withMdx = createMDX({
  options: {
    remarkPlugins: [],
    //@ts-expect-error '''
    rehypePlugins: [["rehype-pretty-code", {}]],
  },
})

export default withMdx(nextConfig)
