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
  ShapeKey
} from './props/propKeys';
import {
  pickFirstKey,
  pickFirstValue,
  omitProps
} from '../utils/componentUtils';
import { MODE_KEYS } from './settings/mode';
import { 
  pxMap, 
  pyMap, 
  textSizeMap, 
  roundedMap, 
  gapMap
} from './classes/buttonClasses'
import {
  activeBackgroundAppearanceClasses,
  backgroundAppearanceClasses,
  filledActiveBackgroundAppearanceClasses,
  filledBackgroundAppearanceClasses,
  filledHoverBackgroundAppearanceClasses, 
  filledRingAppearanceClasses,
  hoverBackgroundAppearanceClasses, 
  ringAppearanceClasses
} from './classes/appearanceClasses';
import {
  filledTextAppearanceClasses,
  textAppearanceClasses
} from './classes/typographyClasses';
import {
  fontFamilyClasses,
  fontStyleClasses,
  fontWeightClasses,
  textDecorationClasses,
  textTransformClasses,
  textAlignClasses
} from './classes/typographyClasses';
import {
  noBorderModeClasses,
  noShadowModeClasses,
  hideClasses,
  positionClasses,
  shadowClasses,
  hoverShadowClasses,
  activeShadowClasses
} from './classes/layoutClasses';
import React from 'react';
import { componentBuilder } from '../utils/componentBuilder';

/**
 * Defines the classes for a component's different states
 */
export type VariantClasses = {
  [K in typeof MODE_KEYS[number]]: string;
}

/**
 * Maps size keys to their variant classes
 */
export type ButtonSizeVariants = Record<SizeKey, VariantClasses>;

/**
 * Maps style keys to appearance keys to their variant classes
 */
export type ButtonStyleVariants = Record<StyleKey, Record<TextAppearanceKey, VariantClasses>>;

/**
 * Size variants for buttons
 */
export const SIZE_VARIANTS: ButtonSizeVariants = SIZE_KEYS.reduce((acc, size) => {
  acc[size] = {
    base: `${pxMap[size]} ${pyMap[size]} ${textSizeMap[size]} ${roundedMap[size]} ${shadowClasses[size]} ${gapMap[size]} ${fontFamilyClasses.sans} ${fontWeightClasses.semibold} ${textAlignClasses.textCenter}`,
    hover: hoverShadowClasses[size],
    active: activeShadowClasses[size],
  };
  return acc;
}, {} as ButtonSizeVariants);

/**
 * Shape variants for buttons
 */
export const SHAPE_VARIANTS: Record<ShapeKey, VariantClasses> = {
  rounded: { base: 'rounded-md', hover: '', active: '' },
  pill:    { base: 'rounded-full', hover: '', active: '' },
  sharp:   { base: 'rounded-none', hover: '', active: '' },
};

/**
 * Style variants for buttons
 */
export const STYLE_VARIANTS: ButtonStyleVariants = {
  outline: makeStyleVariants(
    backgroundAppearanceClasses,
    hoverBackgroundAppearanceClasses,
    activeBackgroundAppearanceClasses,
    ringAppearanceClasses,
    textAppearanceClasses,
  ),
  filled: makeStyleVariants(
    filledBackgroundAppearanceClasses,
    filledHoverBackgroundAppearanceClasses,
    filledActiveBackgroundAppearanceClasses,
    filledRingAppearanceClasses,
    filledTextAppearanceClasses,
  ),
};

/**
 * Factory function to create style variants
 */
export function makeStyleVariants(
  baseBg: Record<TextAppearanceKey, string>,
  hoverBg: Record<TextAppearanceKey, string>,
  activeBg: Record<TextAppearanceKey, string>,
  ring: Record<TextAppearanceKey, string>,
  text: Record<TextAppearanceKey, string>,
): Record<TextAppearanceKey, Record<typeof MODE_KEYS[number], string>> {
  return TEXT_APPEARANCE_KEYS.reduce((acc, key) => {
    acc[key] = {
      base: `${baseBg[key]} border ${ring[key]} ${text[key]}`,
      hover: hoverBg[key],
      active: activeBg[key],
    };
    return acc;
  }, {} as Record<TextAppearanceKey, Record<typeof MODE_KEYS[number], string>>);
}

export function useButtonClasses(props: ButtonProps) {
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
    size:           pickFirstKey(props, SIZE_KEYS, 'md') ?? 'md',
    style:          pickFirstKey(props, STYLE_KEYS, 'outline') ?? 'outline',
    appearance:     pickFirstKey(props, TEXT_APPEARANCE_KEYS, 'default') ?? 'default',
    shape:          pickFirstKey(props, SHAPE_KEYS, 'rounded') ?? 'rounded',
    fontFamily:     pickFirstKey(props, FONT_FAMILY_KEYS, 'sans'),
    fontWeight:     pickFirstKey(props, FONT_WEIGHT_KEYS, 'semibold'),
    fontStyle:      pickFirstKey(props, FONT_STYLE_KEYS),
    textDecoration: pickFirstKey(props, TEXT_DECORATION_KEYS),
    textTransform:  pickFirstKey(props, TEXT_TRANSFORM_KEYS),
    textAlign:      pickFirstKey(props, TEXT_ALIGN_KEYS),
    hide:           pickFirstKey(props, HIDE_KEYS),
    position:       pickFirstKey(props, POSITION_KEYS),
    noBorder:       pickFirstValue(props, BORDER_KEYS),
    noShadow:       pickFirstValue(props, SHADOW_KEYS),
  }), [props]);

  // strip all the boolean flags
  const cleanProps = omitProps(props, FLAG_KEYS);

  // Get the size, style, and shape variants
  const sizeClasses = SIZE_VARIANTS[size as keyof typeof SIZE_VARIANTS];
  const styleClasses = STYLE_VARIANTS[style as keyof typeof STYLE_VARIANTS][appearance as TextAppearanceKey];
  const shapeClasses = SHAPE_VARIANTS[shape as keyof typeof SHAPE_VARIANTS];

  // Define the base tag and classes
  const tag = props.tag ?? "button";
  const baseClasses = "w-fit h-fit cursor-pointer inline-flex items-center justify-center transition-all duration-200 whitespace-nowrap";

  // Combine all classes by mode
  const classesByMode: Record<typeof MODE_KEYS[number], string[]> = {
    base: [
      baseClasses,
      sizeClasses.base,
      styleClasses.base,
      fontWeight ? fontWeightClasses[fontWeight] : '',
      fontFamily ? fontFamilyClasses[fontFamily] : '',
      fontStyle ? fontStyleClasses[fontStyle] : '',
      textDecoration ? textDecorationClasses[textDecoration] : '',
      textTransform ? textTransformClasses[textTransform] : '',
      textAlign ? textAlignClasses[textAlign] : '',
      hide ? hideClasses[hide] : '',
      position ? positionClasses[position] : '',
      shapeClasses.base,
      noBorder ? noBorderModeClasses.base : '',
      noShadow ? noShadowModeClasses.base : ''
    ].filter(Boolean),
    hover: [
      sizeClasses.hover,
      styleClasses.hover,
      shapeClasses.hover,
      noBorder ? noBorderModeClasses.hover : '',
      noShadow ? noShadowModeClasses.hover : ''
    ].filter(Boolean),
    active: [
      sizeClasses.active,
      styleClasses.active,
      shapeClasses.active,
      noBorder ? noBorderModeClasses.active : '',
      noShadow ? noShadowModeClasses.active : ''
    ].filter(Boolean)
  };

  return { cleanProps, tag, baseClasses, classesByMode };
}

export const Button = (props: ButtonProps): JSX.Element => {
  const { cleanProps, tag, baseClasses, classesByMode } = useButtonClasses(props);

  const builder = componentBuilder(cleanProps, tag, baseClasses);
  MODE_KEYS.forEach(mode => builder.withExtraClasses(classesByMode[mode]));

  return builder.build();
};
