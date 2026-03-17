const MODULES = [
  // { name: "docs", parent: "app" },
  { packageName: "@jongh/ui", path: "./packages/ui" },
  { packageName: "@jongh/cli", path: "./packages/cli" },
  { packageName: "panda-animation", path: "./packages/panda-animation" },
  { packageName: "@jongh/new-system-core", path: "./packages/new/system-core" },
  {
    packageName: "@jongh/new-system-output",
    path: "./packages/new/system-output",
  },
  { packageName: "@jongh/new-system-spec", path: "./packages/new/system-spec" },
]

const typeCheckConfigs = MODULES.reduce(
  (prev, { packageName, path }) => ({
    ...prev,
    [`${path}/**/*.{ts,tsx}`]: (filename) => [
      `pnpm --filter ${packageName} lint ${filename.join(" ")}`,
      `pnpm --filter ${packageName} check-type`,
    ],
  }),
  {},
)

module.exports = {
  "*": ["./check-uppercase.sh", "prettier --write --ignore-unknown"],
  ...typeCheckConfigs,
  "./app/docs/**/*.{ts,tsx}": (filename) => [
    `pnpm --filter docs lint --file ${filename.join(" ")}`,
    `pnpm --filter docs check-type`,
  ],
}
