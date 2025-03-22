import React, { JSX } from 'react';
import { componentBuilder } from "../utils/componentBuilder";
import { TypographyComponentProps } from "./props/props";
import { backgroundAppearanceClasses, borderAppearanceClasses } from './props/commonValues';

export const Badge = (props: TypographyComponentProps): JSX.Element =>
  componentBuilder(props, "span", "rounded-full w-fit h-fit border inline-flex gap-2 items-center")
    .withSizes({
      xs: "px-2 py-1   text-xs",
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2   text-base",
      lg: "px-5 py-2.5 text-lg",
      xl: "px-6 py-3   text-xl",
    })
    .withAppearance(backgroundAppearanceClasses, { default: true })
    .withBorder(borderAppearanceClasses, { default: true })
    .withTypography({
      fontWeight: { semibold: true },
      fontFamily: { sans: true },
      textTransform: { uppercase: true },
      textAppearance: { secondary: true },
    })
    .build();
