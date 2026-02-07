import fs from "node:fs";
import path from "node:path";
import glob from "fast-glob";

/**
 * Copies .d.ts → .d.mts for entry points referenced in the package.json exports map.
 * Only entry-point files need .d.mts — TypeScript resolves their relative imports
 * to .d.ts files automatically. This matches Mantine's and Chakra UI's approach.
 */
const entryPoints = await glob([
  "dist/types/index.d.ts",
  "dist/types/components/ui/*/index.d.ts",
  "dist/types/components/ui/layout.d.ts",
  "dist/types/components/themeContext.d.ts",
]);

for (const dts of entryPoints) {
  const dmts = dts.replace(/\.d\.ts$/, ".d.mts");
  fs.copyFileSync(path.resolve(dts), path.resolve(dmts));
}

console.log(`Copied ${entryPoints.length} .d.ts → .d.mts entry points`);
