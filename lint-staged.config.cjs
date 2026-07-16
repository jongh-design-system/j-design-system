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
      `pnpm --filter ${name} lint ${filename.join(" ")}`,
      `pnpm --filter ${name} check-type`,
    ],
  }),
  {},
)

module.exports = {
  "*": ["./check-uppercase.sh", "prettier --write --ignore-unknown"],
  ...typeCheckConfigs,
  "./app/docs/**/*.{ts,tsx}": (filename) => [
    `pnpm --filter docs lint ${filename.join(" ")}`,
    `pnpm --filter docs check-type`,
  ],
}
