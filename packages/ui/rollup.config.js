import peerDepsExternal from "rollup-plugin-peer-deps-external"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import json from "@rollup/plugin-json"
import terser from "@rollup/plugin-terser"
import { babel } from "@rollup/plugin-babel"

export default {
  input: {
    Button: "./src/components/Button/Button.tsx",
  },
  output: [
    {
      format: "esm",
      dir: "dist",
      preserveModules: true,
      preserveModulesRoot: "src",
      entryFileNames: "[name].js",
      sourcemap: true,
    },
    {
      format: "cjs",
      dir: "dist",
      entryFileNames: "[name].cjs",
      globals: {
        "react/jsx-runtime": "jsxRuntime",
        "react-dom/client": "ReactDOM",
        react: "React",
      },
    },
  ],
  external: ["react/jsx-runtime"],

  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      include: ["src/components/**/*.ts"],
    }),
    resolve({ extensions: [".tsx", ".ts", ".js", ".jsx"] }),
    commonjs({
      include: "node_modules/**",
    }),
    json(),
    terser(),
    babel({
      presets: [
        "@babel/preset-env",
        [
          "@babel/preset-react",
          {
            runtime: "automatic",
          },
        ],
        "@babel/preset-typescript",
      ],
      babelHelpers: "bundled",
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    }),
  ],
}
