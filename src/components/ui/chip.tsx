import React, { JSX } from 'react';
import { componentBuilder } from "./../utils/componentBuilder";
import { TypographyComponentProps } from "./props/props";
import { backgroundAppearanceClasses, borderAppearanceClasses } from './props/appearanceValues';
import { textSizeClasses } from "./props/typographyValues";

export const Chip = (props: TypographyComponentProps): JSX.Element =>
  componentBuilder(props, "span", "rounded-full w-fit h-fit border inline-flex gap-2 items-center")
    .withPx()
    .withPy()
    .withRounded({
      xs: "rounded-sm",
      sm: "rounded-md",
      md: "rounded-lg",
      lg: "rounded-xl",
      xl: "rounded-2xl"
    })
    .withAppearance(backgroundAppearanceClasses, {default: true})
    .withBorderColor(borderAppearanceClasses, {default: true})
    .withNoBorder()
    .withTypography(textSizeClasses, {
      fontFamily: {mono: true},
      textAppearance: {secondary: true},
      textSize: {md: true}
    })
    .build();
