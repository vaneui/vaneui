import fs from "node:fs";
import path from "node:path";
import glob from "fast-glob";

/**
 * Generates resolution-correct declaration variants from the tsc output:
 *  - `.d.mts` for the ESM (import) condition, with relative specifiers
 *    rewritten to explicit `.mjs` paths
 *  - `.d.cts` for the CJS (require) condition, with relative specifiers
 *    rewritten to explicit `.cjs` paths
 *
 * Why the whole tree and not just entry points: the package is
 * `"type": "module"`, so under TypeScript's node16/nodenext resolution plain
 * `.d.ts` files are ESM-interpreted AND ESM declaration files may not use
 * extensionless relative imports. A `./x.mjs` specifier resolves only to
 * `./x.d.mts` (no `.d.ts` fallback), so every file the entry re-exports needs
 * its own variant. The original `.d.ts` tree is kept for legacy (node10)
 * resolution via the top-level "types" field.
 */

// matches relative specifiers including bare "." / ".." directory imports
const SPECIFIER_RE = /(\bfrom\s*|\bimport\s*\(\s*)(['"])(\.\.?(?:\/[^'"]+)?)\2/g;

const rewriteSpecifiers = (code: string, fileDir: string, runtimeExt: string): string =>
  code.replace(SPECIFIER_RE, (match, prefix: string, quote: string, spec: string) => {
    if (/\.[cm]?js$/.test(spec)) {
      return match; // already extensionful
    }
    const abs = path.resolve(fileDir, spec);
    if (fs.existsSync(`${abs}.d.ts`)) {
      return `${prefix}${quote}${spec}${runtimeExt}${quote}`;
    }
    if (fs.existsSync(path.join(abs, "index.d.ts"))) {
      return `${prefix}${quote}${spec}/index${runtimeExt}${quote}`;
    }
    // real imports are guaranteed resolvable (tsc compiled them) — an
    // unresolvable match can only be import-like text inside a comment
    console.warn(`generateDualTypes: leaving unresolvable specifier "${spec}" in ${fileDir} untouched (comment text?)`);
    return match;
  });

const dtsFiles = await glob(["dist/types/**/*.d.ts"]);

if (dtsFiles.length === 0) {
  throw new Error("generateDualTypes: no .d.ts files found under dist/types — run tsc declaration emit first");
}

for (const dts of dtsFiles) {
  const abs = path.resolve(dts);
  const dir = path.dirname(abs);
  const source = fs.readFileSync(abs, "utf8");

  fs.writeFileSync(abs.replace(/\.d\.ts$/, ".d.mts"), rewriteSpecifiers(source, dir, ".mjs"));
  fs.writeFileSync(abs.replace(/\.d\.ts$/, ".d.cts"), rewriteSpecifiers(source, dir, ".cjs"));
}

console.log(`Generated ${dtsFiles.length} .d.mts and ${dtsFiles.length} .d.cts declaration variants`);
