import React from 'react';
import { componentBuilder } from "./utils";
import { BaseComponentProps } from "./props";

export const Divider: React.FC<BaseComponentProps> = (props) =>
  componentBuilder(props, "div", "bg-gray-200 w-full h-px")
    .build();
