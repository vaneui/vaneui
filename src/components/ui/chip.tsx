import React, { JSX } from 'react';
import { componentBuilder } from "./../utils/componentBuilder";
import { TypographyComponentProps } from "./props/props";
import { backgroundAppearanceClasses, borderAppearanceClasses } from './props/commonValues';

export const Chip = (props: TypographyComponentProps): JSX.Element =>
  componentBuilder(props, "span", "rounded-full w-fit h-fit border")
    .withSizes({
      xs: "px-1 py-1 rounded-sm text-xs",
      sm: "px-2 py-1 rounded-md text-sm",
      md: "px-2 py-1 rounded-lg text-base",
      lg: "px-3 py-2 rounded-xl text-lg",
      xl: "px-4 py-3 rounded-2xl text-xl",
    })
    .withAppearance(backgroundAppearanceClasses, { default: true })
    .withBooleanProps(borderAppearanceClasses, "default")
    .withTypography({
      fontFamily: { mono: true },
      textAppearance: { secondary: true },
    })
    .build();
