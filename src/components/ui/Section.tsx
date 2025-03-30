import { JSX } from 'react';
import { LayoutComponentProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { layoutBackgroundAppearanceClasses } from "./props/appearanceValues";

export const Section = (props: LayoutComponentProps): JSX.Element =>
  componentBuilder(props, "section", "w-full flex flex-col")
    .withItems()
    .withPadding({
      xs: "py-3",
      sm: "py-5",
      md: "py-8  max-md:py-5",
      lg: "py-16 max-lg:py-14 max-md:py-12",
      xl: "py-20 max-lg:py-16 max-md:py-12",
    }, {
      xs: "px-5  max-lg:px-4 max-md:px-3",
      sm: "px-6  max-lg:px-5 max-md:px-4",
      md: "px-7  max-lg:px-6 max-md:px-5",
      lg: "px-8  max-lg:px-7 max-md:px-6",
      xl: "px-9  max-lg:px-8 max-md:px-7",
    })
    .withGaps()
    .withAppearance(layoutBackgroundAppearanceClasses, { default: true })
    .build();