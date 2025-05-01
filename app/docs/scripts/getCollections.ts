import fs from "fs"
import path from "path"

import { components, intro } from "#site/content"

function getCollections() {
  // 컴포넌트 목록 가져오기
  const componentItems = components.map((component) => ({
    title: component.title.charAt(0).toUpperCase() + component.title.slice(1),
    slug: component.slug,
    permalink: component.permalink,
  }))

  // 소개 목록 가져오기
  const introItems = intro.map((item) => ({
    title: item.slug.charAt(0).toUpperCase() + item.slug.slice(1),
    slug: item.slug,
    permalink: item.permalink,
  }))

  // 사이드바 데이터 생성
  const sidebarData = {
    intro: {
      title: "Introduction",
      items: introItems,
    },
    components: {
      title: "Components",
      items: componentItems,
    },
  }

  // aside 컴포넌트 경로에 json 파일 생성
  const outputPath = path.join(process.cwd(), "src/components/aside/aside.json")
  fs.writeFileSync(outputPath, JSON.stringify(sidebarData, null, 2), "utf-8")

  console.log(`사이드바 데이터가 생성되었습니다: ${outputPath}`)

  return sidebarData
}

// 실행
getCollections()

export default getCollections
