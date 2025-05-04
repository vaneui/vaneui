import { JSX, useMemo } from 'react';
import {
  ButtonProps
} from './props/props';
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
  BUTTON_KEYS,
} from './props/propKeys';
import {
  pickFirstKey,
  omitProps, pickFirstKeyOptional
} from '../utils/componentUtils';
import { MODE_KEYS } from './settings/mode';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';

export function useButtonClasses(props: ButtonProps) {
  const theme = useTheme();
  const buttonTheme = theme.button;
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
  } = useMemo(() => {
    return {
      size: pickFirstKey(props, SIZE_KEYS, buttonTheme.defaults.size),
      style: pickFirstKey(props, STYLE_KEYS, buttonTheme.defaults.style),
      appearance: pickFirstKey(props, TEXT_APPEARANCE_KEYS, buttonTheme.defaults.appearance),
      shape: pickFirstKey(props, SHAPE_KEYS, buttonTheme.defaults.shape),
      fontFamily: pickFirstKey(props, FONT_FAMILY_KEYS, buttonTheme.defaults.fontFamily),
      fontWeight: pickFirstKey(props, FONT_WEIGHT_KEYS, buttonTheme.defaults.fontWeight),

      //optional props:
      fontStyle: pickFirstKeyOptional(props, FONT_STYLE_KEYS, buttonTheme.defaults.fontStyle),
      textDecoration: pickFirstKeyOptional(props, TEXT_DECORATION_KEYS, buttonTheme.defaults.textDecoration),
      textTransform: pickFirstKeyOptional(props, TEXT_TRANSFORM_KEYS, buttonTheme.defaults.textTransform),
      textAlign: pickFirstKeyOptional(props, TEXT_ALIGN_KEYS, buttonTheme.defaults.textAlign),
      hide: pickFirstKeyOptional(props, HIDE_KEYS, buttonTheme.defaults.hide),
      position: pickFirstKeyOptional(props, POSITION_KEYS, buttonTheme.defaults.position),

      // Assign prop value if present, otherwise use theme default boolean
      noBorder: props.noBorder ?? buttonTheme.defaults.noBorder,
      noShadow: props.noShadow ?? buttonTheme.defaults.noShadow,
      noRing: props.noRing ?? buttonTheme.defaults.noRing,
    };
  }, [props, buttonTheme]);

  const cleanProps = omitProps(props, BUTTON_KEYS);

  const sizeVariant = buttonTheme.size[size];
  const shapeClass = shape === 'rounded'
    ? buttonTheme.layout.radius[size]
    : shape === 'pill'
      ? 'rounded-full'
      : shape === 'sharp'
        ? 'rounded-none'
        : buttonTheme.layout.radius[size];
  const appearanceVariant = buttonTheme.style[style]?.[appearance];

  const tag = props.tag ?? "button";
  const baseThemeClasses = buttonTheme.base;

  const baseClasses = [
    baseThemeClasses,
    shapeClass,
    fontWeight ? buttonTheme.typography.fontWeight[fontWeight] : '',
    fontFamily ? buttonTheme.typography.fontFamily[fontFamily] : '',
    fontStyle ? buttonTheme.typography.fontStyle[fontStyle] : '',
    textDecoration ? buttonTheme.typography.textDecoration[textDecoration] : '',
    textTransform ? buttonTheme.typography.textTransform[textTransform] : '',
    textAlign ? buttonTheme.typography.textAlign[textAlign] : '',
    hide ? buttonTheme.layout.hide[hide] : '',
    position ? buttonTheme.layout.position[position] : '',
  ];

  const modeClasses: string[] = [];

  MODE_KEYS.forEach(mode => {
    modeClasses.push(...[
      sizeVariant?.[mode] ?? '',
      appearanceVariant?.background?.[mode] ?? '',
      appearanceVariant?.textColor?.[mode] ?? '',
      noRing
        ? buttonTheme.layout.flags.noRing[mode] ?? ''
        : `${buttonTheme.layout.ring[mode] ?? ''} ${appearanceVariant?.ringColor?.[mode] ?? ''}`,
      noBorder
        ? buttonTheme.layout.flags.noBorder[mode] ?? ''
        : `${buttonTheme.layout.border[mode] ?? ''} ${appearanceVariant?.borderColor?.[mode] ?? ''}`,
      noShadow
        ? buttonTheme.layout.flags.noShadow[mode] ?? ''
        : buttonTheme.layout.shadow[mode]?.[size] ?? '',
    ]);
  });

  return { cleanProps, tag, baseClasses, modeClasses };
}

export const Button = (props: ButtonProps): JSX.Element => {
  const {cleanProps, tag, baseClasses, modeClasses} = useButtonClasses(props);

  return componentBuilder(cleanProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};