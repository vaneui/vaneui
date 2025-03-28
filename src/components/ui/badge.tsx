import React, { JSX } from 'react';
import { componentBuilder } from "../utils/componentBuilder";
import { TypographyComponentProps } from "./props/props";
import { backgroundAppearanceClasses, borderAppearanceClasses } from './props/appearanceValues';

export const Badge = (props: TypographyComponentProps): JSX.Element =>
  componentBuilder(props, "span", "rounded-full w-fit h-fit border inline-flex gap-2 items-center")
    .withPx()
    .withPy()
    .withTextSize()
    .withAppearance(backgroundAppearanceClasses, { default: true })
    .withBorderColor(borderAppearanceClasses, { default: true })
    .withNoBorder()
    .withTypography({
      fontWeight: { semibold: true },
      fontFamily: { sans: true },
      textTransform: { uppercase: true },
      textAppearance: { secondary: true },
    })
    .build();
