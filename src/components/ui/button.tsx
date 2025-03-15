import React, { JSX } from 'react';
import { componentBuilder } from "../utils/componentBuilder";
import { TypographyComponentProps } from "./props/props";

export const Button = (props: TypographyComponentProps): JSX.Element =>
  componentBuilder(props, "button", "w-fit h-fit cursor-pointer inline-flex items-center border border-gray-200 transition-all duration-300")
    .withSizes({
      xs: "px-2 py-1 rounded-sm text-xs/6",
      sm: "px-3 py-1 rounded-md text-sm/6",
      md: "px-4 py-2 rounded-md text-base",
      lg: "px-6 py-3 rounded-lg text-lg/6",
      xl: "px-8 py-4 rounded-xl text-xl/6",
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
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
      xl: "gap-5",
    })
    .withTypography({
      fontWeight: { semibold: true },
    })
    .build();
