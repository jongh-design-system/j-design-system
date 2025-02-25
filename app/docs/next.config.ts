import createMDX from "@next/mdx"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  pageExtensions: ["js", "md", "mdx", "ts", "tsx"],
}

const withMdx = createMDX({})

export default withMdx(nextConfig)
