import React, { JSX } from 'react';
import { componentBuilder } from "../utils/componentBuilder";
import { TypographyComponentProps } from "./props/props";
import { backgroundAppearanceClasses, borderAppearanceClasses } from './props/appearanceValues';
import { textSizeClasses } from "./props/typographyValues";
import { BorderSettings } from './settings/settings';
import { roundedClasses } from "./props/layoutValues";

// Border settings for Badge
const badgeBorderSettings: BorderSettings = {
  color: {default: true},
  radius: {
    rounded: {md: true},
    pill: true,
    sharp: false
  }
};

export const Badge = (props: TypographyComponentProps): JSX.Element =>
  componentBuilder(props, "span", "w-fit h-fit border inline-flex gap-2 items-center")
    .withPadding()
    .withAppearance(backgroundAppearanceClasses, {default: true})
    .withBorder(borderAppearanceClasses, roundedClasses, badgeBorderSettings)
    .withTypography(textSizeClasses, {
      fontWeight: {semibold: true},
      fontFamily: {sans: true},
      textTransform: {uppercase: true},
      textAppearance: {secondary: true},
      textSize: {md: true}
    })
    .build();
