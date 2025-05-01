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
  FLAG_KEYS
} from './props/propKeys';
import {
  pickFirstKey,
  pickFirstValue,
  omitProps
} from '../utils/componentUtils';
import { MODE_KEYS } from './settings/mode';
import { ButtonDefinition } from './buttonDefinition'
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
  positionClasses
} from './classes/layoutClasses';
import React from 'react';
import { componentBuilder } from '../utils/componentBuilder';

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

  // build once
  const buttonDef = new ButtonDefinition();
  const tag = props.tag ?? buttonDef.tag;
  const baseClasses = buttonDef.baseClasses;

  const classesByMode: Record<typeof MODE_KEYS[number], string[]> = {} as any;

  MODE_KEYS.forEach(mode => {
    const buttonMode = buttonDef.mode[mode];
    const buttonSize = buttonMode.size[size];
    const buttonColors = buttonMode.style[style].appearance[appearance];

    const modeClasses = [
      buttonMode.extraClasses,
      buttonSize.extraClasses,
      buttonSize.textSize,
      buttonSize.padding.x,
      buttonSize.padding.y,
      buttonSize.gap,
      buttonSize.shape[shape],
      noShadow ? noShadowModeClasses[mode] : buttonSize.shadow,
      noBorder ? noBorderModeClasses[mode] : buttonSize.border,
      buttonColors.bg,
      buttonColors.borderColor,
      buttonColors.color,
      fontWeight ? fontWeightClasses[fontWeight] : buttonSize.fontWeight,
      fontFamily ? fontFamilyClasses[fontFamily] : buttonSize.fontFamily,
      fontStyle ? fontStyleClasses[fontStyle] : buttonSize.fontStyle,
      textDecoration ? textDecorationClasses[textDecoration] : buttonSize.textDecoration,
      textTransform ? textTransformClasses[textTransform] : buttonSize.textTransform,
      textAlign ? textAlignClasses[textAlign] : buttonSize.textAlign,
      hide ? hideClasses[hide] : '',
      position ? positionClasses[position] : ''
    ];

    classesByMode[mode] = modeClasses.filter(Boolean);
  });

  return { cleanProps, tag, baseClasses, classesByMode };
}

export const Button = (props: ButtonProps): JSX.Element => {
  const { cleanProps, tag, baseClasses, classesByMode } = useButtonClasses(props);

  const builder = componentBuilder(cleanProps, tag, baseClasses);
  MODE_KEYS.forEach(mode => builder.withExtraClasses(classesByMode[mode]));

  return builder.build();
};
