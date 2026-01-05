/**
 * Reusable JSDoc documentation blocks for component props.
 *
 * This file provides pre-written JSDoc sections that can be composed
 * into component documentation, eliminating copy-paste duplication.
 *
 * @example
 * import { SIZE_PROPS, APPEARANCE_PROPS_UI, VARIANT_PROPS } from './docs/propDocs';
 *
 * // Then use in template literals when building JSDoc
 */

/**
 * Common props documentation
 */
export const COMMON_PROPS = `
 * @param props - Component props
 * @param props.children - Component content
 * @param props.className - Additional CSS classes to merge with theme classes`;

/**
 * Size props documentation (xs, sm, md, lg, xl)
 */
export const SIZE_PROPS = `
 * SIZE PROPS:
 * @param props.xs - Extra small size
 * @param props.sm - Small size
 * @param props.md - Medium size (default)
 * @param props.lg - Large size
 * @param props.xl - Extra large size`;

/**
 * Appearance props for UI components (primary, secondary, etc.)
 */
export const APPEARANCE_PROPS_UI = `
 * APPEARANCE PROPS:
 * @param props.default - Default color appearance
 * @param props.primary - Primary color appearance (blue)
 * @param props.secondary - Secondary color appearance (gray)
 * @param props.tertiary - Tertiary color appearance
 * @param props.accent - Accent color appearance (rose)
 * @param props.success - Success color appearance (green)
 * @param props.danger - Danger color appearance (red)
 * @param props.warning - Warning color appearance (amber)
 * @param props.info - Info color appearance (cyan)
 * @param props.link - Link color appearance`;

/**
 * Appearance props for layout components (background only)
 */
export const APPEARANCE_PROPS_LAYOUT = `
 * APPEARANCE PROPS (Background):
 * @param props.default - Default background color
 * @param props.primary - Primary background color
 * @param props.secondary - Secondary background color
 * @param props.tertiary - Tertiary background color`;

/**
 * Appearance props for typography (text color)
 */
export const APPEARANCE_PROPS_TEXT = `
 * APPEARANCE PROPS (Text Color):
 * @param props.default - Default text color (gray-900)
 * @param props.primary - Primary text color (blue-600)
 * @param props.secondary - Secondary text color (gray-600)
 * @param props.tertiary - Tertiary text color (gray-500)
 * @param props.accent - Accent text color (rose-700)
 * @param props.success - Success text color (emerald-600)
 * @param props.danger - Danger text color (red-600)
 * @param props.warning - Warning text color (amber-600)
 * @param props.info - Info text color (cyan-600)
 * @param props.link - Link text color (blue-600)`;

/**
 * Variant props (filled, outline)
 */
export const VARIANT_PROPS = `
 * VARIANT PROPS:
 * @param props.filled - Filled variant with solid background
 * @param props.outline - Outline variant with border only`;

/**
 * Shape props (rounded, pill, sharp)
 */
export const SHAPE_PROPS = `
 * SHAPE PROPS:
 * @param props.rounded - Medium rounded corners (default)
 * @param props.pill - Fully rounded corners (circular)
 * @param props.sharp - No rounded corners (square)`;

/**
 * Font family props
 */
export const FONT_FAMILY_PROPS = `
 * FONT FAMILY PROPS:
 * @param props.sans - Sans-serif font family (default)
 * @param props.serif - Serif font family
 * @param props.mono - Monospace font family`;

/**
 * Font weight props
 */
export const FONT_WEIGHT_PROPS = `
 * FONT WEIGHT PROPS:
 * @param props.thin - Thin font weight (100)
 * @param props.extralight - Extra light font weight (200)
 * @param props.light - Light font weight (300)
 * @param props.normal - Normal font weight (400)
 * @param props.medium - Medium font weight (500)
 * @param props.semibold - Semibold font weight (600)
 * @param props.bold - Bold font weight (700)
 * @param props.extrabold - Extra bold font weight (800)
 * @param props.black - Black font weight (900)`;

/**
 * Font style props
 */
export const FONT_STYLE_PROPS = `
 * FONT STYLE PROPS:
 * @param props.italic - Italic font style
 * @param props.notItalic - Not italic (normal) font style`;

/**
 * Text decoration props
 */
export const TEXT_DECORATION_PROPS = `
 * TEXT DECORATION PROPS:
 * @param props.underline - Underline text decoration
 * @param props.lineThrough - Line-through text decoration
 * @param props.noUnderline - No text decoration`;

/**
 * Text transform props
 */
export const TEXT_TRANSFORM_PROPS = `
 * TEXT TRANSFORM PROPS:
 * @param props.uppercase - Transform text to uppercase
 * @param props.lowercase - Transform text to lowercase
 * @param props.capitalize - Capitalize first letter of each word
 * @param props.normalCase - Normal text case (no transformation)`;

/**
 * Text alignment props
 */
export const TEXT_ALIGN_PROPS = `
 * TEXT ALIGNMENT PROPS:
 * @param props.textLeft - Align text to left
 * @param props.textCenter - Align text to center
 * @param props.textRight - Align text to right
 * @param props.textJustify - Justify text`;

/**
 * Visual decoration props (shadow, ring, focus)
 */
export const VISUAL_DECORATION_PROPS = `
 * VISUAL DECORATION PROPS:
 * @param props.shadow - Enable drop shadow
 * @param props.noShadow - Disable drop shadow
 * @param props.ring - Enable focus ring
 * @param props.noRing - Disable focus ring
 * @param props.focusVisible - Enable focus-visible outline
 * @param props.noFocusVisible - Disable focus-visible outline`;

/**
 * Layout props (gap, padding)
 */
export const LAYOUT_PROPS = `
 * LAYOUT PROPS:
 * @param props.gap - Enable gap spacing between children
 * @param props.noGap - Disable gap spacing
 * @param props.padding - Enable internal padding
 * @param props.noPadding - Disable internal padding`;

/**
 * Flexbox direction props
 */
export const FLEX_DIRECTION_PROPS = `
 * FLEXBOX DIRECTION PROPS:
 * @param props.row - Flex direction row (horizontal)
 * @param props.column - Flex direction column (vertical)
 * @param props.rowReverse - Flex direction row-reverse
 * @param props.columnReverse - Flex direction column-reverse`;

/**
 * Flexbox props (wrap, reverse)
 */
export const FLEX_PROPS = `
 * FLEXBOX PROPS:
 * @param props.wrap - Enable flex wrap
 * @param props.reverse - Reverse the order of children`;

/**
 * Alignment props (items)
 */
export const ITEMS_PROPS = `
 * ALIGNMENT PROPS (Cross-axis):
 * @param props.itemsStart - Align items to start (top/left)
 * @param props.itemsEnd - Align items to end (bottom/right)
 * @param props.itemsCenter - Align items to center
 * @param props.itemsBaseline - Align items to baseline
 * @param props.itemsStretch - Stretch items to fill container`;

/**
 * Alignment props (justify)
 */
export const JUSTIFY_PROPS = `
 * ALIGNMENT PROPS (Main-axis):
 * @param props.justifyStart - Justify content to start
 * @param props.justifyEnd - Justify content to end
 * @param props.justifyCenter - Justify content to center
 * @param props.justifyBetween - Space between items
 * @param props.justifyAround - Space around items
 * @param props.justifyEvenly - Space evenly between items`;

/**
 * Responsive breakpoint props
 */
export const BREAKPOINT_PROPS = `
 * RESPONSIVE BREAKPOINT PROPS:
 * @param props.mobileCol - Switch to column layout on mobile and below (max-mobile: 48rem)
 * @param props.tabletCol - Switch to column layout on tablet and below (max-tablet: 64rem)
 * @param props.desktopCol - Switch to column layout on desktop and below (max-desktop: 80rem)`;

/**
 * Border props
 */
export const BORDER_PROPS = `
 * BORDER PROPS:
 * @param props.border - Enable border on all sides
 * @param props.borderT - Enable border on top
 * @param props.borderB - Enable border on bottom
 * @param props.borderL - Enable border on left
 * @param props.borderR - Enable border on right
 * @param props.borderX - Enable border on left and right
 * @param props.borderY - Enable border on top and bottom
 * @param props.noBorder - Disable all borders`;

/**
 * Display props
 */
export const DISPLAY_PROPS = `
 * DISPLAY PROPS:
 * @param props.flex - Display as flex container
 * @param props.block - Display as block
 * @param props.inline - Display as inline
 * @param props.inlineBlock - Display as inline-block
 * @param props.inlineFlex - Display as inline-flex
 * @param props.grid - Display as grid
 * @param props.inlineGrid - Display as inline-grid
 * @param props.contents - Display as contents
 * @param props.hidden - Hide element (display: none)`;

/**
 * Position props
 */
export const POSITION_PROPS = `
 * POSITION PROPS:
 * @param props.relative - Relative positioning
 * @param props.absolute - Absolute positioning
 * @param props.fixed - Fixed positioning
 * @param props.sticky - Sticky positioning
 * @param props.static - Static positioning`;

/**
 * Overflow props
 */
export const OVERFLOW_PROPS = `
 * OVERFLOW PROPS:
 * @param props.overflowAuto - Auto overflow on both axes
 * @param props.overflowHidden - Hidden overflow on both axes
 * @param props.overflowVisible - Visible overflow on both axes
 * @param props.overflowScroll - Scrollable overflow on both axes
 * @param props.overflowXAuto - Auto overflow on X axis
 * @param props.overflowYAuto - Auto overflow on Y axis
 * @param props.overflowXHidden - Hidden overflow on X axis
 * @param props.overflowYHidden - Hidden overflow on Y axis`;

/**
 * Link/Tag polymorphism props
 */
export const LINK_TAG_PROPS = `
 * LINK & TAG PROPS:
 * @param props.href - URL to navigate to (renders component as anchor tag)
 * @param props.tag - Custom HTML tag or React component to render as`;

/**
 * Tag only props (for components without link mode)
 */
export const TAG_PROPS = `
 * TAG PROPS:
 * @param props.tag - Custom HTML tag to render as`;

/**
 * Transparent props
 */
export const TRANSPARENT_PROPS = `
 * TRANSPARENCY PROPS:
`;

/**
 * List style props
 */
export const LIST_STYLE_PROPS = `
 * LIST STYLE PROPS:
 * @param props.disc - Bullet point list style
 * @param props.decimal - Numbered list style`;

/**
 * Visibility props (hide at breakpoints)
 */
export const VISIBILITY_PROPS = `
 * VISIBILITY PROPS:
 * @param props.xsHide - Hide on extra small screens
 * @param props.smHide - Hide on small screens
 * @param props.mdHide - Hide on medium screens
 * @param props.lgHide - Hide on large screens
 * @param props.xlHide - Hide on extra large screens`;

/**
 * Commonly used prop combinations
 */

// Typography components get all text styling props
export const TYPOGRAPHY_STYLE_PROPS = [
  FONT_FAMILY_PROPS,
  FONT_WEIGHT_PROPS,
  FONT_STYLE_PROPS,
  TEXT_DECORATION_PROPS,
  TEXT_TRANSFORM_PROPS,
  TEXT_ALIGN_PROPS,
].join('\n *\n');

// Complete alignment props (items + justify)
export const ALIGNMENT_PROPS = [ITEMS_PROPS, JUSTIFY_PROPS].join('\n *\n');

// Complete flexbox props (direction + wrap/reverse + alignment)
export const COMPLETE_FLEX_PROPS = [
  FLEX_DIRECTION_PROPS,
  FLEX_PROPS,
  ITEMS_PROPS,
  JUSTIFY_PROPS,
].join('\n *\n');

/**
 * Helper function to build component JSDoc from sections
 */
export function buildComponentDoc(config: {
  name: string;
  description: string;
  examples: string[];
  propSections: string[];
  propsType: string;
  notes?: string[];
}): string {
  const { name, description, examples, propSections, propsType, notes } = config;

  const examplesBlock = examples
    .map((ex) => ` * ${ex}`)
    .join('\n');

  const notesBlock = notes?.length
    ? '\n *\n * ' + notes.map(note => `@note ${note}`).join('\n * ')
    : '';

  const propsBlock = propSections.join('\n *\n');

  return `/**
 * ${name} - ${description}
 *
 * @example
 * \`\`\`tsx
${examplesBlock}
 * \`\`\`
 *${notesBlock}
 *
${COMMON_PROPS}
 *
${propsBlock}
 *
 * @see {@link ${propsType}} for the complete type definition
 */`;
}

/**
 * Pre-configured documentation builders for common component types
 */

export const UI_COMPONENT_SECTIONS = [
  SIZE_PROPS,
  APPEARANCE_PROPS_UI,
  VARIANT_PROPS,
  SHAPE_PROPS,
  FONT_FAMILY_PROPS,
  FONT_WEIGHT_PROPS,
  VISUAL_DECORATION_PROPS,
  LAYOUT_PROPS,
  LINK_TAG_PROPS,
];

export const LAYOUT_COMPONENT_SECTIONS = [
  SIZE_PROPS,
  APPEARANCE_PROPS_LAYOUT,
  LAYOUT_PROPS,
  COMPLETE_FLEX_PROPS,
  BREAKPOINT_PROPS,
  DISPLAY_PROPS,
  VISIBILITY_PROPS,
  TAG_PROPS,
];

export const TYPOGRAPHY_COMPONENT_SECTIONS = [
  SIZE_PROPS,
  APPEARANCE_PROPS_TEXT,
  TYPOGRAPHY_STYLE_PROPS,
  LINK_TAG_PROPS,
];
