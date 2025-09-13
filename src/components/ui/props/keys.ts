/** Core layout properties for positioning and sizing elements */
export const LAYOUT_CORE = ['size', 'hide', 'items', 'justify', 'position', 'display', 'overflow'] as const;
/** Flexbox-specific layout properties for flex containers */
export const LAYOUT_FLEX = ['wrap', 'gap', 'flexDirection', 'reverse'] as const;
/** Padding properties for internal spacing control */
export const PADDING = ['padding'] as const;
/** Responsive breakpoint properties for different screen sizes */
export const BREAKPOINT = ['breakpoint'] as const;
/** Core visual properties including appearance colors and transparency */
export const VISUAL_CORE = ['appearance', 'transparent'] as const;
/** Visual decoration properties for borders, shadows, and focus rings */
export const VISUAL_DECORATION = ['border', 'shadow', 'ring', 'focusVisible'] as const;
/** Layout-specific visual decoration (excluding focusVisible for non-interactive elements) */
export const VISUAL_DECORATION_LAYOUT = ['border', 'shadow', 'ring'] as const;
/** Shape properties for border radius and corner rounding */
export const SHAPE = ['shape'] as const;
/** Typography styling properties for text appearance and formatting */
export const TYPOGRAPHY_STYLE = ['fontWeight', 'fontStyle', 'textDecoration', 'textTransform', 'fontFamily', 'textAlign'] as const;
/** List-specific styling properties for bullet points and numbering */
export const LIST_STYLE = ['listStyle'] as const;
/** Variant properties for filled/outline styling modes */
export const VARIANT = ['variant'] as const;

/** All available component property categories combined */
export const COMPONENT_PROPS_CATEGORY = [
  ...VISUAL_CORE,
  ...LAYOUT_FLEX,
  ...TYPOGRAPHY_STYLE,
  ...LIST_STYLE,
  ...LAYOUT_CORE,
  ...BREAKPOINT,
  ...PADDING,
  ...VISUAL_DECORATION,
  ...SHAPE,
  ...VARIANT,
  'mode',
] as const;

/**
 * Describes category for which the appearance can be applied
 * @see ComponentKeys.appearance
 */
export const APPEARANCE_CATEGORY = ['text', 'border', 'ring', 'shadow', 'bg', 'accent', 'focusVisible'] as const;
/** Type for appearance category keys used in theming */
export type AppearanceCategoryKey = typeof APPEARANCE_CATEGORY[number];

/** Type for all component category keys */
export type ComponentCategoryKey = typeof COMPONENT_PROPS_CATEGORY[number];

// Import individual property constants from separate files
import { APPEARANCE_VALUES } from './appearance';
import { BORDER_VALUES } from './border';
import { BREAKPOINT_VALUES } from './breakpoint';
import { DISPLAY_VALUES } from './display';
import { FLEX_DIRECTION_VALUES } from './flexDirection';
import { FONT_FAMILY_VALUES } from './fontFamily';
import { FONT_STYLE_VALUES } from './fontStyle';
import { FONT_WEIGHT_VALUES } from './fontWeight';
import { GAP_VALUES } from './gap';
import { HIDE_VALUES } from './hide';
import { ITEMS_VALUES } from './items';
import { JUSTIFY_VALUES } from './justify';
import { LIST_STYLE_VALUES } from './listStyle';
import { MODE_VALUES } from './mode';
import { OVERFLOW_VALUES } from './overflow';
import { PADDING_VALUES } from './padding';
import { POSITION_VALUES } from './position';
import { REVERSE_VALUES } from './reverse';
import { RING_VALUES } from './ring';
import { SHADOW_VALUES } from './shadow';
import { FOCUS_VISIBLE_VALUES } from './focusVisible';
import { SHAPE_VALUES } from './shape';
import { SIZE_VALUES } from './size';
import { TEXT_ALIGN_VALUES } from './textAlign';
import { TEXT_DECORATION_VALUES } from './textDecoration';
import { TEXT_TRANSFORM_VALUES } from './textTransform';
import { TRANSPARENT_VALUES } from './transparent';
import { VARIANT_VALUES } from './variant';
import { WRAP_VALUES } from './wrap';

// Re-export all individual constants for backward compatibility
export * from './appearance';
export * from './border';
export * from './breakpoint';
export * from './display';
export * from './flexDirection';
export * from './fontFamily';
export * from './fontStyle';
export * from './fontWeight';
export * from './gap';
export * from './hide';
export * from './items';
export * from './justify';
export * from './listStyle';
export * from './mode';
export * from './overflow';
export * from './padding';
export * from './position';
export * from './reverse';
export * from './ring';
export * from './shadow';
export * from './focusVisible';
export * from './shape';
export * from './size';
export * from './textAlign';
export * from './textDecoration';
export * from './textTransform';
export * from './transparent';
export * from './variant';
export * from './wrap';

/** Component property keys mapping categories to their available values */
export const ComponentKeys = {
  /** Color appearance options */
  appearance: APPEARANCE_VALUES,
  /** Border visibility: border (show) or noBorder (hide) */
  border: BORDER_VALUES,
  /** Column breakpoints for responsive grid layouts */
  breakpoint: BREAKPOINT_VALUES,
  /** CSS display property values for element layout behavior */
  display: DISPLAY_VALUES,
  /** Flex direction: row (horizontal), column (vertical), or reversed variants */
  flexDirection: FLEX_DIRECTION_VALUES,
  /** Font family types: sans-serif, serif, or monospace */
  fontFamily: FONT_FAMILY_VALUES,
  /** Font style: italic or notItalic (normal) */
  fontStyle: FONT_STYLE_VALUES,
  /** Font weight from thin (100) to black (900) */
  fontWeight: FONT_WEIGHT_VALUES,
  /** Spacing between flex/grid items: gap (enabled) or noGap (disabled) */
  gap: GAP_VALUES,
  /** Hide elements at specific breakpoint sizes */
  hide: HIDE_VALUES,
  /** Cross-axis alignment for flex items (align-items) */
  items: ITEMS_VALUES,
  /** Main-axis alignment for flex items (justify-content) */
  justify: JUSTIFY_VALUES,
  /** List bullet/numbering style: disc (bullets) or decimal (numbers) */
  listStyle: LIST_STYLE_VALUES,
  /** Interaction states for styling: base, hover, active */
  mode: MODE_VALUES,
  /** Overflow behavior for content that exceeds container bounds */
  overflow: OVERFLOW_VALUES,
  /** Internal spacing: padding (enabled) or noPadding (disabled) */
  padding: PADDING_VALUES,
  /** CSS positioning: relative, absolute, fixed, sticky, static */
  position: POSITION_VALUES,
  /** Reverse the order of flex items */
  reverse: REVERSE_VALUES,
  /** Focus ring visibility: ring (show) or noRing (hide) */
  ring: RING_VALUES,
  /** Drop shadow visibility: shadow (enabled) or noShadow (disabled) */
  shadow: SHADOW_VALUES,
  /** Focus-visible outline visibility: focusVisible (show) or noFocusVisible (hide) */
  focusVisible: FOCUS_VISIBLE_VALUES,
  /** Border radius shape: pill (fully rounded), sharp (no radius), rounded (medium radius) */
  shape: SHAPE_VALUES,
  /** Size scale from extra-small to extra-large */
  size: SIZE_VALUES,
  /** Text alignment: left, center, right, justify */
  textAlign: TEXT_ALIGN_VALUES,
  /** Text decoration: underline, strikethrough (lineThrough), none (noUnderline), overline */
  textDecoration: TEXT_DECORATION_VALUES,
  /** Text case transformation: UPPERCASE, lowercase, Capitalize, normalCase */
  textTransform: TEXT_TRANSFORM_VALUES,
  /** Make background (layout/UI) or text (typography) transparent */
  transparent: TRANSPARENT_VALUES,
  /** Style variant: filled (solid background) or outline (border only) */
  variant: VARIANT_VALUES,
  /** Flex item wrapping behavior: wrap, no-wrap, or wrap-reverse */
  wrap: WRAP_VALUES,
} as const;

/** Interaction state keys for component styling modes */
export type ModeKey = typeof ComponentKeys.mode[number];
/** Size scale keys: xs, sm, md, lg, xl */
export type SizeKey = typeof ComponentKeys.size[number];
/** Style variant keys: filled or outline */
export type VariantKey = typeof ComponentKeys.variant[number];
/** Color appearance keys for semantic styling */
export type AppearanceKey = typeof ComponentKeys.appearance[number];
/** Transparency key for making backgrounds or text transparent */
export type TransparentKey = typeof ComponentKeys.transparent[number];
/** List style keys for bullet points and numbering */
export type ListStyleKey = typeof ComponentKeys.listStyle[number];
/** Font family keys: sans, serif, mono */
export type FontFamilyKey = typeof ComponentKeys.fontFamily[number];
/** Font weight keys from thin to black */
export type FontWeightKey = typeof ComponentKeys.fontWeight[number];
/** Font style keys: italic or notItalic */
export type FontStyleKey = typeof ComponentKeys.fontStyle[number];
/** Text decoration keys: underline, lineThrough, noUnderline, overline */
export type TextDecorationKey = typeof ComponentKeys.textDecoration[number];
/** Text case transformation keys: uppercase, lowercase, capitalize, normalCase */
export type TextTransformKey = typeof ComponentKeys.textTransform[number];
/** Text alignment keys: textLeft, textCenter, textRight, textJustify */
export type TextAlignKey = typeof ComponentKeys.textAlign[number];
/** Responsive breakpoint column keys for grid layouts */
export type BreakpointKey = typeof ComponentKeys.breakpoint[number];
/** Breakpoint-specific hide keys for responsive visibility */
export type HideKey = typeof ComponentKeys.hide[number];
/** CSS position keys: relative, absolute, fixed, sticky, static */
export type PositionKey = typeof ComponentKeys.position[number];
/** Flex direction keys: row, column, rowReverse, columnReverse */
export type FlexDirectionKey = typeof ComponentKeys.flexDirection[number];
/** Flex align-items keys for cross-axis alignment */
export type ItemsKey = typeof ComponentKeys.items[number];
/** Flex justify-content keys for main-axis alignment */
export type JustifyKey = typeof ComponentKeys.justify[number];
/** Flex wrap keys: flexWrap, flexNoWrap, flexWrapReverse */
export type WrapKey = typeof ComponentKeys.wrap[number];
/** CSS display property keys for layout behavior */
export type DisplayKey = typeof ComponentKeys.display[number];
/** CSS overflow property keys for content clipping behavior */
export type OverflowKey = typeof ComponentKeys.overflow[number];
/** Focus-visible outline keys: focusVisible or noFocusVisible */
export type FocusVisibleKey = typeof ComponentKeys.focusVisible[number];

/** Composite categories built from core blocks */
/** Complete layout category including core and flex properties */
export const LAYOUT_FULL = [...LAYOUT_CORE, ...LAYOUT_FLEX] as const;
/** Complete visual category including core, decoration, and shape properties */
export const VISUAL_FULL = [...VISUAL_CORE, ...VISUAL_DECORATION, ...SHAPE] as const;
/** Layout-specific visual category (excludes focusVisible for non-interactive elements) */
export const VISUAL_LAYOUT = [...VISUAL_CORE, ...VISUAL_DECORATION_LAYOUT, ...SHAPE] as const;
/** Complete typography category for text styling */
export const TYPOGRAPHY_FULL = [...TYPOGRAPHY_STYLE] as const;

/** Categories for interactive components like buttons, badges, chips */
export const INTERACTIVE_CATEGORIES = [...LAYOUT_FULL, ...VISUAL_FULL, ...TYPOGRAPHY_STYLE, ...PADDING, ...VARIANT] as const;
/** Button component categories */
export const BUTTON_CATEGORIES = INTERACTIVE_CATEGORIES;
/** Badge component categories */
export const BADGE_CATEGORIES = INTERACTIVE_CATEGORIES;
/** Chip component categories */
export const CHIP_CATEGORIES = INTERACTIVE_CATEGORIES;
/** Code component categories */
export const CODE_CATEGORIES = INTERACTIVE_CATEGORIES;

/** Typography component categories */
/** Categories for typography components like Text, Title, Link */
export const TYPOGRAPHY_CATEGORIES = [...TYPOGRAPHY_FULL, ...LAYOUT_CORE, ...VISUAL_CORE, ...VARIANT] as const;
/** Categories for list components with typography and list-specific styling */
export const LIST_CATEGORIES = [...TYPOGRAPHY_FULL, ...LIST_STYLE, ...LAYOUT_CORE, ...VISUAL_CORE, ...PADDING, ...VARIANT] as const;

/** Layout component categories */
/** Categories for grid layout components */
export const GRID_CATEGORIES = [...LAYOUT_FULL, ...VISUAL_CORE, ...VARIANT] as const;
/** Categories for container layout components */
export const CONTAINER_CATEGORIES = [...LAYOUT_FULL, ...VISUAL_LAYOUT, ...VARIANT] as const;
/** Categories for column layout components */
export const COL_CATEGORIES = [...LAYOUT_FULL, ...VISUAL_LAYOUT, ...VARIANT] as const;
/** Categories for row layout components with responsive breakpoints */
export const ROW_CATEGORIES = [...LAYOUT_FULL, ...BREAKPOINT, ...VISUAL_LAYOUT, ...VARIANT] as const;
/** Categories for stack layout components with responsive and padding support */
export const STACK_CATEGORIES = [...LAYOUT_FULL, ...BREAKPOINT, ...PADDING, ...VISUAL_LAYOUT, ...VARIANT] as const;
/** Categories for card components with full typography and layout support */
export const CARD_CATEGORIES = [...TYPOGRAPHY_FULL, ...LAYOUT_FULL, ...BREAKPOINT, ...VISUAL_LAYOUT, ...PADDING, ...VARIANT] as const;
/** Categories for divider components with basic layout and visual properties */
export const DIVIDER_CATEGORIES = [...LAYOUT_CORE, ...VISUAL_CORE, ...PADDING] as const;
/** Categories for section layout components with full responsive support */
export const SECTION_CATEGORIES = [...LAYOUT_FULL, ...VISUAL_LAYOUT, ...PADDING, ...BREAKPOINT, ...VARIANT] as const;

/** Form component categories */
/** Categories for checkbox form components */
export const CHECKBOX_CATEGORIES = [...LAYOUT_CORE, ...VISUAL_CORE, ...VISUAL_DECORATION, ...SHAPE, ...VARIANT] as const;
/** Categories for label form components with typography support */
export const LABEL_CATEGORIES = [...TYPOGRAPHY_FULL, ...LAYOUT_FULL, ...VISUAL_CORE, ...VARIANT] as const;
/** Categories for input form components with interactive and form-specific properties */
export const INPUT_CATEGORIES = [...INTERACTIVE_CATEGORIES] as const;

/** Media component categories */
/** Categories for image media components */
export const IMG_CATEGORIES = [...LAYOUT_CORE, ...VISUAL_CORE, ...VISUAL_DECORATION, ...SHAPE, ...VARIANT] as const;

/** Props type mapping category keys to their possible values */
export type CategoryProps = {
  [K in ComponentCategoryKey]?: (typeof ComponentKeys)[K][number];
};

/** All available component names in the library */
export const COMPONENT = ['button', 'badge', 'chip', 'code', 'card', 'divider', 'container', 'row', 'col', 'stack', 'section',
  'grid2', 'grid3', 'grid4', 'grid5', 'grid6', 'pageTitle', 'sectionTitle', 'title', 'text', 'link', 'list', 'listItem', 'checkbox', 'label', 'img', 'input'] as const;
/** Type for component name keys */
export type ComponentKey = typeof COMPONENT[number];

/** Mapping of each component to its available property categories */
export const ComponentCategories: Record<ComponentKey, readonly string[]> = {
  badge: BADGE_CATEGORIES,
  button: BUTTON_CATEGORIES,
  card: CARD_CATEGORIES,
  checkbox: CHECKBOX_CATEGORIES,
  chip: CHIP_CATEGORIES,
  code: CODE_CATEGORIES,
  col: COL_CATEGORIES,
  container: CONTAINER_CATEGORIES,
  divider: DIVIDER_CATEGORIES,
  grid2: GRID_CATEGORIES,
  grid3: GRID_CATEGORIES,
  grid4: GRID_CATEGORIES,
  grid5: GRID_CATEGORIES,
  grid6: GRID_CATEGORIES,
  img: IMG_CATEGORIES,
  input: INPUT_CATEGORIES,
  label: LABEL_CATEGORIES,
  link: TYPOGRAPHY_CATEGORIES,
  list: LIST_CATEGORIES,
  listItem: TYPOGRAPHY_CATEGORIES,
  pageTitle: TYPOGRAPHY_CATEGORIES,
  row: ROW_CATEGORIES,
  section: SECTION_CATEGORIES,
  sectionTitle: TYPOGRAPHY_CATEGORIES,
  stack: STACK_CATEGORIES,
  text: TYPOGRAPHY_CATEGORIES,
  title: TYPOGRAPHY_CATEGORIES
}
