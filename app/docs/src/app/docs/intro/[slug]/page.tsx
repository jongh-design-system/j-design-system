import fs from "fs"
import { notFound } from "next/navigation"
import path from "path"

import { MDXContent } from "@/components/mdx-content"
import { intro } from "#site/content"

type Props = {
  params: Promise<{ slug: string }>
}

function getPageBySlug(slug: string) {
  return intro.find((post) => post.slug === slug)
}

export async function generateStaticParams() {
  const contentPath = path.join(process.cwd(), "content/docs/intro")
  const files = fs.readdirSync(contentPath)
  const jsonFiles = files.filter((file) => file.endsWith(".mdx"))

  return jsonFiles.map((file) => ({
    slug: file.replace(".mdx", ""),
  }))
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const post = getPageBySlug(slug)

  if (!post) {
    return notFound()
  }
  return (
    <div>
      <MDXContent code={post?.code}></MDXContent>
    </div>
  )
}
