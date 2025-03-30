import React, { JSX } from 'react';
import { componentBuilder } from "../utils/componentBuilder";
import { TypographyComponentProps } from "./props/props";
import { backgroundAppearanceClasses, borderAppearanceClasses } from './props/appearanceValues';
import { textSizeClasses } from "./props/typographyValues";
import { BorderSettings } from './settings/settings';

// Border settings for Badge
const badgeBorderSettings: BorderSettings = {
  color: { default: true },
  radius: {
    rounded: {},
    pill: true,
    sharp: false
  }
};

export const Badge = (props: TypographyComponentProps): JSX.Element =>
  componentBuilder(props, "span", "w-fit h-fit border inline-flex gap-2 items-center")
    .withPx()
    .withPy()
    .withAppearance(backgroundAppearanceClasses, { default: true })
    .withBorder(borderAppearanceClasses, undefined, badgeBorderSettings)
    .withTypography(textSizeClasses, {
      fontWeight: { semibold: true },
      fontFamily: { sans: true },
      textTransform: { uppercase: true },
      textAppearance: { secondary: true },
      textSize: { md: true }
    })
    .build();
