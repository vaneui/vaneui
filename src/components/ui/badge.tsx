import React, { JSX } from 'react';
import { componentBuilder } from "../utils/componentBuilder";
import { TypographyComponentProps } from "./props/props";
import { backgroundAppearanceClasses, borderAppearanceClasses } from './classes/appearanceValues';
import { textAppearanceClasses, textSizeClasses } from "./classes/typographyClasses";
import { BorderSettings } from './settings/settings';
import { roundedClasses } from "./classes/layoutClasses";

// Border settings for Badge
const badgeBorderSettings: BorderSettings = {
  color: {default: true},
  radius: {
    rounded: {md: true},
    pill: true,
    sharp: false
  },
  noBorder: false
};

export const Badge = (props: TypographyComponentProps): JSX.Element =>
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
    .withBorder(borderAppearanceClasses, roundedClasses, badgeBorderSettings)
    .withTypography(textSizeClasses, textAppearanceClasses, {
      fontWeight: {semibold: true},
      fontFamily: {sans: true},
      textTransform: {uppercase: true},
      textAppearance: {secondary: true},
      size: {md: true}
    })
    .build();
