import React, { JSX } from 'react';
import { componentBuilder } from "./../utils/componentBuilder";
import { BaseComponentProps } from "./props/props";

export const Divider = (props: BaseComponentProps): JSX.Element =>
  componentBuilder(props, "div", "bg-gray-200 w-full h-px")
    .build();
