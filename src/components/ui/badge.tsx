import React from 'react';
import { componentBuilder } from "./utils";
import { TypographyComponentProps } from "./props";

export const Badge: React.FC<TypographyComponentProps> = (props) =>
  componentBuilder(props, "span", "rounded-full w-fit")
    .withSizes({
      xs: "px-2 py-1 text-xs",
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-2 text-lg",
      xl: "px-6 py-3 text-xl",
    })
    .withAppearance({
      default: "bg-gray-200",
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
      fontWeight: { semibold: true },
      fontFamily: { mono: true },
      textTransform: { uppercase: true },
      textAppearance: { secondary: true },
    })
    .build();
    