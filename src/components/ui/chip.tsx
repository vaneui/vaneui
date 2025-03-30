import React, { JSX } from 'react';
import { componentBuilder } from "./../utils/componentBuilder";
import { TypographyComponentProps } from "./props/props";
import { backgroundAppearanceClasses, borderAppearanceClasses } from './props/appearanceValues';
import { textSizeClasses } from "./props/typographyValues";
import { BorderSettings } from './settings/settings';

// Custom rounded classes for Chip
const chipRoundedClasses = {
  xs: "rounded-sm",
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl"
};

// Border settings for Chip
const chipBorderSettings: BorderSettings = {
  color: { default: true },
  radius: {
    rounded: { md: true },
    pill: false,
    sharp: false
  }
};

export const Chip = (props: TypographyComponentProps): JSX.Element =>
  componentBuilder(props, "span", "w-fit h-fit border inline-flex gap-2 items-center")
    .withPx()
    .withPy()
    .withAppearance(backgroundAppearanceClasses, {default: true})
    .withBorder(borderAppearanceClasses, chipRoundedClasses, chipBorderSettings)
    .withTypography(textSizeClasses, {
      fontFamily: {mono: true},
      textAppearance: {secondary: true},
      textSize: {md: true}
    })
    .build();
