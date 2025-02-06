const MODULES = [
  { name: "docs", parent: "app" },
  { name: "ui", parent: "packages" },
  { name: "cli", parent: "packages" },
  { name: "panda-animation", parent: "packages" },
]

const typeCheckConfigs = MODULES.reduce(
  (prev, { name, parent }) => ({
    ...prev,
    [`./${parent}/${name}/**/*.{ts,tsx}`]: () =>
      `pnpm run --filter ${name} check-type`,
  }),
  {},
)

module.exports = {
  "*": "./check-uppercase.sh",
  "*.{ts,tsx}": "eslint --cache",
  "*.{ts,tsx,css,md}": "prettier --write",
  ...typeCheckConfigs,
}
