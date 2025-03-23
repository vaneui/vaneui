import React, { JSX } from 'react';
import { componentBuilder } from "./../utils/componentBuilder";
import { TypographyComponentProps } from "./props/props";
import { backgroundAppearanceClasses, borderAppearanceClasses } from './props/appearanceValues';

export const Chip = (props: TypographyComponentProps): JSX.Element =>
  componentBuilder(props, "span", "rounded-full w-fit h-fit border inline-flex gap-2 items-center")
    .withSizes({
      xs: "px-1   py-0.5 rounded-sm  text-xs",
      sm: "px-1.5 py-1   rounded-md  text-sm",
      md: "px-2   py-1.5 rounded-lg  text-base",
      lg: "px-3   py-2   rounded-xl  text-lg",
      xl: "px-4   py-2.5 rounded-2xl text-xl",
    })
    .withAppearance(backgroundAppearanceClasses, { default: true })
    .withBorderColor(borderAppearanceClasses, { default: true })
    .withNoBorder()
    .withTypography({
      fontFamily: { mono: true },
      textAppearance: { secondary: true },
    })
    .build();
