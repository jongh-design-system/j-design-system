import { existsSync, mkdirSync, readFile, writeFileSync } from "fs"

import { transformTokens } from "token-transformer"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

// 현재 파일의 디렉토리 경로 가져오기
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 추출 대상 파일 경로
const filePath = "./packages/panda-preset/src/tokens/json"
const dir = join(__dirname, filePath)

if (!existsSync(dir)) {
  mkdirSync(dir, { recursive: true })
}
// 변환 옵션
const transformerOptions = {
  expandTypography: true,
}

// 파일 읽기
readFile("tokens.json", "utf8", (err, data) => {
  if (err) throw err
  const tokens = JSON.parse(data)

  // $metadata에 token key가 있음
  const tokenKeys = [...tokens.$metadata.tokenSetOrder]

  tokenKeys.forEach((key) => {
    // 변환 작업
    const resolved = transformTokens(
      tokens, // 변환할 파일
      key === "light" || key === "dark" ? ["core", key] : tokenKeys, // 참조 대상
      [...tokenKeys].filter((k) => k !== key), // 추출 제외 대상
      transformerOptions, // 변환 옵션
    )

    // 파일 생성
    writeFileSync(
      `${filePath}/${key}.json`,
      JSON.stringify(resolved),
      (err) => {
        if (err) throw err
      },
    )
  })
})
