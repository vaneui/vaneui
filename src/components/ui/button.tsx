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
  filledTextAppearanceClasses,
  buttonTextSizeClasses
} from "./props/typographyValues";
import { buttonRoundedClasses } from "./props/layoutValues";

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
    .withPx()
    .withPy()
    .withTextSize(buttonTextSizeClasses)
    .withGap()
    .withShadow()
    .withHoverShadow()
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
    .withRounded(buttonRoundedClasses, { md: true })
    .withPill()
    .withSharp()
    .withNoBorder()
    .withNoShadow()
    .registerKeys(['filled', 'outline'])
    .build();
};
