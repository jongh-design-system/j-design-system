const MODULES = [
  // { name: "docs", parent: "app" },
  { name: "ui", parent: "packages" },
  { name: "cli", parent: "packages" },
  { name: "panda-animation", parent: "packages" },
]

const typeCheckConfigs = MODULES.reduce(
  (prev, { name, parent }) => ({
    ...prev,
    [`./${parent}/${name}/**/*.{ts,tsx}`]: (filename) => [
      `pnpm --filter ${name} lint ${filename}`,
      `pnpm --filter ${name} check-type`,
    ],
  }),
  {},
)

module.exports = {
  "*": (filename) => `echo ${filename}`,
  "*": "./check-uppercase.sh",
  "*.{ts,tsx,css,md}": "prettier --write",
  ...typeCheckConfigs,
  "./app/docs/**/*.{ts,tsx}": (filename) => [
    `pnpm --filter docs lint --file ${filename}`,
    `pnpm --filter docs check-type`,
  ],
}
