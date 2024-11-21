export const baseConfig = {
  "**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
}

module.exports = {
  ...baseConfig,
}
