/**
 * Script to generate propDescriptions.ts from JSDoc comments in prop interface files.
 *
 * Run with: npx ts-node scripts/generatePropDescriptions.ts
 * Or add to package.json: "props:generate": "ts-node scripts/generatePropDescriptions.ts"
 */

import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { ComponentKeys } from '../src/components/ui/props/keys.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PropDescription {
  description: string;
}

interface CategoryDescription {
  name: string;
  description: string;
  props: Record<string, PropDescription>;
}

// Type for ComponentKeys categories
type ComponentKeyCategory = keyof typeof ComponentKeys;

// Map from interface name to category key in ComponentKeys
const interfaceToCategoryMap: Record<string, ComponentKeyCategory> = {
  'SizeProps': 'size',
  'AppearanceProps': 'appearance',
  'TransparentProps': 'transparent',
  'VariantProps': 'variant',
  'ShapeProps': 'shape',
  'BorderProps': 'border',
  'ShadowProps': 'shadow',
  'RingProps': 'ring',
  'FocusVisibleProps': 'focusVisible',
  'PaddingProps': 'padding',
  'GapProps': 'gap',
  'WrapProps': 'wrap',
  'FlexDirectionProps': 'flexDirection',
  'ReverseProps': 'reverse',
  'ItemsProps': 'items',
  'JustifyProps': 'justify',
  'PositionProps': 'position',
  'DisplayProps': 'display',
  'OverflowProps': 'overflow',
  'HideProps': 'hide',
  'BreakpointProps': 'breakpoint',
  'FontWeightProps': 'fontWeight',
  'FontStyleProps': 'fontStyle',
  'FontFamilyProps': 'fontFamily',
  'TextDecorationProps': 'textDecoration',
  'TextTransformProps': 'textTransform',
  'TextAlignProps': 'textAlign',
  'ListStyleProps': 'listStyle',
  'ResponsiveProps': 'responsive',
};

// Convert category key to display name
function categoryKeyToName(key: string): string {
  // Handle camelCase to Title Case with spaces
  const withSpaces = key.replace(/([A-Z])/g, ' $1').trim();
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

function getJsDocComment(node: ts.Node, sourceFile: ts.SourceFile): string {
  const fullText = sourceFile.getFullText();
  const commentRanges = ts.getLeadingCommentRanges(fullText, node.getFullStart());

  if (!commentRanges) return '';

  for (const range of commentRanges) {
    const comment = fullText.slice(range.pos, range.end);
    if (comment.startsWith('/**')) {
      // Extract text from JSDoc comment
      return comment
        .replace(/^\/\*\*\s*/, '')
        .replace(/\s*\*\/$/, '')
        .replace(/^\s*\*\s?/gm, '')
        .trim();
    }
  }

  return '';
}

function extractPropsFromFile(filePath: string): CategoryDescription | null {
  const sourceText = fs.readFileSync(filePath, 'utf-8');
  const sourceFile = ts.createSourceFile(
    path.basename(filePath),
    sourceText,
    ts.ScriptTarget.Latest,
    true
  );

  let result: CategoryDescription | null = null;

  function visit(node: ts.Node) {
    if (ts.isInterfaceDeclaration(node)) {
      const interfaceName = node.name.text;
      const categoryKey = interfaceToCategoryMap[interfaceName];

      if (categoryKey) {
        const interfaceDescription = getJsDocComment(node, sourceFile);
        const props: Record<string, PropDescription> = {};

        node.members.forEach(member => {
          if (ts.isPropertySignature(member) && member.name) {
            const propName = (member.name as ts.Identifier).text;
            const propDescription = getJsDocComment(member, sourceFile);

            if (propDescription) {
              props[propName] = {
                description: propDescription
              };
            }
          }
        });

        result = {
          name: categoryKeyToName(categoryKey),
          description: interfaceDescription,
          props
        };
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return result;
}

function generatePropDescriptions(): void {
  const propsDir = path.join(__dirname, '../src/components/ui/props');
  const outputPath = path.join(propsDir, 'propDescriptions.ts');

  const descriptions: Record<string, CategoryDescription> = {};

  // Read all *Props.ts files
  const files = fs.readdirSync(propsDir).filter(f =>
    f.endsWith('Props.ts') && f !== 'propDescriptions.ts'
  );

  for (const file of files) {
    const filePath = path.join(propsDir, file);
    const result = extractPropsFromFile(filePath);

    if (result) {
      const categoryKey = Object.entries(interfaceToCategoryMap)
        .find(([interfaceName]) => file === interfaceName.replace('Props', '') + 'Props.ts' ||
                                   file === interfaceName.charAt(0).toLowerCase() + interfaceName.slice(1).replace('Props', '') + 'Props.ts')?.[1];

      if (categoryKey) {
        descriptions[categoryKey] = result;
      } else {
        // Try to find by parsing the file
        const interfaceName = file.replace('.ts', '');
        const key = interfaceToCategoryMap[interfaceName];
        if (key) {
          descriptions[key] = result;
        }
      }
    }
  }

  // Also try to match by interface name found during parsing
  for (const file of files) {
    const filePath = path.join(propsDir, file);
    const sourceText = fs.readFileSync(filePath, 'utf-8');
    const sourceFile = ts.createSourceFile(file, sourceText, ts.ScriptTarget.Latest, true);

    function findInterface(node: ts.Node) {
      if (ts.isInterfaceDeclaration(node)) {
        const interfaceName = node.name.text;
        const categoryKey = interfaceToCategoryMap[interfaceName];
        if (categoryKey && !descriptions[categoryKey]) {
          const result = extractPropsFromFile(filePath);
          if (result) {
            descriptions[categoryKey] = result;
          }
        }
      }
      ts.forEachChild(node, findInterface);
    }

    findInterface(sourceFile);
  }

  // Validate against ComponentKeys
  const componentKeyCategories = Object.keys(ComponentKeys) as (keyof typeof ComponentKeys)[];
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check all categories from ComponentKeys are covered
  for (const category of componentKeyCategories) {
    if (!descriptions[category]) {
      errors.push(`Missing category: "${category}" - no PropDescription found`);
      continue;
    }

    // Check all props within each category are covered
    const expectedProps = ComponentKeys[category] as readonly string[];
    const foundProps = Object.keys(descriptions[category].props);

    for (const prop of expectedProps) {
      if (!descriptions[category].props[prop]) {
        errors.push(`Missing prop: "${category}.${prop}" - no JSDoc description found`);
      }
    }

    // Check for orphaned props (props in descriptions but not in ComponentKeys)
    for (const prop of foundProps) {
      if (!expectedProps.includes(prop)) {
        warnings.push(`Orphaned prop: "${category}.${prop}" - exists in descriptions but not in ComponentKeys`);
      }
    }
  }

  // Check for categories in descriptions not in ComponentKeys
  for (const category of Object.keys(descriptions)) {
    if (!componentKeyCategories.includes(category as keyof typeof ComponentKeys)) {
      warnings.push(`Orphaned category: "${category}" - exists in descriptions but not in ComponentKeys`);
    }
  }

  // Report results
  if (warnings.length > 0) {
    console.warn('\nWarnings:');
    warnings.forEach(w => console.warn(`  ⚠️  ${w}`));
  }

  if (errors.length > 0) {
    console.error('\nErrors:');
    errors.forEach(e => console.error(`  ❌ ${e}`));
    console.error(`\n${errors.length} error(s) found. Please add JSDoc comments to the missing props.`);
    process.exit(1);
  }

  // Generate the output file
  const output = `/**
 * Auto-generated prop descriptions from JSDoc comments.
 * DO NOT EDIT MANUALLY - Run 'npm run props:generate' to regenerate.
 *
 * Generated on: ${new Date().toISOString()}
 */

export interface PropDescription {
  description: string;
}

export interface CategoryDescription {
  name: string;
  description: string;
  props: Record<string, PropDescription>;
}

export const PropDescriptions: Record<string, CategoryDescription> = ${JSON.stringify(descriptions, null, 2)};

/**
 * Get description for a specific prop within a category
 */
export function getPropDescription(category: string, prop: string): string | undefined {
  return PropDescriptions[category]?.props[prop]?.description;
}

/**
 * Get description for a category
 */
export function getCategoryDescription(category: string): string | undefined {
  return PropDescriptions[category]?.description;
}

/**
 * Get display name for a category
 */
export function getCategoryName(category: string): string | undefined {
  return PropDescriptions[category]?.name;
}
`;

  fs.writeFileSync(outputPath, output, 'utf-8');

  // Calculate totals
  const totalCategories = Object.keys(descriptions).length;
  const totalProps = Object.values(descriptions).reduce(
    (sum, cat) => sum + Object.keys(cat.props).length,
    0
  );

  console.log(`\n✅ Generated ${outputPath}`);
  console.log(`   Categories: ${totalCategories} (expected: ${componentKeyCategories.length})`);
  console.log(`   Props: ${totalProps}`);
  console.log(`   All props from ComponentKeys are covered!`);
}

generatePropDescriptions();
