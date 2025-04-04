import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

// Banner for 'use client' directive
const useClientBanner = `'use client';\n`;

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
        banner: useClientBanner,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
        banner: useClientBanner,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
  {
    input: "src/components/complex/index.ts",
    output: [
      {
        file: "dist/components/complex/index.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.complex.json" }),
    ],
  },
  {
    input: "src/components/theme/index.ts",
    output: [
      {
        file: "dist/components/theme/index.js",
        format: "esm",
        sourcemap: true,
        banner: useClientBanner,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.theme.json" }),
    ],
  },
];
