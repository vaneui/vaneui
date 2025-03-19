import React, { JSX } from 'react';
import { componentBuilder } from "../utils/componentBuilder";
import { TypographyComponentProps } from "./props/props";
import { backgroundAppearanceClasses, borderAppearanceClasses } from "./props/commonValues";

export const Button = (props: TypographyComponentProps): JSX.Element =>
  componentBuilder(props, "button", "w-fit h-fit cursor-pointer inline-flex items-center justify-center border transition-all duration-300")
    .withSizes({
      xs: "px-2 py-1   rounded-sm text-xs/5",
      sm: "px-2.5 py-1.5 rounded-md text-sm/5",
      md: "px-3.5 py-2   rounded-md text-base",
      lg: "px-5 py-3   rounded-lg text-lg/6",
      xl: "px-6 py-4   rounded-xl text-xl/6",
    })
    .withSizes({
      xs: "shadow-xs hover:shadow-sm",
      sm: "shadow-xs hover:shadow-sm",
      md: "shadow-sm hover:shadow-md",
      lg: "shadow-md hover:shadow-lg",
      xl: "shadow-lg hover:shadow-xl",
    })
    .withSizes({
      xs: "gap-1",
      sm: "gap-1.5",
      md: "gap-3",
      lg: "gap-4",
      xl: "gap-5",
    })
    .withTypography({
      fontWeight: { semibold: true },
    })
    .withBooleanProps(backgroundAppearanceClasses, "default")
    .withBooleanProps(borderAppearanceClasses, "default")
    .build();
