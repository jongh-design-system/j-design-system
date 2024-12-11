module.exports = {
  // 모든 패키지의 파일들에 대한 규칙
  "packages/**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
}
