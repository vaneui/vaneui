import { useMemo } from 'react';
import {
  SIZE_KEYS,
  STYLE_KEYS,
  TEXT_APPEARANCE_KEYS,
  FONT_FAMILY_KEYS,
  FONT_WEIGHT_KEYS,
  FONT_STYLE_KEYS,
  TEXT_DECORATION_KEYS,
  TEXT_TRANSFORM_KEYS,
  TEXT_ALIGN_KEYS,
  SHAPE_KEYS,
  HIDE_KEYS,
  POSITION_KEYS,
  NO_BORDER_KEYS,
  NO_SHADOW_KEYS,
  NO_RING_KEYS,
  DIRECTION_KEYS,
  ITEMS_KEYS,
  JUSTIFY_KEYS,
  DIRECTION_REVERSE_KEYS, WRAP_KEYS
} from '../props/propKeys';
import { pickFirstKey, pickFirstKeyOptional, omitProps } from '../../utils/componentUtils';
import { MODE_KEYS } from '../props/mode';
import { ComponentTheme, VariantAppearance } from '../theme/componentTheme';

// Generic props interface for components that use the theme system
export interface ComponentProps {
  tag?: string;
  noBorder?: boolean;
  noShadow?: boolean;
  noRing?: boolean;
  [key: string]: any;
}

// Hook to generate component classes based on props and theme
export function useComponentClasses<T extends VariantAppearance, P extends ComponentProps, D extends Record<string, any> = {}>(
  props: P,
  theme: ComponentTheme<T, D>,
  propsToOmit: readonly string[] = []
) {
  const {
    size,
    style,
    appearance,
    shape,
    fontFamily,
    fontWeight,
    fontStyle,
    textDecoration,
    textTransform,
    textAlign,
    hide,
    position,
    noBorder,
    noShadow,
    noRing,

    reverse,
    direction,
    items,
    justify,
    wrap,
  } = useMemo(() => {
    // Helper function to find the default key from theme.defaults
    const findDefaultKey = <K extends string>(keys: readonly K[]): K | undefined => {
      for (const key of keys) {
        if (theme.defaults && key in theme.defaults && (theme.defaults as any)[key]) {
          return key;
        }
      }
      return undefined;
    };

    return {
      size: pickFirstKey(props, SIZE_KEYS, findDefaultKey(SIZE_KEYS) || 'md'),
      style: pickFirstKey(props, STYLE_KEYS, findDefaultKey(STYLE_KEYS) || 'outline'),
      appearance: pickFirstKey(props, TEXT_APPEARANCE_KEYS, findDefaultKey(TEXT_APPEARANCE_KEYS) || 'default'),
      shape: pickFirstKey(props, SHAPE_KEYS, findDefaultKey(SHAPE_KEYS) || 'rounded'),
      fontFamily: pickFirstKey(props, FONT_FAMILY_KEYS, findDefaultKey(FONT_FAMILY_KEYS) || 'sans'),
      fontWeight: pickFirstKey(props, FONT_WEIGHT_KEYS, findDefaultKey(FONT_WEIGHT_KEYS) || 'normal'),

      //optional props:
      fontStyle: pickFirstKeyOptional(props, FONT_STYLE_KEYS, findDefaultKey(FONT_STYLE_KEYS)),
      textDecoration: pickFirstKeyOptional(props, TEXT_DECORATION_KEYS, findDefaultKey(TEXT_DECORATION_KEYS)),
      textTransform: pickFirstKeyOptional(props, TEXT_TRANSFORM_KEYS, findDefaultKey(TEXT_TRANSFORM_KEYS)),
      textAlign: pickFirstKeyOptional(props, TEXT_ALIGN_KEYS, findDefaultKey(TEXT_ALIGN_KEYS)),
      hide: pickFirstKeyOptional(props, HIDE_KEYS, findDefaultKey(HIDE_KEYS)),
      position: pickFirstKeyOptional(props, POSITION_KEYS, findDefaultKey(POSITION_KEYS)),
      reverse: pickFirstKeyOptional(props, DIRECTION_REVERSE_KEYS, findDefaultKey(DIRECTION_REVERSE_KEYS)),

      direction: pickFirstKeyOptional(props, DIRECTION_KEYS, findDefaultKey(DIRECTION_KEYS)),
      items: pickFirstKeyOptional(props, ITEMS_KEYS, findDefaultKey(ITEMS_KEYS)),
      justify: pickFirstKeyOptional(props, JUSTIFY_KEYS, findDefaultKey(JUSTIFY_KEYS)),
      wrap: pickFirstKeyOptional(props, WRAP_KEYS, findDefaultKey(WRAP_KEYS)),

      // Assign prop value if present, otherwise use theme default boolean
      noBorder: props.noBorder ?? (theme.defaults as any).noBorder ?? false,
      noShadow: props.noShadow ?? (theme.defaults as any).noShadow ?? false,
      noRing: props.noRing ?? (theme.defaults as any).noRing ?? false,
    };
  }, [props, theme]);

  // Combine all props to omit
  const allPropsToOmit: readonly string[] = [
    ...SIZE_KEYS, 
    ...STYLE_KEYS, 
    ...TEXT_APPEARANCE_KEYS, 
    ...SHAPE_KEYS, 
    ...FONT_FAMILY_KEYS, 
    ...FONT_WEIGHT_KEYS, 
    ...FONT_STYLE_KEYS, 
    ...TEXT_DECORATION_KEYS, 
    ...TEXT_TRANSFORM_KEYS, 
    ...TEXT_ALIGN_KEYS, 
    ...HIDE_KEYS, 
    ...POSITION_KEYS,
    ...NO_BORDER_KEYS,
    ...NO_SHADOW_KEYS,
    ...NO_RING_KEYS,
    ...propsToOmit
  ] as const;

  const cleanProps = omitProps(props, allPropsToOmit);

  // Get size variants from the new structure
  const pxVariant = theme.size?.px?.[size];
  const pyVariant = theme.size?.py?.[size];
  const textVariant = theme.size?.text?.[size];
  const gapVariant = theme.size?.gap?.[size];
  const sizeShapeClass = theme.layout.radius === undefined ? "" : theme.layout.radius[size];
  const shapeClass = shape === 'rounded'
    ? sizeShapeClass
    : shape === 'pill'
      ? 'rounded-full'
      : shape === 'sharp'
        ? 'rounded-none'
        : sizeShapeClass;
  const appearanceVariant = theme.style[style]?.[appearance];

  const tag: string | undefined = props.tag;
  const baseThemeClasses = theme.base;

  const baseClasses = [
    baseThemeClasses,
    shapeClass,
    fontWeight ? theme.typography.fontWeight[fontWeight] : '',
    fontFamily ? theme.typography.fontFamily[fontFamily] : '',
    fontStyle ? theme.typography.fontStyle[fontStyle] : '',
    textDecoration ? theme.typography.textDecoration[textDecoration] : '',
    textTransform ? theme.typography.textTransform[textTransform] : '',
    textAlign ? theme.typography.textAlign[textAlign] : '',
    hide ? theme.layout.hide[hide] : '',
    position ? theme.layout.position[position] : '',
    reverse ? theme.layout.reverse[reverse] : '',
    direction ? theme.layout.direction[direction] : '',
    items ? theme.layout.items[items] : '',
    justify ? theme.layout.justify[justify] : '',
    wrap ? theme.layout.wrap[wrap] : '',
  ];

  const modeClasses: string[] = [];

  MODE_KEYS.forEach(mode => {
    modeClasses.push(...[
      // Include all size variants
      pxVariant?.[mode] ?? '',
      pyVariant?.[mode] ?? '',
      textVariant?.[mode] ?? '',
      gapVariant?.[mode] ?? '',
      appearanceVariant?.background?.[mode] ?? '',
      appearanceVariant?.textColor?.[mode] ?? '',
      noRing
        ? theme.layout.flags.noRing[mode] ?? ''
        : `${theme.layout.ring[mode] ?? ''} ${appearanceVariant?.ringColor?.[mode] ?? ''}`,
      noBorder
        ? theme.layout.flags.noBorder[mode] ?? ''
        : `${theme.layout.border[mode] ?? ''} ${appearanceVariant?.borderColor?.[mode] ?? ''}`,
      noShadow
        ? theme.layout.flags.noShadow[mode] ?? ''
        : theme.layout.shadow[mode]?.[size] ?? '',
    ]);
  });

  return { cleanProps, tag, baseClasses, modeClasses };
}
