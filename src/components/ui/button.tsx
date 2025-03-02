import React from 'react';
import { componentBuilder } from "../utils/componentBuilder";
import { TypographyComponentProps } from "./props/props";

export const Button: React.FC<TypographyComponentProps> = (props) =>
  componentBuilder(props, "button", "w-fit h-fit cursor-pointer flex justify-center items-center border border-gray-200 transition-all duration-300")
    .withSizes({
      xs: "px-2 py-1 rounded-sm text-xs",
      sm: "px-3 py-1 rounded-md text-sm",
      md: "px-4 py-2 rounded-md text-base",
      lg: "px-6 py-3 rounded-lg text-lg",
      xl: "px-8 py-4 rounded-xl text-xl",
    })
    .withSizes({
      xs: "shadow-xs hover:shadow-sm",
      sm: "shadow-xs hover:shadow-sm",
      md: "shadow-sm hover:shadow-md",
      lg: "shadow-md hover:shadow-lg",
      xl: "shadow-lg hover:shadow-xl",
    })
    .withTypography({
      fontWeight: { semibold: true },
    })
    .build();
