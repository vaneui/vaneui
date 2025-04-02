import { JSX } from 'react';
import { LayoutComponentProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { layoutBackgroundAppearanceClasses } from "./classes/appearanceValues";
import { itemsClasses } from "./classes/layoutClasses";

export const Container = (props: LayoutComponentProps): JSX.Element =>
  componentBuilder(props, "div", "flex flex-col mx-auto w-full")
    .withClasses(itemsClasses)
    .withClasses({
      xs: "max-w-3xl gap-2  max-lg:gap-1",
      sm: "max-w-4xl gap-4  max-lg:gap-3 max-md:gap-2",
      md: "max-w-5xl gap-6  max-lg:gap-5 max-md:gap-4",
      lg: "max-w-6xl gap-8  max-lg:gap-7 max-md:gap-6",
      xl: "max-w-7xl gap-10 max-lg:gap-9 max-md:gap-8",
    }, {md: true})
    .withAppearance(layoutBackgroundAppearanceClasses, {transparent: true})
    .build();