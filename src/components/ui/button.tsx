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
  BORDER_KEYS,
  SHADOW_KEYS,
  FLAG_KEYS,
  TextAppearanceKey,
  StyleKey,
  SizeKey,
  ShapeKey,
  FontFamilyKey,
  FontWeightKey,
  FontStyleKey,
  TextDecorationKey,
  TextTransformKey,
  TextAlignKey,
  HideKey,
  PositionKey
} from './props/propKeys';
import {
  pickFirstKey,
  pickFirstValue,
  omitProps
} from '../utils/componentUtils';
import { MODE_KEYS } from './settings/mode';
import React from 'react';
import { componentBuilder } from '../utils/componentBuilder';
import { useButtonTheme } from '../theme/themeContext';

export type VariantClasses = {
  [K in typeof MODE_KEYS[number]]: string;
}

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
    noShadow
  } = useMemo(() => ({
    size: pickFirstKey(props, SIZE_KEYS, buttonTheme.defaults.size) ?? buttonTheme.defaults.size,
    style: pickFirstKey(props, STYLE_KEYS, buttonTheme.defaults.style) ?? buttonTheme.defaults.style,
    appearance: pickFirstKey(props, TEXT_APPEARANCE_KEYS, buttonTheme.defaults.appearance) ?? buttonTheme.defaults.appearance,
    shape: pickFirstKey(props, SHAPE_KEYS, buttonTheme.defaults.shape) ?? buttonTheme.defaults.shape,
    fontFamily: pickFirstKey(props, FONT_FAMILY_KEYS, buttonTheme.defaults.fontFamily),
    fontWeight: pickFirstKey(props, FONT_WEIGHT_KEYS, buttonTheme.defaults.fontWeight),
    fontStyle: pickFirstKey(props, FONT_STYLE_KEYS, buttonTheme.defaults.fontStyle as FontStyleKey),
    textDecoration: pickFirstKey(props, TEXT_DECORATION_KEYS, buttonTheme.defaults.textDecoration as TextDecorationKey),
    textTransform: pickFirstKey(props, TEXT_TRANSFORM_KEYS, buttonTheme.defaults.textTransform as TextTransformKey),
    textAlign: pickFirstKey(props, TEXT_ALIGN_KEYS, buttonTheme.defaults.textAlign as TextAlignKey),
    hide: pickFirstKey(props, HIDE_KEYS, buttonTheme.defaults.hide as HideKey),
    position: pickFirstKey(props, POSITION_KEYS, buttonTheme.defaults.position as PositionKey),
    noBorder: pickFirstValue(props, BORDER_KEYS),
    noShadow: pickFirstValue(props, SHADOW_KEYS),
  }), [props, buttonTheme]);

  // strip all the boolean flags
  const cleanProps = omitProps(props, FLAG_KEYS);

  // Get the variants from the buttonTheme
  const sizeClasses = buttonTheme.variants.size[size as SizeKey];
  const styleClasses = buttonTheme.variants.styleAppearance[style as StyleKey][appearance as TextAppearanceKey];
  const shapeClasses = buttonTheme.variants.shape[shape as ShapeKey][size as SizeKey];

  // Define the base tag and classes
  const tag = props.tag ?? "button";
  const baseClasses = buttonTheme.base;

  // Combine all classes by mode
  const classesByMode: Record<typeof MODE_KEYS[number], string[]> = {
    base: [
      baseClasses,
      sizeClasses.base,
      styleClasses.base,
      fontWeight ? buttonTheme.typography.fontWeight[fontWeight as FontWeightKey] : '',
      fontFamily ? buttonTheme.typography.fontFamily[fontFamily as FontFamilyKey] : '',
      fontStyle ? buttonTheme.typography.fontStyle[fontStyle as FontStyleKey] : '',
      textDecoration ? buttonTheme.typography.textDecoration[textDecoration as TextDecorationKey] : '',
      textTransform ? buttonTheme.typography.textTransform[textTransform as TextTransformKey] : '',
      textAlign ? buttonTheme.typography.textAlign[textAlign as TextAlignKey] : '',
      hide ? buttonTheme.layout.hide[hide as HideKey] : '',
      position ? buttonTheme.layout.position[position as PositionKey] : '',
      shapeClasses.base,
      noBorder ? buttonTheme.layout.flags.noBorder.base : '',
      noShadow ? buttonTheme.layout.flags.noShadow.base : ''
    ],
    hover: [
      sizeClasses.hover ?? '',
      styleClasses.hover ?? '',
      shapeClasses.hover ?? '',
      noBorder ? buttonTheme.layout.flags.noBorder.hover ?? '' : '',
      noShadow ? buttonTheme.layout.flags.noShadow.hover ?? '' : ''
    ],
    active: [
      sizeClasses.active ?? '',
      styleClasses.active ?? '',
      shapeClasses.active ?? '',
      noBorder ? buttonTheme.layout.flags.noBorder.active ?? '' : '',
      noShadow ? buttonTheme.layout.flags.noShadow.active ?? '' : ''
    ]
  };

  return {cleanProps, tag, baseClasses, classesByMode};
}

export const Button = (props: ButtonProps): JSX.Element => {
  const {cleanProps, tag, baseClasses, classesByMode} = useButtonClasses(props);

  const builder = componentBuilder(cleanProps, tag, baseClasses);
  MODE_KEYS.forEach(mode => builder.withExtraClasses(classesByMode[mode]));

  return builder.build();
};
