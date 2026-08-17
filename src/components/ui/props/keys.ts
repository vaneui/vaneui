// Import shared building blocks from categoryBuilders (no circular dependencies)
// Import for local use
import {
  LAYOUT_CORE,
  ALIGN_SELF,
  JUSTIFY_SELF,
  LAYOUT_FLEX,
  PADDING,
  MARGIN,
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
  LIST_POSITION,
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
  READONLY,
  MIN_WIDTH,
  MAX_HEIGHT,
  INHERIT_SIZE,
  INHERIT_COLOR,
  INHERIT_BG,
  INHERIT_BORDER,
} from './categoryBuilders';

// Re-export for backward compatibility
export {
  LAYOUT_CORE,
  LAYOUT_FLEX,
  PADDING,
  MARGIN,
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
  LIST_POSITION,
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
  READONLY,
  MIN_WIDTH,
  MAX_HEIGHT,
  INHERIT_SIZE,
  INHERIT_COLOR,
  INHERIT_BG,
  INHERIT_BORDER,
};

// Import component-specific categories from their folders
import {
  BADGE_CATEGORIES,
  BUTTON_CATEGORIES,
  CHIP_CATEGORIES,
  CODE_CATEGORIES,
  CONTAINER_CATEGORIES,
  GRID_CATEGORIES,
  ICON_CATEGORIES,
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
import { INPUT_ERROR_ICON_CATEGORIES } from '../input/InputErrorIconCategories';
import { INPUT_WRAPPER_CATEGORIES } from '../input/InputWrapperCategories';
import { SELECT_CHEVRON_CATEGORIES } from '../select/SelectChevronCategories';
import { SELECT_WRAPPER_CATEGORIES } from '../select/SelectWrapperCategories';
import { SWITCH_CATEGORIES } from '../switch/SwitchCategories';
import { RADIO_CATEGORIES, RADIO_GROUP_CATEGORIES } from '../radio/RadioCategories';
import { OVERLAY_CATEGORIES } from '../overlay/OverlayCategories';
import { MODAL_CATEGORIES } from '../modal/ModalCategories';
import { POPUP_CATEGORIES } from '../popup/PopupCategories';
import { CHECKBOX_CATEGORIES } from '../checkbox/CheckboxCategories';
import { TYPOGRAPHY_CATEGORIES, LIST_CATEGORIES } from '../typography/common/TypographyCategories';
import { LIST_ITEM_CATEGORIES } from '../typography/listItem/ListItemCategories';
import { LINK_CATEGORIES } from '../typography/link/LinkCategories';
import { MENU_ITEM_CATEGORIES } from '../menu/MenuItemCategories';
import { NAV_LINK_CATEGORIES } from '../navLink/NavLinkCategories';
import { TABLE_CATEGORIES } from '../table/TableCategories';

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
export { ICON_CATEGORIES };
export { ROW_CATEGORIES };
export { IMG_CATEGORIES };
export { SECTION_CATEGORIES };
export { STACK_CATEGORIES };
export { LABEL_CATEGORIES };
export { INPUT_CATEGORIES };
export { INPUT_ERROR_ICON_CATEGORIES };
export { INPUT_WRAPPER_CATEGORIES };
export { SELECT_CHEVRON_CATEGORIES };
export { SELECT_WRAPPER_CATEGORIES };
export { SWITCH_CATEGORIES };
export { RADIO_CATEGORIES, RADIO_GROUP_CATEGORIES };
export { OVERLAY_CATEGORIES };
export { MODAL_CATEGORIES };
export { POPUP_CATEGORIES };
export { CHECKBOX_CATEGORIES };
export { TYPOGRAPHY_CATEGORIES, LIST_CATEGORIES };
export { MENU_ITEM_CATEGORIES };
export { NAV_LINK_CATEGORIES };
export { TABLE_CATEGORIES };

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
/** Word break / overflow-wrap property */
export const WORD_BREAK = ['wordBreak'] as const;
/** Object fit property for images/videos */
export const OBJECT_FIT = ['objectFit'] as const;
/** Form validation-state property */
export const STATUS = ['validity'] as const;
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
  ...LIST_POSITION,
  ...LAYOUT_CORE,
  ...ALIGN_SELF,
  ...JUSTIFY_SELF,
  ...BREAKPOINT,
  ...PADDING,
  ...MARGIN,
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
  ...WORD_BREAK,
  ...OBJECT_FIT,
  ...WIDTH,
  ...HEIGHT,
  ...TRUNCATE,
  ...STATUS,
  ...ORIENTATION,
  ...LETTER_SPACING,
  ...PLACEMENT,
  ...DISABLED,
  ...READONLY,
  ...MIN_WIDTH,
  ...MAX_HEIGHT,
  ...INHERIT_SIZE,
  ...INHERIT_COLOR,
  ...INHERIT_BG,
  ...INHERIT_BORDER,
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
  appearance: ['primary', 'accent', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info', 'inheritAppearance'] as const,
  /** Border visibility: composable side toggles (borderT+borderL apply both) + noBorder reset. borderStart/borderEnd are logical (inline-start/end, RTL-aware). */
  border: ['border', 'borderT', 'borderB', 'borderL', 'borderR', 'borderX', 'borderY', 'borderStart', 'borderEnd', 'noBorder'] as const,
  /** Breakpoint below which Row/Stack stacks into a column (desktop-first: that tier and below).
      Widest-first so combining several resolves to the widest = their union (desktopStack ⊃ tabletStack ⊃ mobileStack). */
  breakpoint: ['desktopStack', 'tabletStack', 'mobileStack'] as const,
  /** CSS display property values for element layout behavior */
  display: ['inline', 'block', 'inlineBlock', 'flex', 'inlineFlex', 'grid', 'inlineGrid', 'contents', 'table', 'tableCell', 'hidden'] as const,
  /** Flex direction: row (horizontal), column (vertical), or reversed variants */
  flexDirection: ['row', 'column', 'rowReverse', 'columnReverse'] as const,
  /** Font family types: sans-serif, serif, monospace, or heading (all emit font-*) */
  fontFamily: ['fontSans', 'fontSerif', 'fontMono', 'fontHeading'] as const,
  /** Font style: italic or notItalic (normal) */
  fontStyle: ['italic', 'notItalic'] as const,
  /** Font weight from thin (100) to black (900), all emit font-* */
  fontWeight: ['fontThin', 'fontExtralight', 'fontLight', 'fontNormal', 'fontMedium', 'fontSemibold', 'fontBold', 'fontExtrabold', 'fontBlack'] as const,
  /** Spacing between flex/grid items: gap (enabled) or noGap (disabled) */
  gap: ['gap', 'noGap'] as const,
  /** Hide elements at specific breakpoint sizes. Widest-first so combining several resolves to the widest = their union. */
  hide: ['desktopHide', 'tabletHide', 'mobileHide'] as const,
  /** Cross-axis alignment for flex items (align-items) */
  items: ['itemsStart', 'itemsEnd', 'itemsCenter', 'itemsBaseline', 'itemsStretch'] as const,
  /** Per-item cross-axis alignment, overriding the parent's align-items (align-self) */
  alignSelf: ['alignSelfAuto', 'alignSelfStart', 'alignSelfEnd', 'alignSelfCenter', 'alignSelfStretch', 'alignSelfBaseline'] as const,
  /** Per-item inline-axis alignment within a grid area (justify-self) */
  justifySelf: ['justifySelfAuto', 'justifySelfStart', 'justifySelfEnd', 'justifySelfCenter', 'justifySelfStretch'] as const,
  /** Main-axis alignment for flex items (justify-content) */
  justify: ['justifyStart', 'justifyEnd', 'justifyCenter', 'justifyBetween', 'justifyAround', 'justifyEvenly', 'justifyStretch', 'justifyBaseline'] as const,
  /** List marker style: all emit list-* (disc, decimal, [circle], [square], [lower-alpha], [lower-roman]) */
  listStyle: ['listDisc', 'listDecimal', 'listCircle', 'listSquare', 'listLowerAlpha', 'listLowerRoman'] as const,
  /** List marker position: listInside (inline with text) or listOutside (hanging, traditional) */
  listPosition: ['listInside', 'listOutside'] as const,
  /** Overflow behavior for content that exceeds container bounds */
  overflow: [
    'overflowAuto', 'overflowHidden', 'overflowClip', 'overflowVisible', 'overflowScroll',
    'overflowXAuto', 'overflowYAuto', 'overflowXHidden', 'overflowYHidden',
    'overflowXClip', 'overflowYClip', 'overflowXVisible', 'overflowYVisible',
    'overflowXScroll', 'overflowYScroll'
  ] as const,
  /** Internal spacing: padding (enabled) or noPadding (disabled) */
  padding: ['padding', 'paddingX', 'paddingY', 'noPadding'] as const,
  /** External spacing: composable side toggles (marginT+marginB apply both) + noMargin reset */
  margin: ['margin', 'marginX', 'marginY', 'marginT', 'marginB', 'noMargin'] as const,
  /** CSS positioning: relative, absolute, fixed, sticky, static */
  position: ['relative', 'absolute', 'fixed', 'sticky', 'static'] as const,
  /** Inset ring visibility: insetRing (show) or noInsetRing (hide) — emits ring-inset */
  ring: ['insetRing', 'noInsetRing'] as const,
  /** Drop shadow visibility: shadow (enabled) or noShadow (disabled) */
  shadow: ['shadow', 'noShadow'] as const,
  /** Focus-visible outline visibility: focusVisible (show) or noFocusVisible (hide) */
  focusVisible: ['focusVisible', 'noFocusVisible'] as const,
  /** Border radius shape: pill (fully rounded), sharp (no radius), rounded (medium radius) */
  shape: ['pill', 'sharp', 'rounded'] as const,
  /** Size scale from extra-small to extra-large */
  size: ['xs', 'sm', 'md', 'lg', 'xl'] as const,
  /** Text alignment: left, center, right, justify (physical), start, end (direction-aware, flip under RTL) */
  textAlign: ['textLeft', 'textCenter', 'textRight', 'textJustify', 'textStart', 'textEnd'] as const,
  /** Text decoration: underline, strikethrough (lineThrough), none (noUnderline), overline */
  textDecoration: ['underline', 'lineThrough', 'noUnderline', 'overline'] as const,
  /** Text case transformation: UPPERCASE, lowercase, Capitalize, normalCase */
  textTransform: ['uppercase', 'lowercase', 'capitalize', 'normalCase'] as const,
  /** Style variant: filled (solid background), outline (border only), or ghost (minimal chrome) */
  variant: ['filled', 'outline', 'ghost'] as const,
  /** Flex item wrapping behavior: wrap, no-wrap, or wrap-reverse */
  wrap: ['flexWrap', 'flexNoWrap', 'flexWrapReverse'] as const,
  /** Flex-grow/shrink shorthand: flex1 (1 1 0%), flexAuto (1 1 auto), or flexNone (none) */
  flex: ['flex1', 'flexAuto', 'flexNone'] as const,
  /** Flex-shrink override: noShrink (= shrink-0) prevents the item from shrinking below its content size */
  shrink: ['noShrink'] as const,
  /** Transparent background: disables background color when true */
  transparent: ['transparent'] as const,
  /** Responsive sizing: enables breakpoint-specific py/px/gap/fs when true */
  responsiveSizing: ['responsiveSizing'] as const,
  /** Backdrop blur effect: backdropBlur (enabled) or noBackdropBlur (disabled) */
  blur: ['backdropBlur', 'noBackdropBlur'] as const,
  /** Pointer events: none (clicks pass through) or auto (normal) */
  pointerEvents: ['pointerEventsNone', 'pointerEventsAuto'] as const,
  /** Cursor appearance for interactive elements */
  cursor: ['cursorPointer', 'cursorDefault', 'cursorNotAllowed', 'cursorNone', 'cursorText', 'cursorMove', 'cursorWait'] as const,
  /** Transition effects for state changes */
  transition: ['transition', 'noTransition'] as const,
  /** Whitespace and text wrapping behavior */
  whitespace: ['whitespaceNowrap', 'whitespaceNormal', 'whitespacePre', 'whitespacePreWrap', 'whitespacePreLine', 'whitespaceBreakSpaces'] as const,
  /** Word break / overflow-wrap behavior */
  wordBreak: ['breakNormal', 'breakWords', 'breakAll', 'breakKeep'] as const,
  /** Object fit for images and videos */
  objectFit: ['objectCover', 'objectContain', 'objectFill', 'objectNone', 'objectScaleDown'] as const,
  /** Width control for element sizing */
  width: ['wFull', 'wFit', 'wAuto', 'wScreen'] as const,
  /** Truncate control for text overflow */
  truncate: ['truncate', 'lineClamp2', 'lineClamp3', 'lineClamp4', 'lineClamp5', 'noTruncate'] as const,
  /** Form validation state: invalid (layers danger border/ring over any appearance) */
  validity: ['invalid'] as const,
  /** Orientation for horizontal/vertical layout */
  orientation: ['horizontal', 'vertical'] as const,
  /** Height control for element sizing */
  height: ['hFit', 'hFull', 'hAuto', 'hScreen'] as const,
  /** Letter spacing for text tracking */
  letterSpacing: ['trackingTighter', 'trackingTight', 'trackingNormal', 'trackingWide', 'trackingWider', 'trackingWidest'] as const,
  /** Placement position for floating elements (popups, tooltips, dropdowns) */
  placement: ['placeTop', 'placeTopStart', 'placeTopEnd', 'placeBottom', 'placeBottomStart', 'placeBottomEnd', 'placeLeft', 'placeLeftStart', 'placeLeftEnd', 'placeRight', 'placeRightStart', 'placeRightEnd'] as const,
  /** Disabled state for interactive elements */
  disabled: ['disabled'] as const,
  /** Read-only state for form components */
  readOnly: ['readOnly'] as const,
  /** Constrain popup/floating width to a size-dependent minimum */
  constrainWidth: ['constrainWidth'] as const,
  /** Clamp popup/floating height to a size-dependent maximum */
  clampHeight: ['clampHeight'] as const,
  /** Inherit font-size and line-height from parent typography ancestor */
  inheritSize: ['inheritSize', 'noInheritSize'] as const,
  /** Inherit text color from parent via CSS variable cascade (suppresses data-appearance) */
  inheritColor: ['inheritColor', 'noInheritColor'] as const,
  /** Inherit background color from parent via CSS variable cascade */
  inheritBg: ['inheritBg', 'noInheritBg'] as const,
  /** Inherit border color from parent via CSS variable cascade */
  inheritBorder: ['inheritBorder', 'noInheritBorder'] as const,
} as const;

/** All border side keys (excluding noBorder since it doesn't have a CSS class) */
export const BORDER_KEYS = ['border', 'borderT', 'borderB', 'borderL', 'borderR', 'borderX', 'borderY', 'borderStart', 'borderEnd'] as const;

/** Type for all border side keys (excluding noBorder) */
export type BorderKey = typeof BORDER_KEYS[number];

/** Size scale keys: xs, sm, md, lg, xl */
export type SizeKey = typeof ComponentKeys.size[number];
/** Style variant keys: filled or outline */
export type VariantKey = typeof ComponentKeys.variant[number];
/** List style keys for bullet points and numbering */
export type ListStyleKey = typeof ComponentKeys.listStyle[number];
/** List position keys: inside (inline with text) or outside (hanging, traditional) */
export type ListPositionKey = typeof ComponentKeys.listPosition[number];
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
/** Text alignment keys: textLeft, textCenter, textRight, textJustify, textStart, textEnd */
export type TextAlignKey = typeof ComponentKeys.textAlign[number];
/** Margin keys: margin, marginX, marginY, marginT, marginB, noMargin */
export type MarginKey = typeof ComponentKeys.margin[number];
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
/** Flex align-self keys for per-item cross-axis alignment */
export type AlignSelfKey = typeof ComponentKeys.alignSelf[number];
/** Grid justify-self keys for per-item inline-axis alignment */
export type JustifySelfKey = typeof ComponentKeys.justifySelf[number];
/** Flex justify-content keys for main-axis alignment */
export type JustifyKey = typeof ComponentKeys.justify[number];
/** Flex wrap keys: flexWrap, flexNoWrap, flexWrapReverse */
export type WrapKey = typeof ComponentKeys.wrap[number];
/** Flex grow/shrink shorthand keys: flex1, flexAuto, flexNone */
export type FlexKey = typeof ComponentKeys.flex[number];
/** Flex shrink override keys: noShrink */
export type ShrinkKey = typeof ComponentKeys.shrink[number];
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
/** Word break behavior keys */
export type WordBreakKey = typeof ComponentKeys.wordBreak[number];
/** Object fit keys for images/videos */
export type ObjectFitKey = typeof ComponentKeys.objectFit[number];
/** Width keys for element sizing */
export type WidthKey = typeof ComponentKeys.width[number];
/** Truncate keys for text overflow */
export type TruncateKey = typeof ComponentKeys.truncate[number];
/** Validity keys for form validation */
export type ValidityKey = typeof ComponentKeys.validity[number];
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
/** Read-only state key */
export type ReadOnlyKey = typeof ComponentKeys.readOnly[number];
/** Constrain-width key for popup/floating components */
export type ConstrainWidthKey = typeof ComponentKeys.constrainWidth[number];
/** Clamp-height key for popup/floating components */
export type ClampHeightKey = typeof ComponentKeys.clampHeight[number];
/** Inherit font-size/line-height toggle keys */
export type InheritSizeKey = typeof ComponentKeys.inheritSize[number];
/** Inherit text color toggle keys */
export type InheritColorKey = typeof ComponentKeys.inheritColor[number];
/** Inherit background color toggle keys */
export type InheritBgKey = typeof ComponentKeys.inheritBg[number];
/** Inherit border color toggle keys */
export type InheritBorderKey = typeof ComponentKeys.inheritBorder[number];

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
export const COMPONENT = ['button', 'iconButton', 'badge', 'chip', 'code', 'kbd', 'mark', 'icon', 'card', 'divider', 'container', 'row', 'col', 'stack', 'section',
  'grid2', 'grid3', 'grid4', 'grid5', 'grid6', 'pageTitle', 'sectionTitle', 'title', 'text', 'blockquote', 'blockquoteCite', 'link', 'list', 'listItem', 'checkbox', 'label', 'img', 'input', 'inputErrorIcon', 'inputWrapper', 'textarea', 'select', 'selectChevron', 'selectWrapper', 'switch', 'radio', 'radioGroup', 'overlay', 'modal', 'popup', 'menu', 'navLink', 'table'] as const;
/** Type for component name keys */
export type ComponentKey = typeof COMPONENT[number];

/** Mapping of each component to its available property categories */
export const ComponentCategories: Record<ComponentKey, readonly string[]> = {
  badge: BADGE_CATEGORIES,
  button: BUTTON_CATEGORIES,
  iconButton: BUTTON_CATEGORIES,
  card: CARD_CATEGORIES,
  checkbox: CHECKBOX_CATEGORIES,
  chip: CHIP_CATEGORIES,
  code: CODE_CATEGORIES,
  kbd: CODE_CATEGORIES,
  mark: CODE_CATEGORIES,
  icon: ICON_CATEGORIES,
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
  inputErrorIcon: INPUT_ERROR_ICON_CATEGORIES,
  inputWrapper: INPUT_WRAPPER_CATEGORIES,
  textarea: INPUT_CATEGORIES,
  select: INPUT_CATEGORIES,
  selectChevron: SELECT_CHEVRON_CATEGORIES,
  selectWrapper: SELECT_WRAPPER_CATEGORIES,
  switch: SWITCH_CATEGORIES,
  radio: RADIO_CATEGORIES,
  radioGroup: RADIO_GROUP_CATEGORIES,
  label: LABEL_CATEGORIES,
  link: LINK_CATEGORIES,
  list: LIST_CATEGORIES,
  listItem: LIST_ITEM_CATEGORIES,
  pageTitle: TYPOGRAPHY_CATEGORIES,
  row: ROW_CATEGORIES,
  section: SECTION_CATEGORIES,
  sectionTitle: TYPOGRAPHY_CATEGORIES,
  stack: STACK_CATEGORIES,
  text: TYPOGRAPHY_CATEGORIES,
  blockquote: TYPOGRAPHY_CATEGORIES,
  blockquoteCite: TYPOGRAPHY_CATEGORIES,
  title: TYPOGRAPHY_CATEGORIES,
  overlay: OVERLAY_CATEGORIES,
  modal: MODAL_CATEGORIES,
  popup: POPUP_CATEGORIES,
  menu: MENU_ITEM_CATEGORIES,
  navLink: NAV_LINK_CATEGORIES,
  table: TABLE_CATEGORIES,
}
