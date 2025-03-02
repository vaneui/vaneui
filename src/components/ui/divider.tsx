import React from 'react';
import { componentBuilder } from "./../utils/componentBuilder";
import { BaseComponentProps } from "./props/props";

export const Divider: React.FC<BaseComponentProps> = (props) =>
  componentBuilder(props, "div", "bg-gray-200 w-full h-px")
    .build();
