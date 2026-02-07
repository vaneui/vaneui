import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import MagicString from "magic-string";
import glob from "fast-glob";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");

const deps = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

const external = deps.length
  ? new RegExp(`^(${deps.join("|")})(/|$)`)
  : undefined;

const entries = await glob([
  "src/index.ts",
  "src/components/ui/*/index.ts",
  "src/components/ui/typography/index.ts",
  "src/components/ui/props/index.ts",
  "src/components/themeContext.tsx",
  "src/components/ui/layout.tsx",
]);

/** Adds 'use client' only to chunks that import from react at runtime. */
function useClientPlugin() {
  return {
    name: "use-client",
    renderChunk(code) {
      if (
        code.includes("from 'react'") ||
        code.includes('from "react"') ||
        code.includes("from 'react/jsx-runtime'") ||
        code.includes('from "react/jsx-runtime"') ||
        code.includes("require('react')") ||
        code.includes("require('react/jsx-runtime')")
      ) {
        const s = new MagicString(code);
        s.prepend("'use client';\n");
        return { code: s.toString(), map: s.generateMap({ hires: true }) };
      }
      return null;
    },
  };
}

export default [
  {
    input: entries,
    external,
    output: [
      {
        format: "cjs",
        dir: "dist/cjs",
        entryFileNames: "[name].cjs",
        preserveModules: true,
        preserveModulesRoot: "src",
        sourcemap: true,
      },
      {
        format: "esm",
        dir: "dist/esm",
        entryFileNames: "[name].mjs",
        preserveModules: true,
        preserveModulesRoot: "src",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      esbuild({
        sourceMap: true,
        tsconfig: "./tsconfig.build.json",
      }),
      useClientPlugin(),
    ],
    onwarn(warning, warn) {
      if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
      warn(warning);
    },
  },
];
