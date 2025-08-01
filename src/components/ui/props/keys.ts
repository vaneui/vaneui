export const LAYOUT_CORE = ['size', 'hide', 'items', 'justify', 'position', 'display', 'overflow'] as const;
export const LAYOUT_FLEX = ['wrap', 'gap', 'flexDirection', 'reverse'] as const;
export const PADDING = ['padding'] as const;
export const BREAKPOINT = ['breakpoint'] as const;
export const VISUAL_CORE = ['appearance', 'transparent'] as const;
export const VISUAL_DECORATION = ['border', 'shadow', 'ring'] as const;
export const SHAPE = ['shape'] as const;
export const TYPOGRAPHY_STYLE = ['fontWeight', 'fontStyle', 'textDecoration', 'textTransform', 'fontFamily', 'textAlign'] as const;
export const LINK = ['link'] as const;
export const VARIANT = ['variant'] as const;

export const COMPONENT_PROPS_CATEGORY = [
  ...VISUAL_CORE,
  ...LAYOUT_FLEX,
  ...TYPOGRAPHY_STYLE,
  ...LAYOUT_CORE,
  ...BREAKPOINT,
  ...LINK,
  ...PADDING,
  ...VISUAL_DECORATION,
  ...SHAPE,
  ...VARIANT,
  'mode',
] as const;

export type ComponentCategoryKey = typeof COMPONENT_PROPS_CATEGORY[number];
export const ComponentKeys = {
  appearance: ['default', 'accent', 'primary', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info'],
  border: ['border', 'noBorder'],
  breakpoint: ['xsCol', 'smCol', 'mdCol', 'lgCol', 'xlCol'],
  display: ['inline', 'block', 'inlineBlock', 'flex', 'inlineFlex', 'grid', 'inlineGrid', 'contents', 'table', 'tableCell', 'hidden'],
  flexDirection: ['row', 'column', 'rowReverse', 'columnReverse'],
  fontFamily: ['sans', 'serif', 'mono'],
  fontStyle: ['italic', 'notItalic'],
  fontWeight: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
  gap: ['gap', 'noGap'],
  hide: ['xsHide', 'smHide', 'mdHide', 'lgHide', 'xlHide'],
  items: ['itemsStart', 'itemsEnd', 'itemsCenter', 'itemsBaseline', 'itemsStretch'],
  justify: ['justifyStart', 'justifyEnd', 'justifyCenter', 'justifyBetween', 'justifyAround', 'justifyEvenly', 'justifyStretch', 'justifyBaseline'],
  link: ['link'],
  mode: ['base', 'hover', 'active'] as const,
  overflow: ['overflowAuto', 'overflowHidden', 'overflowClip', 'overflowVisible', 'overflowScroll', 'overflowXAuto', 'overflowYAuto', 'overflowXHidden', 'overflowYHidden', 'overflowXClip', 'overflowYClip', 'overflowXVisible', 'overflowYVisible', 'overflowXScroll', 'overflowYScroll'],
  padding: ['padding', 'noPadding'],
  position: ['relative', 'absolute', 'fixed', 'sticky', 'static'],
  reverse: ['reverse'],
  ring: ['ring', 'noRing'],
  shadow: ['shadow', 'noShadow'],
  shape: ['pill', 'sharp', 'rounded'],
  size: ['xs', 'sm', 'md', 'lg', 'xl'],
  textAlign: ['textLeft', 'textCenter', 'textRight', 'textJustify'],
  textDecoration: ['underline', 'lineThrough', 'noUnderline', 'overline'],
  textTransform: ['uppercase', 'lowercase', 'capitalize', 'normalCase'],
  transparent: ['transparent'],
  variant: ['filled', 'outline'],
  wrap: ['flexWrap', 'flexNoWrap', 'flexWrapReverse'],
} as const;

export type ModeKey = typeof ComponentKeys.mode[number];
export type SizeKey = typeof ComponentKeys.size[number];
export type RingKey = typeof ComponentKeys.ring[number];
export type ShapeKey = typeof ComponentKeys.shape[number];
export type BorderKey = typeof ComponentKeys.border[number];
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

// Composite categories built from core blocks
const LAYOUT_FULL = [...LAYOUT_CORE, ...LAYOUT_FLEX] as const;
const VISUAL_FULL = [...VISUAL_CORE, ...VISUAL_DECORATION, ...SHAPE] as const;
const TYPOGRAPHY_FULL = [...TYPOGRAPHY_STYLE, ...LINK] as const;

// Component-specific category combinations
export const TYPOGRAPHY_CATEGORIES = [...LAYOUT_CORE, ...VISUAL_CORE, ...TYPOGRAPHY_FULL] as const;
export const LIST_CATEGORIES = [...TYPOGRAPHY_CATEGORIES, ...PADDING] as const;

export const INTERACTIVE_CATEGORIES = [...LAYOUT_CORE, ...VISUAL_FULL, ...TYPOGRAPHY_STYLE, ...PADDING, ...LAYOUT_FLEX, ...VARIANT] as const;
export const BUTTON_CATEGORIES = INTERACTIVE_CATEGORIES;
export const BADGE_CATEGORIES = INTERACTIVE_CATEGORIES;
export const CHIP_CATEGORIES = INTERACTIVE_CATEGORIES;

export const CONTAINER_CATEGORIES = [...LAYOUT_FULL, ...VISUAL_FULL] as const;
export const FLEX_CONTAINER_CATEGORIES = [...LAYOUT_FULL] as const;
export const GRID_CATEGORIES = [...LAYOUT_CORE, ...LAYOUT_FLEX, ...VISUAL_CORE] as const;

export const ROW_CATEGORIES = [...FLEX_CONTAINER_CATEGORIES, ...BREAKPOINT, ...VISUAL_FULL] as const;
export const COL_CATEGORIES = [...FLEX_CONTAINER_CATEGORIES, ...VISUAL_FULL] as const;
export const STACK_CATEGORIES = [...FLEX_CONTAINER_CATEGORIES, ...BREAKPOINT, ...PADDING, ...VISUAL_FULL] as const;

export const CARD_CATEGORIES = [...TYPOGRAPHY_CATEGORIES, ...LAYOUT_FLEX, ...BREAKPOINT, ...VISUAL_DECORATION, ...SHAPE, ...PADDING] as const;
export const DIVIDER_CATEGORIES = [...LAYOUT_CORE, ...VISUAL_CORE, ...PADDING] as const;
export const SECTION_CATEGORIES = [...LAYOUT_CORE, ...VISUAL_CORE, ...PADDING, ...LAYOUT_FLEX, ...BREAKPOINT, ...VISUAL_DECORATION, ...SHAPE] as const;

// All component-specific props that should be filtered from DOM
export const ALL_COMPONENT_PROPS = Object.values(ComponentKeys).flat();

export type CategoryProps = {
  [K in ComponentCategoryKey]?: (typeof ComponentKeys)[K][number];
};
