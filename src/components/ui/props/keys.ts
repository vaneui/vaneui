export const MODE_KEYS = ['base', 'hover', 'active'] as const;
export const SIZE_KEYS = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export const VARIANT_KEYS = ['filled', 'outline'] as const;
export const APPEARANCE_KEYS = ['default', 'accent', 'primary', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info', 'transparent'] as const;
export const TEXT_APPEARANCE_KEYS = [...APPEARANCE_KEYS, 'muted', 'link'] as const;
export const FONT_FAMILY_KEYS = ['sans', 'serif', 'mono'] as const;
export const FONT_WEIGHT_KEYS = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'] as const;
export const FONT_STYLE_KEYS = ['italic', 'notItalic'] as const;
export const TEXT_DECORATION_KEYS = ['underline', 'lineThrough', 'noUnderline', 'overline'] as const;
export const TEXT_TRANSFORM_KEYS = ['uppercase', 'lowercase', 'capitalize', 'normalCase'] as const;
export const TEXT_ALIGN_KEYS = ['textLeft', 'textCenter', 'textRight', 'textJustify'] as const;
export const BORDER_KEYS = ['border', 'noBorder'] as const;
export const SHADOW_KEYS = ['shadow', 'noShadow'] as const;
export const RING_KEYS = ['ring', 'noRing'] as const;
export const NO_PADDING_KEYS = ['noPadding'] as const;
export const BREAKPOINT_KEYS = ['xsCol', 'smCol', 'mdCol', 'lgCol', 'xlCol'] as const;
export const HIDE_KEYS = ['xsHide', 'smHide', 'mdHide', 'lgHide', 'xlHide'] as const;
export const POSITION_KEYS = ['relative', 'absolute', 'fixed', 'sticky', 'static'] as const;
export const DIRECTION_REVERSE_KEYS = ['reverse'] as const;
export const GAP_KEYS = ['gap', 'noGap'] as const;
export const PILL_KEYS = ['pill'] as const;
export const SHARP_KEYS = ['sharp'] as const;
export const ROUNDED_KEYS = ['rounded'] as const;
export const SHAPE_KEYS = [...PILL_KEYS, ...SHARP_KEYS, ...ROUNDED_KEYS] as const;
export const FLEX_DIRECTION_KEYS = ['row', 'column', 'rowReverse', 'columnReverse'] as const;
export const ITEMS_KEYS = ['itemsStart', 'itemsEnd', 'itemsCenter', 'itemsBaseline', 'itemsStretch'] as const;
export const JUSTIFY_KEYS = ['justifyStart', 'justifyEnd', 'justifyCenter', 'justifyBetween', 'justifyAround', 'justifyEvenly', 'justifyStretch', 'justifyBaseline'] as const;
export const WRAP_KEYS = ['flexWrap', 'flexNoWrap', 'flexWrapReverse'] as const;

export type ModeKey = typeof MODE_KEYS[number];
export type SizeKey = typeof SIZE_KEYS[number];
export type RingKey = typeof RING_KEYS[number];
export type ShapeKey = typeof SHAPE_KEYS[number];
export type BorderKey = typeof BORDER_KEYS[number];
export type ShadowKey = typeof SHADOW_KEYS[number];
export type GapKey = typeof GAP_KEYS[number];
export type VariantKey = typeof VARIANT_KEYS[number];
export type AppearanceKey = typeof APPEARANCE_KEYS[number];
export type TextAppearanceKey = typeof TEXT_APPEARANCE_KEYS[number];
export type FontFamilyKey = typeof FONT_FAMILY_KEYS[number];
export type FontWeightKey = typeof FONT_WEIGHT_KEYS[number];
export type FontStyleKey = typeof FONT_STYLE_KEYS[number];
export type TextDecorationKey = typeof TEXT_DECORATION_KEYS[number];
export type TextTransformKey = typeof TEXT_TRANSFORM_KEYS[number];
export type TextAlignKey = typeof TEXT_ALIGN_KEYS[number];
export type BreakpointKey = typeof BREAKPOINT_KEYS[number];
export type HideKey = typeof HIDE_KEYS[number];
export type PositionKey = typeof POSITION_KEYS[number];
export type FlexDirectionKey = typeof FLEX_DIRECTION_KEYS[number];
export type ItemsKey = typeof ITEMS_KEYS[number];
export type JustifyKey = typeof JUSTIFY_KEYS[number];
export type WrapKey = typeof WRAP_KEYS[number];

// Base component keys
export const BASE_COMPONENT_KEYS = [
  ...SIZE_KEYS,
  ...HIDE_KEYS,
  ...POSITION_KEYS
] as const;

// Font keys
export const FONT_KEYS = [
  ...FONT_WEIGHT_KEYS,
  ...FONT_STYLE_KEYS,
  ...TEXT_DECORATION_KEYS,
  ...TEXT_TRANSFORM_KEYS,
  ...FONT_FAMILY_KEYS,
  ...TEXT_APPEARANCE_KEYS,
  ...TEXT_ALIGN_KEYS
] as const;

// Typography component keys
export const TYPOGRAPHY_COMPONENT_KEYS = [
  ...BASE_COMPONENT_KEYS,
  ...FONT_KEYS
] as const;
export type TypographyComponentKey = typeof TYPOGRAPHY_COMPONENT_KEYS[number];

// Button keys
export const BUTTON_KEYS = [
  ...TYPOGRAPHY_COMPONENT_KEYS,
  ...SHAPE_KEYS,
  ...BORDER_KEYS,
  ...SHADOW_KEYS,
  ...RING_KEYS,
  ...VARIANT_KEYS,
  ...ITEMS_KEYS,
  ...APPEARANCE_KEYS
] as const;
export type ButtonKey = typeof BUTTON_KEYS[number];

// Grid keys
export const GRID_KEYS = [
  ...BASE_COMPONENT_KEYS,
  ...GAP_KEYS,
  ...APPEARANCE_KEYS
] as const;
export type GridKey = typeof GRID_KEYS[number];

// Row keys
export const ROW_KEYS = [
  ...BASE_COMPONENT_KEYS,
  ...WRAP_KEYS,
  ...GAP_KEYS,
  ...DIRECTION_REVERSE_KEYS,
  ...ITEMS_KEYS,
  ...BREAKPOINT_KEYS,
  ...JUSTIFY_KEYS,
  ...APPEARANCE_KEYS
] as const;
export type RowKey = typeof ROW_KEYS[number];

// Col keys
export const COL_KEYS = [
  ...BASE_COMPONENT_KEYS,
  ...WRAP_KEYS,
  ...GAP_KEYS,
  ...DIRECTION_REVERSE_KEYS,
  ...ITEMS_KEYS,
  ...JUSTIFY_KEYS,
  ...APPEARANCE_KEYS
] as const;
export type ColKey = typeof COL_KEYS[number];

// Card keys
export const CARD_KEYS = [
  ...GAP_KEYS,
  ...ITEMS_KEYS,
  ...SHARP_KEYS,
  ...ROUNDED_KEYS,
  ...BREAKPOINT_KEYS,
  ...APPEARANCE_KEYS,
  ...BORDER_KEYS,
  ...SHADOW_KEYS,
  ...NO_PADDING_KEYS,
  ...FLEX_DIRECTION_KEYS,
  ...TYPOGRAPHY_COMPONENT_KEYS,
  ...DIRECTION_REVERSE_KEYS,
  ...JUSTIFY_KEYS,
  ...WRAP_KEYS
] as const;
export type CardKey = typeof CARD_KEYS[number];

// Stack keys
export const STACK_KEYS = [
  ...BASE_COMPONENT_KEYS,
  ...WRAP_KEYS,
  ...GAP_KEYS,
  ...DIRECTION_REVERSE_KEYS,
  ...ITEMS_KEYS,
  ...BREAKPOINT_KEYS,
  ...JUSTIFY_KEYS,
  ...APPEARANCE_KEYS,
  ...FLEX_DIRECTION_KEYS,
  ...NO_PADDING_KEYS
] as const;
export type StackKey = typeof STACK_KEYS[number];

// Badge keys
export const BADGE_KEYS = [
  ...TYPOGRAPHY_COMPONENT_KEYS,
  ...SHAPE_KEYS,
  ...VARIANT_KEYS,
  ...SHADOW_KEYS,
  ...BORDER_KEYS,
  ...RING_KEYS,
  ...ITEMS_KEYS,
  ...APPEARANCE_KEYS
] as const;
export type BadgeKey = typeof BADGE_KEYS[number];

// Chip keys
export const CHIP_KEYS = [
  ...TYPOGRAPHY_COMPONENT_KEYS,
  ...SHAPE_KEYS,
  ...VARIANT_KEYS,
  ...SHADOW_KEYS,
  ...BORDER_KEYS,
  ...RING_KEYS,
  ...ITEMS_KEYS,
  ...APPEARANCE_KEYS
] as const;
export type ChipKey = typeof CHIP_KEYS[number];

// Divider keys
export const DIVIDER_KEYS = [
  ...BASE_COMPONENT_KEYS,
  ...BORDER_KEYS,
  ...SHADOW_KEYS,
  ...RING_KEYS,
  ...VARIANT_KEYS
] as const;
export type DividerKey = typeof DIVIDER_KEYS[number];

// Container keys
export const CONTAINER_KEYS = [
  ...BASE_COMPONENT_KEYS,
  ...ITEMS_KEYS,
  ...APPEARANCE_KEYS,
  ...BORDER_KEYS,
  ...SHADOW_KEYS,
  ...RING_KEYS,
  ...VARIANT_KEYS
] as const;
export type ContainerKey = typeof CONTAINER_KEYS[number];

// Section keys
export const SECTION_KEYS = [
  ...BASE_COMPONENT_KEYS,
  ...FLEX_DIRECTION_KEYS,
  ...ITEMS_KEYS,
  ...APPEARANCE_KEYS,
  ...NO_PADDING_KEYS,
  ...DIRECTION_REVERSE_KEYS,
  ...JUSTIFY_KEYS,
  ...WRAP_KEYS,
  ...BREAKPOINT_KEYS,
  ...GAP_KEYS
] as const;
export type SectionKey = typeof SECTION_KEYS[number];
