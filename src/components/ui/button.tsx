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
import { ButtonSettings } from './settings/settings';

// Default button settings
const defaultButtonSettings: ButtonSettings = {
  // Component builder settings
  defaultTag: "button",
  baseClasses: "w-fit h-fit cursor-pointer inline-flex items-center justify-center border transition-all duration-300 whitespace-nowrap",

  // Typography settings
  typography: {
    fontWeight: { semibold: true },
    textAppearance: { default: true },
    textSize: { md: true }
  },
  px: { md: true },
  py: { md: true },
  gap: { md: true },
  shadow: { md: true },
  hover: {
    shadow: { md: true },
    backgroundAppearance: { default: true }
  },
  backgroundAppearance: { default: true },
  active: {
    backgroundAppearance: { default: true }
  },
  borderColor: { default: true },
  borderRadius: {
    rounded: { md: true }
  },
  // Group all class mappings into a single classes field
  classes: {
    // Common classes for both styles
    textSize: buttonTextSizeClasses,
    rounded: buttonRoundedClasses,

    // Filled button style classes
    filled: {
      backgroundAppearance: filledBackgroundAppearanceClasses,
      hoverBackgroundAppearance: filledHoverBackgroundAppearanceClasses,
      activeBackgroundAppearance: filledActiveBackgroundAppearanceClasses,
      textAppearance: filledTextAppearanceClasses,
      borderColor: filledBorderAppearanceClasses
    },

    // Outline button style classes
    outline: {
      backgroundAppearance: backgroundAppearanceClasses,
      hoverBackgroundAppearance: hoverBackgroundAppearanceClasses,
      activeBackgroundAppearance: activeBackgroundAppearanceClasses,
      textAppearance: textAppearanceClasses,
      borderColor: borderAppearanceClasses
    }
  }
};

export type ButtonComponentProps = ButtonProps;

export const Button = (props: ButtonComponentProps): JSX.Element => {
  const settings = defaultButtonSettings;

  // Determine if button is outline or filled (default is outline)
  const isOutline = props.outline !== false && !props.filled;
  const isFilled = props.filled === true;

  // Select the appropriate classes based on button style (filled or outline)
  const styleClasses = isFilled ? settings.classes.filled : settings.classes.outline;

  // Select the appropriate background, text, and border appearance classes
  const backgroundClasses = styleClasses?.backgroundAppearance || 
    (isFilled ? filledBackgroundAppearanceClasses : backgroundAppearanceClasses);
  const hoverBackgroundClasses = styleClasses?.hoverBackgroundAppearance || 
    (isFilled ? filledHoverBackgroundAppearanceClasses : hoverBackgroundAppearanceClasses);
  const activeBackgroundClasses = styleClasses?.activeBackgroundAppearance || 
    (isFilled ? filledActiveBackgroundAppearanceClasses : activeBackgroundAppearanceClasses);
  const textClasses = styleClasses?.textAppearance || 
    (isFilled ? filledTextAppearanceClasses : textAppearanceClasses);
  const borderClasses = styleClasses?.borderColor || 
    (isFilled ? filledBorderAppearanceClasses : borderAppearanceClasses);

  // Common classes for both styles
  const textSizeClasses = settings.classes?.textSize || buttonTextSizeClasses;
  const roundedClasses = settings.classes?.rounded || buttonRoundedClasses;

  return componentBuilder(props, settings.defaultTag || "button", settings.baseClasses || "w-fit h-fit cursor-pointer inline-flex items-center justify-center border transition-all duration-300 whitespace-nowrap")
    .withPx(settings.px)
    .withPy(settings.py)
    .withGap(settings.gap)
    .withShadow(settings.shadow)
    .withHoverShadow(settings.hover?.shadow)
    .withTypography(settings.typography || {
      fontWeight: { semibold: true },
      textAppearance: { default: true },
      textSize: { md: true }
    })
    // Override the text size classes with button-specific ones
    .withTextSize(textSizeClasses, settings.typography?.textSize)
    // Use the appropriate background appearance classes based on button style
    .withAppearance(backgroundClasses, settings.backgroundAppearance ?? { default: true })
    // Use the appropriate hover background appearance classes based on button style
    .withAppearance(hoverBackgroundClasses, settings.hover?.backgroundAppearance ?? { default: true })
    // Use the appropriate active background appearance classes based on button style
    .withAppearance(activeBackgroundClasses, settings.active?.backgroundAppearance ?? { default: true })
    // Use the appropriate text appearance classes based on button style
    .withTextAppearance(textClasses, settings.typography?.textAppearance ?? { default: true })
    // Use the appropriate border appearance classes based on button style
    .withBorderColor(borderClasses, settings.borderColor ?? { default: true })
    .withRounded(roundedClasses, settings.borderRadius?.rounded ?? { md: true })
    .withPill(settings.borderRadius?.pill ?? {})
    .withSharp(settings.borderRadius?.sharp ?? {})
    .withNoBorder()
    .withNoShadow()
    .registerKeys(['filled', 'outline'])
    .build();
};
