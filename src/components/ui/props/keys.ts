// Import shared building blocks from categoryBuilders (no circular dependencies)
// Import for local use
import {
  LAYOUT_CORE,
  LAYOUT_FLEX,
  PADDING,
  BREAKPOINT,
  VISUAL_CORE,
  BORDER,
  VISUAL_DECORATION,
  VISUAL_DECORATION_LAYOUT,
  SHAPE,
  TEXT_ALIGN,
  TRUNCATE,
  TYPOGRAPHY_STYLE_CORE,
  TYPOGRAPHY_STYLE,
  LIST_STYLE,
  VARIANT,
  TRANSPARENT,
  RESPONSIVE,
  WIDTH,
  COMMON_MODIFIERS,
  LAYOUT_FULL,
  VISUAL_FULL,
  VISUAL_LAYOUT,
  TYPOGRAPHY_FULL,
  PLACEMENT,
  DISABLED,
} from './categoryBuilders';

// Re-export for backward compatibility
export {
  LAYOUT_CORE,
  LAYOUT_FLEX,
  PADDING,
  BREAKPOINT,
  VISUAL_CORE,
  BORDER,
  VISUAL_DECORATION,
  VISUAL_DECORATION_LAYOUT,
  SHAPE,
  TEXT_ALIGN,
  TRUNCATE,
  TYPOGRAPHY_STYLE_CORE,
  TYPOGRAPHY_STYLE,
  LIST_STYLE,
  VARIANT,
  TRANSPARENT,
  RESPONSIVE,
  WIDTH,
  COMMON_MODIFIERS,
  LAYOUT_FULL,
  VISUAL_FULL,
  VISUAL_LAYOUT,
  TYPOGRAPHY_FULL,
  PLACEMENT,
  DISABLED,
};

// Import component-specific categories from their folders
import {
  BADGE_CATEGORIES,
  BUTTON_CATEGORIES,
  CHIP_CATEGORIES,
  CODE_CATEGORIES,
  CONTAINER_CATEGORIES,
  GRID_CATEGORIES,
  ROW_CATEGORIES,
  STACK_CATEGORIES,
} from './categoryBuilders';
import { CARD_CATEGORIES } from '../card/CardCategories';
import { COL_CATEGORIES } from '../col/ColCategories';
import { DIVIDER_CATEGORIES } from '../divider/DividerCategories';
import { IMG_CATEGORIES } from '../img/ImgCategories';
import { SECTION_CATEGORIES } from '../section/SectionCategories';
import { LABEL_CATEGORIES } from '../label/LabelCategories';
import { INPUT_CATEGORIES } from '../input/InputCategories';
import { OVERLAY_CATEGORIES } from '../overlay/OverlayCategories';
import { MODAL_CATEGORIES } from '../modal/ModalCategories';
import { POPUP_CATEGORIES } from '../popup/PopupCategories';
import { CHECKBOX_CATEGORIES } from '../checkbox/CheckboxCategories';
import { TYPOGRAPHY_CATEGORIES, LIST_CATEGORIES } from '../typography/common/TypographyCategories';

// Re-export for backward compatibility
export { BADGE_CATEGORIES };
export { BUTTON_CATEGORIES };
export { CARD_CATEGORIES };
export { CHIP_CATEGORIES };
export { CODE_CATEGORIES };
export { COL_CATEGORIES };
export { CONTAINER_CATEGORIES };
export { DIVIDER_CATEGORIES };
export { GRID_CATEGORIES };
export { ROW_CATEGORIES };
export { IMG_CATEGORIES };
export { SECTION_CATEGORIES };
export { STACK_CATEGORIES };
export { LABEL_CATEGORIES };
export { INPUT_CATEGORIES };
export { OVERLAY_CATEGORIES };
export { MODAL_CATEGORIES };
export { POPUP_CATEGORIES };
export { CHECKBOX_CATEGORIES };
export { TYPOGRAPHY_CATEGORIES, LIST_CATEGORIES };

/** Blur effect property for backdrop blur */
export const BLUR = ['blur'] as const;
/** Pointer events property for controlling element interactivity */
export const POINTER_EVENTS = ['pointerEvents'] as const;
/** Cursor appearance property */
export const CURSOR = ['cursor'] as const;
/** Transition/animation property */
export const TRANSITION = ['transition'] as const;
/** Whitespace/text wrapping property */
export const WHITESPACE = ['whitespace'] as const;
/** Object fit property for images/videos */
export const OBJECT_FIT = ['objectFit'] as const;
/** Status property for form validation state */
export const STATUS = ['status'] as const;
/** Orientation property for horizontal/vertical layout */
export const ORIENTATION = ['orientation'] as const;
/** Height property for controlling element height */
export const HEIGHT = ['height'] as const;
/** Letter spacing property for text tracking */
export const LETTER_SPACING = ['letterSpacing'] as const;

/** All available component property categories combined */
export const COMPONENT_PROPS_CATEGORY = [
  ...VISUAL_CORE,
  ...LAYOUT_FLEX,
  ...TYPOGRAPHY_STYLE,
  ...LIST_STYLE,
  ...LAYOUT_CORE,
  ...BREAKPOINT,
  ...PADDING,
  ...BORDER,
  ...VISUAL_DECORATION,
  ...SHAPE,
  ...VARIANT,
  ...TRANSPARENT,
  ...RESPONSIVE,
  ...BLUR,
  ...POINTER_EVENTS,
  ...CURSOR,
  ...TRANSITION,
  ...WHITESPACE,
  ...OBJECT_FIT,
  ...WIDTH,
  ...HEIGHT,
  ...TRUNCATE,
  ...STATUS,
  ...ORIENTATION,
  ...LETTER_SPACING,
  ...PLACEMENT,
  ...DISABLED,
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

/** Component property keys mapping categories to their available values */
export const ComponentKeys = {
  /** Color appearance options */
  appearance: ['primary', 'brand', 'accent', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info', 'link', 'inherit'] as const,
  /** Border visibility: includes all border variations and noBorder (border, borderT, borderB, etc., noBorder) */
  border: ['border', 'borderT', 'borderB', 'borderL', 'borderR', 'borderX', 'borderY', 'noBorder'] as const,
  /** Column breakpoints for responsive grid layouts */
  breakpoint: ['mobileCol', 'tabletCol', 'desktopCol'] as const,
  /** CSS display property values for element layout behavior */
  display: ['inline', 'block', 'inlineBlock', 'flex', 'inlineFlex', 'grid', 'inlineGrid', 'contents', 'table', 'tableCell', 'hidden'] as const,
  /** Flex direction: row (horizontal), column (vertical), or reversed variants */
  flexDirection: ['row', 'column', 'rowReverse', 'columnReverse'] as const,
  /** Font family types: sans-serif, serif, or monospace */
  fontFamily: ['sans', 'serif', 'mono'] as const,
  /** Font style: italic or notItalic (normal) */
  fontStyle: ['italic', 'notItalic'] as const,
  /** Font weight from thin (100) to black (900) */
  fontWeight: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'] as const,
  /** Spacing between flex/grid items: gap (enabled) or noGap (disabled) */
  gap: ['gap', 'noGap'] as const,
  /** Hide elements at specific breakpoint sizes */
  hide: ['mobileHide', 'tabletHide', 'desktopHide'] as const,
  /** Cross-axis alignment for flex items (align-items) */
  items: ['itemsStart', 'itemsEnd', 'itemsCenter', 'itemsBaseline', 'itemsStretch'] as const,
  /** Main-axis alignment for flex items (justify-content) */
  justify: ['justifyStart', 'justifyEnd', 'justifyCenter', 'justifyBetween', 'justifyAround', 'justifyEvenly', 'justifyStretch', 'justifyBaseline'] as const,
  /** List bullet/numbering style: disc (bullets) or decimal (numbers) */
  listStyle: ['disc', 'decimal'] as const,
  /** Overflow behavior for content that exceeds container bounds */
  overflow: [
    'overflowAuto', 'overflowHidden', 'overflowClip', 'overflowVisible', 'overflowScroll',
    'overflowXAuto', 'overflowYAuto', 'overflowXHidden', 'overflowYHidden',
    'overflowXClip', 'overflowYClip', 'overflowXVisible', 'overflowYVisible',
    'overflowXScroll', 'overflowYScroll'
  ] as const,
  /** Internal spacing: padding (enabled) or noPadding (disabled) */
  padding: ['padding', 'noPadding'] as const,
  /** CSS positioning: relative, absolute, fixed, sticky, static */
  position: ['relative', 'absolute', 'fixed', 'sticky', 'static'] as const,
  /** Reverse the order of flex items */
  reverse: ['reverse'] as const,
  /** Focus ring visibility: ring (show) or noRing (hide) */
  ring: ['ring', 'noRing'] as const,
  /** Drop shadow visibility: shadow (enabled) or noShadow (disabled) */
  shadow: ['shadow', 'noShadow'] as const,
  /** Focus-visible outline visibility: focusVisible (show) or noFocusVisible (hide) */
  focusVisible: ['focusVisible', 'noFocusVisible'] as const,
  /** Border radius shape: pill (fully rounded), sharp (no radius), rounded (medium radius) */
  shape: ['pill', 'sharp', 'rounded'] as const,
  /** Size scale from extra-small to extra-large */
  size: ['xs', 'sm', 'md', 'lg', 'xl'] as const,
  /** Text alignment: left, center, right, justify */
  textAlign: ['textLeft', 'textCenter', 'textRight', 'textJustify'] as const,
  /** Text decoration: underline, strikethrough (lineThrough), none (noUnderline), overline */
  textDecoration: ['underline', 'lineThrough', 'noUnderline', 'overline'] as const,
  /** Text case transformation: UPPERCASE, lowercase, Capitalize, normalCase */
  textTransform: ['uppercase', 'lowercase', 'capitalize', 'normalCase'] as const,
  /** Style variant: filled (solid background) or outline (border only) */
  variant: ['filled', 'outline'] as const,
  /** Flex item wrapping behavior: wrap, no-wrap, or wrap-reverse */
  wrap: ['flexWrap', 'flexNoWrap', 'flexWrapReverse'] as const,
  /** Transparent background: disables background color when true */
  transparent: ['transparent'] as const,
  /** Responsive sizing: enables breakpoint-specific py/px/gap/fs when true */
  responsive: ['responsive'] as const,
  /** Backdrop blur effect: blur (enabled) or noBlur (disabled) */
  blur: ['blur', 'noBlur'] as const,
  /** Pointer events: none (clicks pass through) or auto (normal) */
  pointerEvents: ['pointerEventsNone', 'pointerEventsAuto'] as const,
  /** Cursor appearance for interactive elements */
  cursor: ['cursorPointer', 'cursorDefault', 'cursorNotAllowed', 'cursorNone', 'cursorText', 'cursorMove', 'cursorWait'] as const,
  /** Transition effects for state changes */
  transition: ['transition', 'noTransition'] as const,
  /** Whitespace and text wrapping behavior */
  whitespace: ['whitespaceNowrap', 'whitespaceNormal', 'whitespacePre', 'whitespacePreWrap', 'whitespacePreLine', 'whitespaceBreakSpaces'] as const,
  /** Object fit for images and videos */
  objectFit: ['objectCover', 'objectContain', 'objectFill', 'objectNone', 'objectScaleDown'] as const,
  /** Width control for element sizing */
  width: ['wFull', 'wFit', 'wAuto'] as const,
  /** Truncate control for text overflow */
  truncate: ['truncate', 'lineClamp2', 'lineClamp3', 'lineClamp4', 'lineClamp5', 'noTruncate'] as const,
  /** Status for form validation state */
  status: ['error'] as const,
  /** Orientation for horizontal/vertical layout */
  orientation: ['horizontal', 'vertical'] as const,
  /** Height control for element sizing */
  height: ['hFit', 'hFull', 'hAuto'] as const,
  /** Letter spacing for text tracking */
  letterSpacing: ['trackingTighter', 'trackingTight', 'trackingNormal', 'trackingWide', 'trackingWider', 'trackingWidest'] as const,
  /** Placement position for floating elements (popups, tooltips, dropdowns) */
  placement: ['top', 'topStart', 'topEnd', 'bottom', 'bottomStart', 'bottomEnd', 'left', 'leftStart', 'leftEnd', 'right', 'rightStart', 'rightEnd'] as const,
  /** Disabled state for interactive elements */
  disabled: ['disabled'] as const,
} as const;

/** All border side keys (excluding noBorder since it doesn't have a CSS class) */
export const BORDER_KEYS = ['border', 'borderT', 'borderB', 'borderL', 'borderR', 'borderX', 'borderY'] as const;

/** Type for all border side keys (excluding noBorder) */
export type BorderKey = typeof BORDER_KEYS[number];

/** Size scale keys: xs, sm, md, lg, xl */
export type SizeKey = typeof ComponentKeys.size[number];
/** Style variant keys: filled or outline */
export type VariantKey = typeof ComponentKeys.variant[number];
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
/** Backdrop blur keys: blur or noBlur */
export type BlurKey = typeof ComponentKeys.blur[number];
/** Pointer events keys: pointerEventsNone or pointerEventsAuto */
export type PointerEventsKey = typeof ComponentKeys.pointerEvents[number];
/** Cursor appearance keys */
export type CursorKey = typeof ComponentKeys.cursor[number];
/** Transition effect keys */
export type TransitionKey = typeof ComponentKeys.transition[number];
/** Whitespace behavior keys */
export type WhitespaceKey = typeof ComponentKeys.whitespace[number];
/** Object fit keys for images/videos */
export type ObjectFitKey = typeof ComponentKeys.objectFit[number];
/** Width keys for element sizing */
export type WidthKey = typeof ComponentKeys.width[number];
/** Truncate keys for text overflow */
export type TruncateKey = typeof ComponentKeys.truncate[number];
/** Status keys for form validation */
export type StatusKey = typeof ComponentKeys.status[number];
/** Orientation keys for horizontal/vertical layout */
export type OrientationKey = typeof ComponentKeys.orientation[number];
/** Height keys for element sizing */
export type HeightKey = typeof ComponentKeys.height[number];
/** Letter spacing keys for text tracking */
export type LetterSpacingKey = typeof ComponentKeys.letterSpacing[number];
/** Placement position keys for floating elements */
export type PlacementKey = typeof ComponentKeys.placement[number];
/** Disabled state key */
export type DisabledKey = typeof ComponentKeys.disabled[number];

/** Shape keys for border radius: pill, sharp, rounded */
export type ShapeKey = typeof ComponentKeys.shape[number];

// ============================================================================
// Internal Styling State Keys (for theme implementation, not user-facing props)
// ============================================================================

/** Base state - default resting appearance */
export const BASE = 'base' as const;
/** Hover state - appearance when cursor hovers over element */
export const HOVER = 'hover' as const;
/** Active state - appearance when element is being pressed/clicked */
export const ACTIVE = 'active' as const;
/** Focus state - appearance when element receives focus */
export const FOCUS = 'focus' as const;
/** Focus visible state - appearance when element has visible focus indicator */
export const FOCUS_VISIBLE = 'focusVisible' as const;

/** All mode property values for internal styling states */
export const MODE_VALUES = [BASE, HOVER, ACTIVE, FOCUS, FOCUS_VISIBLE] as const;

/** Styling mode keys for different interaction states (internal use by themes) */
export const ModeKeys = {
  /** Interaction states for styling: base, hover, active, focus, focusVisible */
  mode: MODE_VALUES,
} as const;

/** Type for mode keys - internal styling states */
export type ModeKey = typeof ModeKeys.mode[number];

// ============================================================================
// Theme Class Keys (for internal theme implementation)
// ============================================================================

/** Common responsive breakpoint keys used across all themes (includes 'base' for non-responsive mode) */
export const RESPONSIVE_BREAKPOINT_KEYS = ['base', 'desktop', 'tablet', 'mobile'] as const;
/** Type for responsive breakpoint class keys - used by GapClassMapper, PyClassMapper, PxClassMapper, FontSizeClassMapper */
export type ResponsiveBreakpointClassKey = typeof RESPONSIVE_BREAKPOINT_KEYS[number];
/** Left padding theme class key */
export type PlClassKey = 'pl';
/** Line height theme class key */
export type LineHeightClassKey = 'lineHeight';

/** Categories for interactive components like buttons, badges, chips */
export const INTERACTIVE_CATEGORIES = [...LAYOUT_FULL, ...VISUAL_FULL, ...TYPOGRAPHY_STYLE, ...PADDING, ...VARIANT, ...CURSOR, ...TRANSITION, ...WHITESPACE, ...WIDTH, ...HEIGHT, ...COMMON_MODIFIERS, ...DISABLED] as const;

/** Typography component categories are now imported from their component folder */

/** Form component categories are now imported from their component folders */

/** Media component categories are now imported from their component folders */

/** Modal component categories are now imported from their component folder */

/** Props type mapping category keys to their possible values */
export type CategoryProps = {
  [K in ComponentCategoryKey]?: (typeof ComponentKeys)[K][number];
};

/** All available component names in the library */
export const COMPONENT = ['button', 'badge', 'chip', 'code', 'card', 'divider', 'container', 'row', 'col', 'stack', 'section',
  'grid2', 'grid3', 'grid4', 'grid5', 'grid6', 'pageTitle', 'sectionTitle', 'title', 'text', 'link', 'list', 'listItem', 'checkbox', 'label', 'img', 'input', 'overlay', 'modal', 'popup'] as const;
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
  title: TYPOGRAPHY_CATEGORIES,
  overlay: OVERLAY_CATEGORIES,
  modal: MODAL_CATEGORIES,
  popup: POPUP_CATEGORIES
}
