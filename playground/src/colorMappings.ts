// @ts-expect-error - Vite raw import
import varsCSS from '../../src/components/css/vars.css?raw';

export interface ColorMapping {
  cssVar: string;
  tailwindColor: string;
}

// Extracts Tailwind color name for each --color-* CSS var (e.g. '--color-bg-primary' -> 'blue-50')
export function parseColorMappings(): Map<string, string> {
  const mappings = new Map<string, string>();

  const regex = /^\s*(--color-[a-z-]+):\s*var\(--color-([a-z]+-\d+)\)/gm;

  let match;
  while ((match = regex.exec(varsCSS)) !== null) {
    const [, cssVar, tailwindColor] = match;
    mappings.set(cssVar, tailwindColor);
  }

  // special values: white/black/transparent
  const specialRegex = /^\s*(--color-[a-z-]+):\s*var\(--color-(white|black|transparent)\)/gm;
  while ((match = specialRegex.exec(varsCSS)) !== null) {
    const [, cssVar, tailwindColor] = match;
    mappings.set(cssVar, tailwindColor);
  }

  // Handle literal values like 'transparent'
  const literalRegex = /^\s*(--color-[a-z-]+):\s*(transparent|white|black);/gm;
  while ((match = literalRegex.exec(varsCSS)) !== null) {
    const [, cssVar, value] = match;
    mappings.set(cssVar, value);
  }

  return mappings;
}

/**
 * Get the Tailwind color name for a CSS variable.
 * Returns the color name like "blue-300" or "gray-50"
 */
export function getTailwindColor(cssVar: string, mappings: Map<string, string>): string {
  return mappings.get(cssVar) ?? 'unknown';
}

// Pre-parse on module load for efficiency
export const colorMappings = parseColorMappings();
