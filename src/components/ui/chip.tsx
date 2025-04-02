import React, { JSX } from 'react';
import { componentBuilder } from "../utils/componentBuilder";
import { TypographyComponentProps } from "./props/props";
import { backgroundAppearanceClasses, borderAppearanceClasses } from './classes/appearanceClasses';
import { textAppearanceClasses, textSizeClasses } from "./classes/typographyClasses";
import { BorderSettings } from './settings/borderSettings';

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
  color: {default: true},
  radius: {
    rounded: {md: true},
    pill: false,
    sharp: false
  },
  noBorder: false
};

export const Chip = (props: TypographyComponentProps): JSX.Element =>
  componentBuilder(props, "span", "w-fit h-fit border inline-flex gap-2 items-center")
    .withPadding({
      xs: "px-2",
      sm: "px-2.5",
      md: "px-3.5",
      lg: "px-5",
      xl: "px-6"
    }, {
      xs: "py-1",
      sm: "py-1.5",
      md: "py-2",
      lg: "py-3",
      xl: "py-4"
    })
    .withAppearance(backgroundAppearanceClasses, {default: true})
    .withBorder(borderAppearanceClasses, chipRoundedClasses, chipBorderSettings)
    .withTypography(textSizeClasses, textAppearanceClasses, {
      fontFamily: {mono: true},
      textAppearance: {secondary: true},
      size: {md: true}
    })
    .build();
