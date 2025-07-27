export const MODE_KEYS = ['base', 'hover', 'active'] as const;
export const SIZE_KEYS = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export const VARIANT_KEYS = ['filled', 'outline'] as const;
export const APPEARANCE_KEYS = ['default', 'accent', 'primary', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info'] as const;
export const TRANSPARENT_KEYS = ['transparent'] as const;
export const LINK_KEYS = ['link'] as const;
export const FONT_FAMILY_KEYS = ['sans', 'serif', 'mono'] as const;
export const FONT_WEIGHT_KEYS = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'] as const;
export const FONT_STYLE_KEYS = ['italic', 'notItalic'] as const;
export const TEXT_DECORATION_KEYS = ['underline', 'lineThrough', 'noUnderline', 'overline'] as const;
export const TEXT_TRANSFORM_KEYS = ['uppercase', 'lowercase', 'capitalize', 'normalCase'] as const;
export const TEXT_ALIGN_KEYS = ['textLeft', 'textCenter', 'textRight', 'textJustify'] as const;
export const BORDER_KEYS = ['border', 'noBorder'] as const;
export const SHADOW_KEYS = ['shadow', 'noShadow'] as const;
export const RING_KEYS = ['ring', 'noRing'] as const;
export const PADDING_KEYS = ['padding', 'noPadding'] as const;
export const BREAKPOINT_KEYS = ['xsCol', 'smCol', 'mdCol', 'lgCol', 'xlCol'] as const;
export const HIDE_KEYS = ['xsHide', 'smHide', 'mdHide', 'lgHide', 'xlHide'] as const;
export const POSITION_KEYS = ['relative', 'absolute', 'fixed', 'sticky', 'static'] as const;
export const FLEX_DIRECTION_KEYS = ['row', 'column', 'rowReverse', 'columnReverse'] as const;
export const DIRECTION_REVERSE_KEYS = ['reverse'] as const;
export const GAP_KEYS = ['gap', 'noGap'] as const;
export const PILL_KEYS = ['pill'] as const;
export const SHARP_KEYS = ['sharp'] as const;
export const ROUNDED_KEYS = ['rounded'] as const;
export const SHAPE_KEYS = [...PILL_KEYS, ...SHARP_KEYS, ...ROUNDED_KEYS] as const;
export const ITEMS_KEYS = ['itemsStart', 'itemsEnd', 'itemsCenter', 'itemsBaseline', 'itemsStretch'] as const;
export const JUSTIFY_KEYS = ['justifyStart', 'justifyEnd', 'justifyCenter', 'justifyBetween', 'justifyAround', 'justifyEvenly', 'justifyStretch', 'justifyBaseline'] as const;
export const WRAP_KEYS = ['flexWrap', 'flexNoWrap', 'flexWrapReverse'] as const;
export const DISPLAY_KEYS = ['inline', 'block', 'inlineBlock', 'flex', 'inlineFlex', 'grid', 'inlineGrid', 'contents', 'table', 'tableCell', 'hidden'] as const;
export const OVERFLOW_KEYS = ['overflowAuto', 'overflowHidden', 'overflowClip', 'overflowVisible', 'overflowScroll', 'overflowXAuto', 'overflowYAuto', 'overflowXHidden', 'overflowYHidden', 'overflowXClip', 'overflowYClip', 'overflowXVisible', 'overflowYVisible', 'overflowXScroll', 'overflowYScroll'] as const;

export const COMPONENT_PROPS_CATEGORY = [
  'mode',
  'size',
  'variant',
  'appearance',
  'transparent',
  'link',
  'fontFamily',
  'fontWeight',
  'fontStyle',
  'textDecoration',
  'textTransform',
  'textAlign',
  'border',
  'shadow',
  'ring',
  'padding',
  'breakpoint',
  'hide',
  'position',
  'flexDirection',
  'reverse',
  'gap',
  'pill',
  'sharp',
  'rounded',
  'shape',
  'items',
  'justify',
  'wrap',
  'display',
  'overflow'
] as const;

export type ComponentCategoryKey = typeof COMPONENT_PROPS_CATEGORY[number];
export const ComponentKeys = {
  mode: MODE_KEYS,
  size: SIZE_KEYS,
  variant: VARIANT_KEYS,
  appearance: APPEARANCE_KEYS,
  transparent: TRANSPARENT_KEYS,
  link: LINK_KEYS,
  fontFamily: FONT_FAMILY_KEYS,
  fontWeight: FONT_WEIGHT_KEYS,
  fontStyle: FONT_STYLE_KEYS,
  textDecoration: TEXT_DECORATION_KEYS,
  textTransform: TEXT_TRANSFORM_KEYS,
  textAlign: TEXT_ALIGN_KEYS,
  border: BORDER_KEYS,
  shadow: SHADOW_KEYS,
  ring: RING_KEYS,
  padding: PADDING_KEYS,
  breakpoint: BREAKPOINT_KEYS,
  hide: HIDE_KEYS,
  position: POSITION_KEYS,
  flexDirection: FLEX_DIRECTION_KEYS,
  reverse: DIRECTION_REVERSE_KEYS,
  gap: GAP_KEYS,
  pill: PILL_KEYS,
  sharp: SHARP_KEYS,
  rounded: ROUNDED_KEYS,
  shape: SHAPE_KEYS,
  items: ITEMS_KEYS,
  justify: JUSTIFY_KEYS,
  wrap: WRAP_KEYS,
  display: DISPLAY_KEYS,
  overflow: OVERFLOW_KEYS,
};

export type ModeKey = typeof ComponentKeys.mode[number];
export type SizeKey = typeof ComponentKeys.size[number];
export type RingKey = typeof ComponentKeys.ring[number];
export type ShapeKey = typeof ComponentKeys.shape[number];
export type BorderKey = typeof ComponentKeys.border[number];
export type ShadowKey = typeof ComponentKeys.shadow[number];
export type PaddingKey = typeof ComponentKeys.padding[number];
export type GapKey = typeof ComponentKeys.gap[number];
export type VariantKey = typeof ComponentKeys.variant[number];
export type AppearanceKey = typeof ComponentKeys.appearance[number];
export type TransparentKey = typeof ComponentKeys.transparent[number];
export type LinkKey = typeof ComponentKeys.link[number];
export type FontFamilyKey = typeof ComponentKeys.fontFamily[number];
export type FontWeightKey = typeof ComponentKeys.fontWeight[number];
export type FontStyleKey = typeof ComponentKeys.fontStyle[number];
export type TextDecorationKey = typeof ComponentKeys.textDecoration[number];
export type TextTransformKey = typeof ComponentKeys.textTransform[number];
export type TextAlignKey = typeof ComponentKeys.textAlign[number];
export type BreakpointKey = typeof ComponentKeys.breakpoint[number];
export type HideKey = typeof ComponentKeys.hide[number];
export type PositionKey = typeof ComponentKeys.position[number];
export type FlexDirectionKey = typeof ComponentKeys.flexDirection[number];
export type ItemsKey = typeof ComponentKeys.items[number];
export type JustifyKey = typeof ComponentKeys.justify[number];
export type WrapKey = typeof ComponentKeys.wrap[number];
export type DisplayKey = typeof ComponentKeys.display[number];
export type OverflowKey = typeof ComponentKeys.overflow[number];
export type ReverseKey = typeof ComponentKeys.reverse[number];

const LAYOUT_CORE = ['size', 'hide', 'items', 'justify', 'position', 'display', 'overflow'] as const;
const LAYOUT_FLEX = ['wrap', 'gap', 'flexDirection', 'reverse'] as const;
const VISUAL_CORE = ['appearance', 'transparent'] as const;
const VISUAL_DECORATION = ['border', 'shadow', 'ring', 'shape'] as const;
const TYPOGRAPHY_STYLE = ['fontWeight', 'fontStyle', 'textDecoration', 'textTransform', 'fontFamily', 'textAlign'] as const;
const TYPOGRAPHY_SEMANTIC = ['link'] as const;
const FORM_STYLING = ['variant'] as const;

export const BASE_COMPONENT_CATEGORIES = LAYOUT_CORE;
export const FONT_CATEGORIES: ComponentCategoryKey[] = [...TYPOGRAPHY_STYLE, ...VISUAL_CORE, ...TYPOGRAPHY_SEMANTIC] as const;
export const TYPOGRAPHY_CATEGORIES = [...BASE_COMPONENT_CATEGORIES, ...FONT_CATEGORIES] as const;
export const LIST_CATEGORIES = [...TYPOGRAPHY_CATEGORIES, 'padding'] as const;
export const UI_ELEMENT_CATEGORIES = [...LAYOUT_CORE, ...TYPOGRAPHY_STYLE, 'appearance'] as const;
export const INTERACTIVE_CATEGORIES = [...UI_ELEMENT_CATEGORIES, 'shape', ...VISUAL_DECORATION, 'gap', 'padding', ...FORM_STYLING] as const;
export const BUTTON_CATEGORIES = INTERACTIVE_CATEGORIES;
export const BADGE_CATEGORIES = INTERACTIVE_CATEGORIES;
export const CHIP_CATEGORIES = INTERACTIVE_CATEGORIES;
export const GRID_CATEGORIES = [...LAYOUT_CORE, 'gap', ...VISUAL_CORE] as const;
export const FLEX_CONTAINER_CATEGORIES = [...LAYOUT_CORE, ...LAYOUT_FLEX, ...VISUAL_CORE] as const;
export const ROW_CATEGORIES = [...FLEX_CONTAINER_CATEGORIES, 'breakpoint'] as const;
export const COL_CATEGORIES = FLEX_CONTAINER_CATEGORIES;
export const STACK_CATEGORIES = [...FLEX_CONTAINER_CATEGORIES, 'breakpoint', 'padding'] as const;
export const CARD_CATEGORIES = [...TYPOGRAPHY_CATEGORIES, ...LAYOUT_FLEX, 'sharp', 'rounded', 'breakpoint', ...VISUAL_DECORATION, 'padding'] as const;
export const DIVIDER_CATEGORIES = [...BASE_COMPONENT_CATEGORIES, 'appearance', 'padding'] as const;
export const CONTAINER_CATEGORIES = [...BASE_COMPONENT_CATEGORIES, ...VISUAL_CORE, ...VISUAL_DECORATION, 'gap'] as const;
export const SECTION_CATEGORIES = [...BASE_COMPONENT_CATEGORIES, 'appearance', 'padding', ...LAYOUT_FLEX, 'breakpoint', ...VISUAL_DECORATION] as const;

export type CategoryProps = {
  [K in ComponentCategoryKey]?: (typeof ComponentKeys)[K][number];
};
