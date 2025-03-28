import React, { JSX } from 'react';
import { componentBuilder } from "./../utils/componentBuilder";
import { TypographyComponentProps } from "./props/props";
import { backgroundAppearanceClasses, borderAppearanceClasses } from './props/appearanceValues';

export const Chip = (props: TypographyComponentProps): JSX.Element =>
  componentBuilder(props, "span", "rounded-full w-fit h-fit border inline-flex gap-2 items-center")
    .withPx({
      xs: true,
      sm: true,
      md: true,
      lg: true,
      xl: true
    })
    .withPy({
      xs: true,
      sm: true,
      md: true,
      lg: true,
      xl: true
    })
    .withRounded({
      xs: "rounded-sm",
      sm: "rounded-md",
      md: "rounded-lg",
      lg: "rounded-xl",
      xl: "rounded-2xl"
    })
    .withTextSize()
    .withAppearance(backgroundAppearanceClasses, { default: true })
    .withBorderColor(borderAppearanceClasses, { default: true })
    .withNoBorder()
    .withTypography({
      fontFamily: { mono: true },
      textAppearance: { secondary: true },
    })
    .build();
