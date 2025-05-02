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
  FLAG_KEYS,
} from './props/propKeys';
import {
  pickFirstKey,
  omitProps
} from '../utils/componentUtils';
import { MODE_KEYS } from './settings/mode';
import { componentBuilder } from '../utils/componentBuilder';
import { useButtonTheme } from '../theme/themeContext';

export function useButtonClasses(props: ButtonProps) {
  const buttonTheme = useButtonTheme();

  // Extract props using defaults from buttonTheme
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
    noRing
  } = useMemo(() => ({
    size: pickFirstKey(props, SIZE_KEYS, buttonTheme.defaults.size) ?? buttonTheme.defaults.size,
    style: pickFirstKey(props, STYLE_KEYS, buttonTheme.defaults.style) ?? buttonTheme.defaults.style,
    appearance: pickFirstKey(props, TEXT_APPEARANCE_KEYS, buttonTheme.defaults.appearance) ?? buttonTheme.defaults.appearance,
    shape: pickFirstKey(props, SHAPE_KEYS, buttonTheme.defaults.shape) ?? buttonTheme.defaults.shape,
    fontFamily: pickFirstKey(props, FONT_FAMILY_KEYS, buttonTheme.defaults.fontFamily),
    fontWeight: pickFirstKey(props, FONT_WEIGHT_KEYS, buttonTheme.defaults.fontWeight),
    fontStyle: pickFirstKey(props, FONT_STYLE_KEYS, buttonTheme.defaults.fontStyle),
    textDecoration: pickFirstKey(props, TEXT_DECORATION_KEYS, buttonTheme.defaults.textDecoration),
    textTransform: pickFirstKey(props, TEXT_TRANSFORM_KEYS, buttonTheme.defaults.textTransform),
    textAlign: pickFirstKey(props, TEXT_ALIGN_KEYS, buttonTheme.defaults.textAlign),
    hide: pickFirstKey(props, HIDE_KEYS, buttonTheme.defaults.hide),
    position: pickFirstKey(props, POSITION_KEYS, buttonTheme.defaults.position),
    noBorder: props.noBorder,
    noShadow: props.noShadow,
    noRing: props.noRing,
  }), [props, buttonTheme]);

  // strip all the boolean flags
  const cleanProps = omitProps(props, FLAG_KEYS);

  // Get the variants from the buttonTheme
  const sizeClasses = buttonTheme.variants.size[size];
  const styleClasses = buttonTheme.variants.styleAppearance[style][appearance];
  const shapeClasses = buttonTheme.variants.shape[shape][size];

  // Define the base tag and classes
  const tag = props.tag ?? "button";
  const baseThemeClasses = buttonTheme.base;
  const baseClasses = [
    baseThemeClasses,
    fontWeight ? buttonTheme.typography.fontWeight[fontWeight] : '',
    fontFamily ? buttonTheme.typography.fontFamily[fontFamily] : '',
    fontStyle ? buttonTheme.typography.fontStyle[fontStyle] : '',
    textDecoration ? buttonTheme.typography.textDecoration[textDecoration] : '',
    textTransform ? buttonTheme.typography.textTransform[textTransform] : '',
    textAlign ? buttonTheme.typography.textAlign[textAlign] : '',
    hide ? buttonTheme.layout.hide[hide] : '',
    position ? buttonTheme.layout.position[position] : '',
  ];

  const modeClasses: string[] = []
  MODE_KEYS.forEach(mode => {
    modeClasses.push(...[
      sizeClasses[mode] ?? '',
      styleClasses[mode] ?? '',
      shapeClasses[mode] ?? '',
      noRing ? buttonTheme.layout.flags.noRing[mode] ?? '' : buttonTheme.layout.ring[mode],
      noBorder ? buttonTheme.layout.flags.noBorder[mode] ?? '' : buttonTheme.layout.border[mode],
      noShadow ? buttonTheme.layout.flags.noShadow[mode] ?? '' : buttonTheme.layout.shadow[mode][size],
    ]);
  })

  return {cleanProps, tag, baseClasses: baseClasses, modeClasses};
}

export const Button = (props: ButtonProps): JSX.Element => {
  const {cleanProps, tag, baseClasses, modeClasses} = useButtonClasses(props);

  return componentBuilder(cleanProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};
