#!/usr/bin/env tsx
/**
 * Component scaffolding script for VaneUI.
 *
 * Usage:
 *   npx tsx scripts/newComponent.ts <ComponentName> [--type interactive|layout]
 *
 * Examples:
 *   npx tsx scripts/newComponent.ts Tooltip
 *   npx tsx scripts/newComponent.ts Accordion --type interactive
 *   npx tsx scripts/newComponent.ts Panel --type layout
 *
 * Generates:
 *   src/components/ui/<component>/
 *     <Component>.tsx          — Component implementation
 *     <Component>Props.ts      — Props type definition
 *     <Component>Theme.ts      — Theme type
 *     <component>Defaults.ts   — Default props
 *     default<Component>Theme.ts — Default theme instance
 *     <Component>Categories.ts — Category definition
 *     index.ts                 — Barrel exports
 *   src/components/tests/<component>.test.tsx — Test skeleton
 *
 * After running, you must manually:
 *   1. Add the component to src/components/themeTypes.ts (ThemeProps, ThemeDefaults, ThemeExtraClasses)
 *   2. Add the component to src/components/defaultTheme.ts
 *   3. Add the component to src/components/ui/theme/defaults.ts
 *   4. Add the component to src/index.ts
 *   5. Add the component to src/components/tests/componentThemeCoverage.test.ts
 *   6. Add playground examples to playground/src/App.tsx
 */

import * as fs from 'fs';
import * as path from 'path';

const args = process.argv.slice(2);
const componentName = args[0];
const typeFlag = args.indexOf('--type');
const componentType: 'interactive' | 'layout' = (typeFlag !== -1 && args[typeFlag + 1] === 'layout') ? 'layout' : 'interactive';

if (!componentName || componentName.startsWith('-')) {
  console.error('Usage: npx tsx scripts/newComponent.ts <ComponentName> [--type interactive|layout]');
  console.error('  ComponentName must be PascalCase (e.g., Tooltip, Accordion, Panel)');
  process.exit(1);
}

// Derive names
const pascal = componentName; // e.g., "Tooltip"
const camel = pascal.charAt(0).toLowerCase() + pascal.slice(1); // e.g., "tooltip"
const upper = pascal.replace(/([A-Z])/g, '_$1').toUpperCase().replace(/^_/, ''); // e.g., "TOOLTIP"
const htmlElement = componentType === 'interactive' ? 'HTMLSpanElement' : 'HTMLDivElement';
const defaultTag = componentType === 'interactive' ? '"span"' : '"div"';
const vaneType = componentType === 'interactive' ? "'ui'" : "'layout'";
const themeType = componentType === 'interactive'
  ? 'InteractiveComponentTheme'
  : 'LayoutComponentTheme';
const classMappers = componentType === 'interactive'
  ? 'interactiveClassMappers'
  : 'layoutClassMappers';
const categoriesBase = componentType === 'interactive'
  ? 'UI_ELEMENT_CATEGORIES'
  : 'CONTAINER_LAYOUT_CATEGORIES';

const componentDir = path.join('src', 'components', 'ui', camel);
const testDir = path.join('src', 'components', 'tests');

if (fs.existsSync(componentDir)) {
  console.error(`Error: Directory already exists: ${componentDir}`);
  process.exit(1);
}

fs.mkdirSync(componentDir, { recursive: true });

// --- Component.tsx ---
const componentTsx = `import { forwardRef } from 'react';
import type { ${pascal}Props } from "./${pascal}Props";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

export const ${pascal} = forwardRef<${htmlElement}, ${pascal}Props>(
  function ${pascal}(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.${camel}} ref={ref} {...props} />
  }
);

${pascal}.displayName = '${pascal}';
`;

// --- Props.ts ---
const propsTsx = `import type React from 'react';
import type {
  BaseProps,
  SizeProps,
  HideProps,
  ItemsProps,
  JustifyProps,
  PositionProps,
  DisplayProps,
  OverflowProps,
  WrapProps,
  GapProps,
  FlexDirectionProps,
  ReverseProps,
  AppearanceProps,
  BorderProps,
  ShadowProps,
  RingProps,${componentType === 'interactive' ? '\n  FocusVisibleProps,' : ''}
  ShapeProps,${componentType === 'interactive' ? `
  FontWeightProps,
  FontStyleProps,
  TextDecorationProps,
  TextTransformProps,
  FontFamilyProps,
  TextAlignProps,` : ''}
  PaddingProps,
  VariantProps,${componentType === 'interactive' ? `
  CursorProps,` : ''}
  TransparentProps,
  ResponsiveProps,${componentType === 'interactive' ? `
  TransitionProps,
  WhitespaceProps,` : ''}
  WidthProps,
  HeightProps,
  DisabledProps
} from "../props";

/** ${pascal} component props */
export type ${pascal}Props = BaseProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  WrapProps &
  GapProps &
  FlexDirectionProps &
  ReverseProps &
  AppearanceProps &
  BorderProps &
  ShadowProps &
  RingProps &${componentType === 'interactive' ? '\n  FocusVisibleProps &' : ''}
  ShapeProps &${componentType === 'interactive' ? `
  FontWeightProps &
  FontStyleProps &
  TextDecorationProps &
  TextTransformProps &
  FontFamilyProps &
  TextAlignProps &` : ''}
  PaddingProps &
  VariantProps &${componentType === 'interactive' ? `
  CursorProps &` : ''}
  TransparentProps &
  ResponsiveProps &${componentType === 'interactive' ? `
  TransitionProps &
  WhitespaceProps &` : ''}
  WidthProps &
  HeightProps &
  DisabledProps &
  Omit<React.HTMLAttributes<${htmlElement}>, 'className' | 'children'> & {
  /** URL to navigate to (renders component as anchor tag) */
  href?: string;
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
`;

// --- Theme.ts ---
const themeTsx = `import type { ${themeType} } from "../theme/common";

export type ${pascal}Theme = ${themeType};
`;

// --- Defaults.ts ---
const defaultsTsx = `import type { ${pascal}Props } from "./${pascal}Props";

/** Default props for ${pascal} component */
export const ${camel}Defaults: Partial<${pascal}Props> = {
  md: true,
  ${componentType === 'interactive' ? 'primary' : 'inherit'}: true,
  ${componentType === 'interactive' ? 'inlineFlex' : 'flex'}: true,
  outline: true,
  rounded: true,
  ${componentType === 'interactive' ? 'sans: true,' : ''}
  padding: true,
  gap: true,${componentType === 'interactive' ? `
  ring: true,
  transition: true,
  itemsCenter: true,` : `
  itemsStart: true,
  column: true,`}
};
`;

// --- defaultTheme.ts ---
const defaultThemeTsx = `import { ComponentTheme, ${classMappers} } from "../theme/common";
import type { ${pascal}Props } from "./${pascal}Props";
import type { ${pascal}Theme } from "./${pascal}Theme";
import { ${upper}_CATEGORIES } from "./${pascal}Categories";
import { ${camel}Defaults } from "./${camel}Defaults";

export const default${pascal}Theme = new ComponentTheme<${pascal}Props, ${pascal}Theme>(
  ${defaultTag},
  "vane-${camel}",
  ${classMappers},
  ${camel}Defaults,
  ${upper}_CATEGORIES,
  (props: ${pascal}Props) => props.href ? "a" : ${defaultTag},
  ${vaneType}
);
`;

// --- Categories.ts ---
const categoriesTsx = `import { ${categoriesBase} } from "../props/categoryBuilders";

export const ${upper}_CATEGORIES = [
  ...${categoriesBase},
] as const;
`;

// --- index.ts ---
const indexTsx = `export { ${pascal} } from './${pascal}';
export type { ${pascal}Props } from './${pascal}Props';
export { ${upper}_CATEGORIES } from './${pascal}Categories';
export type { ${pascal}Theme } from './${pascal}Theme';
export { ${camel}Defaults } from './${camel}Defaults';
export { default${pascal}Theme } from './default${pascal}Theme';
`;

// --- test file ---
const testTsx = `import { render } from '@testing-library/react';
import { ${pascal} } from '../ui/${camel}';

describe('${pascal}', () => {
  it('renders with default tag', () => {
    const { container } = render(<${pascal}>Test</${pascal}>);
    const el = container.firstChild as HTMLElement;
    expect(el.tagName.toLowerCase()).toBe('${componentType === 'interactive' ? 'span' : 'div'}');
  });

  it('renders with correct data-size attribute', () => {
    const { container } = render(<${pascal} lg>Test</${pascal}>);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute('data-size')).toBe('lg');
  });

  it('renders with correct data-appearance attribute', () => {
    const { container } = render(<${pascal} danger>Test</${pascal}>);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute('data-appearance')).toBe('danger');
  });

  it('renders with correct data-variant attribute', () => {
    const { container } = render(<${pascal} filled>Test</${pascal}>);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute('data-variant')).toBe('filled');
  });

  it('forwards ref', () => {
    const ref = { current: null as ${htmlElement} | null };
    render(<${pascal} ref={ref}>Test</${pascal}>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('does not leak boolean props to the DOM', () => {
    const { container } = render(<${pascal} primary filled lg pill>Test</${pascal}>);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute('primary')).toBeNull();
    expect(el.getAttribute('filled')).toBeNull();
    expect(el.getAttribute('lg')).toBeNull();
    expect(el.getAttribute('pill')).toBeNull();
  });

  it('passes HTML attributes through', () => {
    const onClick = jest.fn();
    const { container } = render(<${pascal} onClick={onClick} aria-label="test">Test</${pascal}>);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute('aria-label')).toBe('test');
  });

  it('merges custom className', () => {
    const { container } = render(<${pascal} className="custom-class">Test</${pascal}>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('custom-class');
  });

  it('renders as anchor when href is provided', () => {
    const { container } = render(<${pascal} href="/test">Test</${pascal}>);
    const el = container.firstChild as HTMLElement;
    expect(el.tagName.toLowerCase()).toBe('a');
    expect(el.getAttribute('href')).toBe('/test');
  });
});
`;

// Write all files
const files: Array<[string, string]> = [
  [path.join(componentDir, `${pascal}.tsx`), componentTsx],
  [path.join(componentDir, `${pascal}Props.ts`), propsTsx],
  [path.join(componentDir, `${pascal}Theme.ts`), themeTsx],
  [path.join(componentDir, `${camel}Defaults.ts`), defaultsTsx],
  [path.join(componentDir, `default${pascal}Theme.ts`), defaultThemeTsx],
  [path.join(componentDir, `${pascal}Categories.ts`), categoriesTsx],
  [path.join(componentDir, 'index.ts'), indexTsx],
  [path.join(testDir, `${camel}.test.tsx`), testTsx],
];

for (const [filePath, content] of files) {
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  Created: ${filePath}`);
}

console.log(`
✓ Generated ${files.length} files for ${pascal} (${componentType})

Manual steps remaining:
  1. Add to src/components/themeTypes.ts:
     - Import: import type { ${pascal}Theme } from './ui/${camel}/${pascal}Theme';
     - Import: import type { ${pascal}Props } from './ui/${camel}/${pascal}Props';
     - ThemeProps:      ${camel}: ComponentTheme<${pascal}Props, ${pascal}Theme>;
     - ThemeDefaults:   ${camel}?: Partial<BooleanKeys<${pascal}Props>>;
     - ThemeExtraClasses: ${camel}?: Partial<StringValueKeys<${pascal}Props>>;

  2. Add to src/components/defaultTheme.ts:
     - Import: import { default${pascal}Theme } from './ui/${camel}/default${pascal}Theme';
     - defaultTheme:    ${camel}: default${pascal}Theme,

  3. Add to src/components/ui/theme/defaults.ts:
     - Import: import { ${camel}Defaults } from '../${camel}/${camel}Defaults';
     - themeDefaults:   ${camel}: ${camel}Defaults,

  4. Add to src/index.ts:
     - export { ${pascal}, type ${pascal}Props } from "./components/ui/${camel}";

  5. Add to src/components/tests/componentThemeCoverage.test.ts:
     - Import: import { default${pascal}Theme, ${upper}_CATEGORIES } from "../ui/${camel}";
     - Add config + createThemeTests(...)
     - Add default${pascal}Theme to allTestedThemes Set

  6. Add playground examples to playground/src/App.tsx

  7. Run verification: npm run type-check && npm test && npm run build
`);
