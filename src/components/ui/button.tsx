import React, { JSX } from 'react';
import { componentBuilder } from "../utils/componentBuilder";
import { ButtonProps } from "./props/props";
import {
  borderAppearanceClasses,
  backgroundAppearanceClasses,
  filledBackgroundAppearanceClasses,
  filledBorderAppearanceClasses,
  hoverBackgroundAppearanceClasses,
  filledHoverBackgroundAppearanceClasses,
  activeBackgroundAppearanceClasses,
  filledActiveBackgroundAppearanceClasses
} from "./props/appearanceValues";
import {
  textAppearanceClasses,
  filledTextAppearanceClasses 
} from "./props/typographyValues";

export const Button = (props: ButtonProps): JSX.Element => {
  // Determine if button is outline or filled (default is outline)
  const isOutline = props.outline !== false && !props.filled;
  const isFilled = props.filled === true;

  // Select the appropriate background, text, and border appearance classes based on button style
  const backgroundClasses = isFilled ? filledBackgroundAppearanceClasses : backgroundAppearanceClasses;
  const hoverBackgroundClasses = isFilled ? filledHoverBackgroundAppearanceClasses : hoverBackgroundAppearanceClasses;
  const activeBackgroundClasses = isFilled ? filledActiveBackgroundAppearanceClasses : activeBackgroundAppearanceClasses;
  const textClasses = isFilled ? filledTextAppearanceClasses : textAppearanceClasses;
  const borderClasses = isFilled ? filledBorderAppearanceClasses : borderAppearanceClasses;

  return componentBuilder(props, "button", "w-fit h-fit cursor-pointer inline-flex items-center justify-center border transition-all duration-300 whitespace-nowrap")
    .withSizes({
      xs: "px-2   py-1   text-xs/5",
      sm: "px-2.5 py-1.5 text-sm/5",
      md: "px-3.5 py-2   text-base",
      lg: "px-5   py-3   text-lg/6",
      xl: "px-6   py-4   text-xl/6",
    })
    .withSizes({
      xs: "shadow-xs hover:shadow-sm",
      sm: "shadow-xs hover:shadow-sm",
      md: "shadow-sm hover:shadow-md",
      lg: "shadow-md hover:shadow-lg",
      xl: "shadow-lg hover:shadow-xl",
    })
    .withSizes({
      xs: "gap-1",
      sm: "gap-1.5",
      md: "gap-3",
      lg: "gap-4",
      xl: "gap-5",
    })
    .withTypography({
      fontWeight: { semibold: true },
      textAppearance: { default: true } // This will be overridden by withTextAppearance below
    })
    // Use the appropriate background appearance classes based on button style
    .withAppearance(backgroundClasses, { default: true })
    // Use the appropriate hover background appearance classes based on button style
    .withAppearance(hoverBackgroundClasses, { default: true })
    // Use the appropriate active background appearance classes based on button style
    .withAppearance(activeBackgroundClasses, { default: true })
    // Use the appropriate text appearance classes based on button style
    .withTextAppearance(textClasses, { default: true })
    // Use the appropriate border appearance classes based on button style
    .withBorderColor(borderClasses, { default: true })
    .withRounded({
      xs: "rounded-sm",
      sm: "rounded-md",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl"
    }, { md: true })
    .withPill()
    .withSharp()
    .withNoBorder()
    .withButtonStyle()
    .build();
};
