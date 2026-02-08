/**
 * Category building blocks for composing component categories.
 * This file contains primitive constants and composite builders that can be
 * imported by both keys.ts and component-specific category files.
 */

/** Core layout properties for positioning and sizing elements */
export const LAYOUT_CORE = ['size', 'hide', 'items', 'justify', 'position', 'display', 'overflow'] as const;
/** Flexbox-specific layout properties for flex containers */
export const LAYOUT_FLEX = ['wrap', 'gap', 'flexDirection', 'reverse'] as const;
/** Padding properties for internal spacing control */
export const PADDING = ['padding'] as const;
/** Responsive breakpoint properties for different screen sizes */
export const BREAKPOINT = ['breakpoint'] as const;
/** Core visual properties including appearance colors and transparency */
export const VISUAL_CORE = ['appearance'] as const;
/** Border properties for visual decoration */
export const BORDER = ['border'] as const;
/** Visual decoration properties for shadows and focus rings */
export const VISUAL_DECORATION = ['shadow', 'ring', 'focusVisible'] as const;
/** Layout-specific visual decoration (excluding focusVisible for non-interactive elements) */
export const VISUAL_DECORATION_LAYOUT = ['shadow', 'ring'] as const;
/** Shape properties for border radius and corner rounding */
export const SHAPE = ['shape'] as const;
/** Text alignment property for block-level elements */
export const TEXT_ALIGN = ['textAlign'] as const;
/** Truncate property for text overflow control */
export const TRUNCATE = ['truncate'] as const;
/** Core typography styling properties (excluding text alignment) */
export const TYPOGRAPHY_STYLE_CORE = ['fontWeight', 'fontStyle', 'textDecoration', 'textTransform', 'fontFamily'] as const;
/** Typography styling properties for text appearance and formatting */
export const TYPOGRAPHY_STYLE = [...TYPOGRAPHY_STYLE_CORE, ...TEXT_ALIGN, ...TRUNCATE] as const;
/** List-specific styling properties for bullet points and numbering */
export const LIST_STYLE = ['listStyle'] as const;
/** Variant properties for filled/outline styling modes */
export const VARIANT = ['variant'] as const;
/** Transparent background property */
export const TRANSPARENT = ['transparent'] as const;
/** Responsive sizing property for breakpoint-specific sizing */
export const RESPONSIVE = ['responsive'] as const;
/** Width property for controlling element width */
export const WIDTH = ['width'] as const;
/** Common modifier properties available to all components */
export const COMMON_MODIFIERS = [...TRANSPARENT, ...RESPONSIVE] as const;

/** Cursor property for interactive elements */
export const CURSOR = ['cursor'] as const;
/** Transition property for animation effects */
export const TRANSITION = ['transition'] as const;
/** Whitespace property for text wrapping control */
export const WHITESPACE = ['whitespace'] as const;
/** Height property for controlling element height */
export const HEIGHT = ['height'] as const;
/** Status property for form validation states */
export const STATUS = ['status'] as const;
/** Orientation property for divider direction */
export const ORIENTATION = ['orientation'] as const;
/** Placement property for floating element positioning */
export const PLACEMENT = ['placement'] as const;

/** Composite categories built from core blocks */
/** Complete layout category including core and flex properties */
export const LAYOUT_FULL = [...LAYOUT_CORE, ...LAYOUT_FLEX] as const;
/** Complete visual category including core, decoration, and shape properties */
export const VISUAL_FULL = [...VISUAL_CORE, ...BORDER, ...VISUAL_DECORATION, ...SHAPE] as const;
/** Layout-specific visual category (excludes focusVisible for non-interactive elements) */
export const VISUAL_LAYOUT = [...VISUAL_CORE, ...BORDER, ...VISUAL_DECORATION_LAYOUT, ...SHAPE] as const;
/** Complete typography category for text styling */
export const TYPOGRAPHY_FULL = [...TYPOGRAPHY_STYLE] as const;

// =============================================================================
// UI Element Categories (Code, Badge, Chip)
// =============================================================================

/** Categories for UI elements like Badge, Chip, Code */
export const UI_ELEMENT_CATEGORIES = [
  ...LAYOUT_FULL,
  ...VISUAL_FULL,
  ...TYPOGRAPHY_STYLE_CORE,
  ...TEXT_ALIGN,
  ...PADDING,
  ...VARIANT,
  ...CURSOR,
  ...TRANSITION,
  ...WHITESPACE,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
] as const;

/** Badge component categories */
export const BADGE_CATEGORIES = UI_ELEMENT_CATEGORIES;
/** Chip component categories */
export const CHIP_CATEGORIES = UI_ELEMENT_CATEGORIES;
/** Code component categories */
export const CODE_CATEGORIES = UI_ELEMENT_CATEGORIES;

// =============================================================================
// Button Categories (UI Elements + Cursor)
// =============================================================================

/** Categories for Button component (same as UI elements, cursor already included) */
export const BUTTON_CATEGORIES = UI_ELEMENT_CATEGORIES;

// =============================================================================
// Container Layout Categories (Container, Grid)
// =============================================================================

/** Categories for container layout components (Container, Grid) */
export const CONTAINER_LAYOUT_CATEGORIES = [
  ...LAYOUT_FULL,
  ...PADDING,
  ...VISUAL_LAYOUT,
  ...VARIANT,
  ...WIDTH,
  ...HEIGHT,
  ...BREAKPOINT,
  ...TEXT_ALIGN,
  ...COMMON_MODIFIERS,
] as const;

/** Container component categories */
export const CONTAINER_CATEGORIES = CONTAINER_LAYOUT_CATEGORIES;
/** Grid component categories */
export const GRID_CATEGORIES = CONTAINER_LAYOUT_CATEGORIES;

// =============================================================================
// Responsive Layout Categories (Stack, Row)
// =============================================================================

/** Categories for responsive layout components with breakpoint support (Stack, Row) */
export const RESPONSIVE_LAYOUT_CATEGORIES = [
  ...LAYOUT_FULL,
  ...BREAKPOINT,
  ...PADDING,
  ...VISUAL_LAYOUT,
  ...VARIANT,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
  ...TEXT_ALIGN,
] as const;

/** Stack component categories */
export const STACK_CATEGORIES = RESPONSIVE_LAYOUT_CATEGORIES;
/** Row component categories */
export const ROW_CATEGORIES = RESPONSIVE_LAYOUT_CATEGORIES;

// =============================================================================
// Deprecated aliases (for backward compatibility)
// =============================================================================

/** @deprecated Use UI_ELEMENT_CATEGORIES instead */
export const INTERACTIVE_CATEGORIES = UI_ELEMENT_CATEGORIES;
/** @deprecated Use CONTAINER_LAYOUT_CATEGORIES instead */
export const BASIC_LAYOUT_CATEGORIES = CONTAINER_LAYOUT_CATEGORIES;
/** @deprecated Use RESPONSIVE_LAYOUT_CATEGORIES instead */
export const FLEX_LAYOUT_CATEGORIES = RESPONSIVE_LAYOUT_CATEGORIES;
