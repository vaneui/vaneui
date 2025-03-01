import React from 'react';
import { componentBuilder } from "./utils";
import { TypographyComponentProps } from "./props";

export const Chip: React.FC<TypographyComponentProps> = (props) =>
  componentBuilder(props, "span", "rounded-full w-fit h-fit border")
    .withSizes({
      xs: "px-1 py-1 rounded-sm text-xs",
      sm: "px-2 py-1 rounded-md text-sm",
      md: "px-2 py-1 rounded-lg text-base",
      lg: "px-3 py-2 rounded-xl text-lg",
      xl: "px-4 py-3 rounded-2xl text-xl",
    })
    .withAppearance({
      default: "bg-gray-100",
      accent: "bg-gray-200",
      primary: "bg-blue-200",
      secondary: "bg-gray-200",
      tertiary: "bg-gray-200",
      success: "bg-green-200",
      danger: "bg-red-200",
      warning: "bg-yellow-200",
      info: "bg-blue-200"
    }, {})
    .withTypography({
      fontFamily: { mono: true },
      textAppearance: { secondary: true },
    })
    .build();
