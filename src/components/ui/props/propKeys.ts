export const SIZE_KEYS = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export const STYLE_KEYS = ['filled', 'outline'] as const;
export const APPEARANCE_KEYS = ['default', 'accent', 'primary', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info', 'transparent'] as const;
export const TEXT_APPEARANCE_KEYS = [...APPEARANCE_KEYS, 'muted', 'link'] as const;
export const FONT_FAMILY_KEYS = ['sans', 'serif', 'mono'] as const;
export const FONT_WEIGHT_KEYS = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'] as const;
export const FONT_STYLE_KEYS = ['italic', 'notItalic'] as const;
export const TEXT_DECORATION_KEYS = ['underline', 'lineThrough', 'noUnderline', 'overline'] as const;
export const TEXT_TRANSFORM_KEYS = ['uppercase', 'lowercase', 'capitalize', 'normalCase'] as const;
export const TEXT_ALIGN_KEYS = ['textLeft', 'textCenter', 'textRight', 'textJustify'] as const;
export const BORDER_KEYS = ['noBorder'] as const;
export const SHADOW_KEYS = ['noShadow'] as const;
export const RING_KEYS = ['noRing'] as const;
export const PADDING_KEYS = ['noPadding'] as const;
export const BREAKPOINT_KEYS = ['xsCol', 'smCol', 'mdCol', 'lgCol', 'xlCol'] as const;
export const HIDE_KEYS = ['xsHide', 'smHide', 'mdHide', 'lgHide', 'xlHide'] as const;
export const POSITION_KEYS = ['relative', 'absolute', 'fixed', 'sticky', 'static'] as const;
export const REVERSE_KEYS = ['reverse'] as const;
export const GAP_KEYS = ['noGap'] as const;
export const PILL_KEYS = ['pill'] as const;
export const SHARP_KEYS = ['sharp'] as const;
export const SHAPE_KEYS = ['rounded', 'pill', 'sharp'] as const;
export const DIRECTION_KEYS = ['row', 'column'] as const;
export const ITEMS_KEYS = ['itemsStart', 'itemsEnd', 'itemsCenter', 'itemsBaseline', 'itemsStretch'] as const;
export const JUSTIFY_KEYS = ['justifyStart', 'justifyEnd', 'justifyCenter', 'justifyBetween', 'justifyAround', 'justifyEvenly', 'justifyStretch', 'justifyBaseline'] as const;
export const WRAP_KEYS = ['flexWrap', 'flexNoWrap', 'flexWrapReverse'] as const;

export type SizeKey = typeof SIZE_KEYS[number];
export type StyleKey = typeof STYLE_KEYS[number];
export type AppearanceKey = typeof APPEARANCE_KEYS[number];
export type TextAppearanceKey = typeof TEXT_APPEARANCE_KEYS[number];
export type FontFamilyKey = typeof FONT_FAMILY_KEYS[number];
export type FontWeightKey = typeof FONT_WEIGHT_KEYS[number];
export type FontStyleKey = typeof FONT_STYLE_KEYS[number];
export type TextDecorationKey = typeof TEXT_DECORATION_KEYS[number];
export type TextTransformKey = typeof TEXT_TRANSFORM_KEYS[number];
export type TextAlignKey = typeof TEXT_ALIGN_KEYS[number];
export type BorderKey = typeof BORDER_KEYS[number];
export type ShadowKey = typeof SHADOW_KEYS[number];
export type RingKey = typeof RING_KEYS[number];
export type PaddingKey = typeof PADDING_KEYS[number];
export type BreakpointKey = typeof BREAKPOINT_KEYS[number];
export type HideKey = typeof HIDE_KEYS[number];
export type PositionKey = typeof POSITION_KEYS[number];
export type ReverseKey = typeof REVERSE_KEYS[number];
export type GapKey = typeof GAP_KEYS[number];
export type PillKey = typeof PILL_KEYS[number];
export type SharpKey = typeof SHARP_KEYS[number];
export type ShapeKey = typeof SHAPE_KEYS[number];
export type DirectionKey = typeof DIRECTION_KEYS[number];
export type ItemsKey = typeof ITEMS_KEYS[number];
export type JustifyKey = typeof JUSTIFY_KEYS[number];
export type WrapKey = typeof WRAP_KEYS[number];

export const FLAG_KEYS = [
  ...SIZE_KEYS,
  ...STYLE_KEYS,
  ...TEXT_APPEARANCE_KEYS,
  ...FONT_FAMILY_KEYS,
  ...FONT_WEIGHT_KEYS,
  ...FONT_STYLE_KEYS,
  ...TEXT_DECORATION_KEYS,
  ...TEXT_TRANSFORM_KEYS,
  ...TEXT_ALIGN_KEYS,
  ...BORDER_KEYS,
  ...SHADOW_KEYS,
  ...RING_KEYS,
  ...PADDING_KEYS,
  ...BREAKPOINT_KEYS,
  ...HIDE_KEYS,
  ...POSITION_KEYS,
  ...REVERSE_KEYS,
  ...GAP_KEYS,
  ...PILL_KEYS,
  ...SHARP_KEYS,
  ...SHAPE_KEYS,
  ...DIRECTION_KEYS,
  ...ITEMS_KEYS,
  ...JUSTIFY_KEYS,
  ...WRAP_KEYS
] as const;
