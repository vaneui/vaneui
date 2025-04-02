import { JSX } from 'react';
import { GridProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { layoutBackgroundAppearanceClasses } from "./classes/appearanceValues";
import { gridGaps } from "./classes/layoutClasses";

export const Grid4 = (props: GridProps): JSX.Element =>
  componentBuilder(props, "div", "w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1")
    .withGaps(gridGaps)
    .withAppearance(layoutBackgroundAppearanceClasses, { default: true })
    .build();
