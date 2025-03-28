import { JSX } from 'react';
import { GridProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { layoutBackgroundAppearanceClasses } from "./props/appearanceValues";
import { gridGaps } from "./props/layoutValues";

export const Grid4 = (props: GridProps): JSX.Element =>
  componentBuilder(props, "div", "w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1")
    .withGaps(gridGaps, { md: true })
    .withNoGap()
    .withAppearance(layoutBackgroundAppearanceClasses, { default: true })
    .build();