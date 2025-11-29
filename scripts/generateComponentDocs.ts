/**
 * Automated JSDoc generation script for VaneUI components
 *
 * This script programmatically generates comprehensive JSDoc documentation
 * for components based on their prop categories, eliminating manual copy-paste.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import all documentation blocks
import {
  SIZE_PROPS,
  APPEARANCE_PROPS_UI,
  VARIANT_PROPS,
  SHAPE_PROPS,
  FONT_FAMILY_PROPS,
  FONT_WEIGHT_PROPS,
  FONT_STYLE_PROPS,
  TEXT_DECORATION_PROPS,
  TEXT_TRANSFORM_PROPS,
  TEXT_ALIGN_PROPS,
  VISUAL_DECORATION_PROPS,
  BORDER_PROPS,
  LAYOUT_PROPS,
  FLEX_DIRECTION_PROPS,
  FLEX_PROPS,
  ITEMS_PROPS,
  JUSTIFY_PROPS,
  DISPLAY_PROPS,
  POSITION_PROPS,
  OVERFLOW_PROPS,
  LINK_TAG_PROPS,
} from '../src/components/ui/docs/propDocs';

/**
 * Component metadata for doc generation
 */
interface ComponentMetadata {
  name: string;
  file: string;
  propsType: string;
  description: string;
  examples: string[];
  refType?: string;
}

/**
 * Map category names to their documentation blocks
 */
const CATEGORY_TO_DOCS: Record<string, string> = {
  'size': SIZE_PROPS,
  'appearance': APPEARANCE_PROPS_UI,
  'variant': VARIANT_PROPS,
  'shape': SHAPE_PROPS,
  'fontFamily': FONT_FAMILY_PROPS,
  'fontWeight': FONT_WEIGHT_PROPS,
  'fontStyle': FONT_STYLE_PROPS,
  'textDecoration': TEXT_DECORATION_PROPS,
  'textTransform': TEXT_TRANSFORM_PROPS,
  'textAlign': TEXT_ALIGN_PROPS,
  'shadow': VISUAL_DECORATION_PROPS,
  'ring': VISUAL_DECORATION_PROPS,
  'focusVisible': VISUAL_DECORATION_PROPS,
  'border': BORDER_PROPS,
  'padding': LAYOUT_PROPS,
  'gap': LAYOUT_PROPS,
  'flexDirection': FLEX_DIRECTION_PROPS,
  'wrap': FLEX_PROPS,
  'reverse': FLEX_PROPS,
  'items': ITEMS_PROPS,
  'justify': JUSTIFY_PROPS,
  'display': DISPLAY_PROPS,
  'position': POSITION_PROPS,
  'overflow': OVERFLOW_PROPS,
};

/**
 * Component configurations
 */
const COMPONENTS: ComponentMetadata[] = [
  {
    name: 'Button',
    file: 'button.tsx',
    propsType: 'ButtonProps',
    refType: 'HTMLButtonElement',
    description: 'A clickable button element with customizable appearance and behavior',
    examples: [
      '// Basic button',
      '<Button>Click me</Button>',
      '',
      '// With size, appearance, and variant',
      '<Button lg primary filled>Submit</Button>',
      '',
      '// Outlined button',
      '<Button outlined secondary>Cancel</Button>',
      '',
      '// As a link',
      '<Button href="/about">Learn More</Button>',
    ],
  },
  {
    name: 'Badge',
    file: 'badge.tsx',
    propsType: 'BadgeProps',
    refType: 'HTMLSpanElement',
    description: 'A small label for status, categories, counts, or notifications',
    examples: [
      '// Basic badge',
      '<Badge>New</Badge>',
      '',
      '// Status badge with appearance and variant',
      '<Badge success filled pill>Active</Badge>',
      '',
      '// Count badge',
      '<Badge danger filled>3</Badge>',
      '',
      '// As a link',
      '<Badge href="/notifications" primary outlined>5 New</Badge>',
    ],
  },
];

/**
 * Get unique prop categories for a component by reading keys.ts
 */
function getComponentCategories(componentName: string): string[] {
  // For now, hardcode INTERACTIVE_CATEGORIES since Button and Badge both use it
  // In the future, this could parse keys.ts dynamically
  const interactiveCategories = [
    'size',
    'hide',
    'items',
    'justify',
    'position',
    'display',
    'overflow',
    'wrap',
    'gap',
    'flexDirection',
    'reverse',
    'appearance',
    'transparent',
    'border',
    'shadow',
    'ring',
    'focusVisible',
    'shape',
    'fontWeight',
    'fontStyle',
    'textDecoration',
    'textTransform',
    'fontFamily',
    'textAlign',
    'padding',
    'variant',
  ];

  return interactiveCategories;
}

/**
 * Generate JSDoc for a component
 */
function generateJSDoc(component: ComponentMetadata): string {
  const categories = getComponentCategories(component.name);

  // Get unique doc blocks (avoid duplicates like VISUAL_DECORATION_PROPS appearing 3x)
  const seenDocs = new Set<string>();
  const propSections: string[] = [];

  for (const category of categories) {
    const docBlock = CATEGORY_TO_DOCS[category];
    if (docBlock && !seenDocs.has(docBlock)) {
      seenDocs.add(docBlock);
      propSections.push(docBlock);
    }
  }

  const examplesBlock = component.examples
    .map(ex => ` * ${ex}`)
    .join('\n');

  const propsBlock = propSections.join('\n *\n');

  return `/**
 * ${component.name} - ${component.description}
 *
 * @example
 * \`\`\`tsx
${examplesBlock}
 * \`\`\`
 *
 * @param props - ${component.name} props
 * @param props.children - ${component.name} content
 * @param props.className - Additional CSS classes to merge with theme classes
 *
${propsBlock}
 *
 * @see {@link ${component.propsType}} for the complete type definition
 */`;
}

/**
 * Inject JSDoc into component file
 */
function injectJSDoc(component: ComponentMetadata): void {
  const filePath = path.join(__dirname, '../src/components/ui', component.file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Generate JSDoc
  const jsdoc = generateJSDoc(component);

  // Find the export line
  const exportRegex = new RegExp(`export const ${component.name} = forwardRef`, 'g');

  if (!exportRegex.test(content)) {
    console.error(`❌ Could not find export for ${component.name} in ${component.file}`);
    return;
  }

  // Reset regex
  content = fs.readFileSync(filePath, 'utf-8');

  // Remove existing JSDoc if present (everything from /** to */ before export const)
  const jsdocRemovalRegex = new RegExp(`/\\*\\*[\\s\\S]*?\\*/\\s*(?=export const ${component.name})`, 'g');
  content = content.replace(jsdocRemovalRegex, '');

  // Inject new JSDoc
  content = content.replace(
    new RegExp(`(export const ${component.name} = forwardRef)`),
    `${jsdoc}\n$1`
  );

  // Write back
  fs.writeFileSync(filePath, content);

  console.log(`✅ Generated docs for ${component.name}`);
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Generating component documentation...\n');

  COMPONENTS.forEach(component => {
    try {
      injectJSDoc(component);
    } catch (error) {
      console.error(`❌ Error processing ${component.name}:`, error);
    }
  });

  console.log('\n🎉 Documentation generation complete!');
}

main();
