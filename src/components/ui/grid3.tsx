import { JSX } from 'react';
import { GridProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { layoutBackgroundAppearanceClasses } from "./classes/appearanceValues";
import { gridGaps } from "./classes/spacingClasses";

export const Grid3 = (props: GridProps): JSX.Element =>
  componentBuilder(props, "div", "w-full grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1")
    .withGaps(gridGaps)
    .withAppearance(layoutBackgroundAppearanceClasses, { default: true })
    .build();
