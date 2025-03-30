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
import { buttonRoundedClasses, commonGaps, pxClasses, pyClasses } from "./props/layoutValues";
import { ButtonSettings, ButtonClasses } from './settings/settings';

// Default button classes
const defaultButtonClasses: ButtonClasses = {
  // Component builder settings
  baseClasses: "w-fit h-fit cursor-pointer inline-flex items-center justify-center border transition-all duration-300 whitespace-nowrap",

  textSize: buttonTextSizeClasses,
  rounded: buttonRoundedClasses,
  px: pxClasses,
  py: pyClasses,

  style: {
    filled: {
      background: filledBackgroundAppearanceClasses,
      hoverBackground: filledHoverBackgroundAppearanceClasses,
      activeBackground: filledActiveBackgroundAppearanceClasses,
      textAppearance: filledTextAppearanceClasses,
      borderColor: filledBorderAppearanceClasses
    },
    outline: {
      background: backgroundAppearanceClasses,
      hoverBackground: hoverBackgroundAppearanceClasses,
      activeBackground: activeBackgroundAppearanceClasses,
      textAppearance: textAppearanceClasses,
      borderColor: borderAppearanceClasses
    }
  }
};

// Default button settings
const defaultButtonSettings: ButtonSettings = {
  defaultTag: "button",

  noBorder: false,
  noShadow: false,

  style: {
    outline: true
  },

  typography: {
    fontWeight: {semibold: true},
    textAppearance: {default: true},
    textSize: {md: true}
  },
  px: {md: true},
  py: {md: true},
  gap: {md: true},
  shadow: {md: true},
  hover: {
    shadow: {md: true},
    background: {default: true}
  },
  background: {default: true},
  active: {
    background: {default: true}
  },
  border: {
    color: {default: true},
    radius: {
      rounded: {md: true},
      pill: false,
      sharp: false,
    }
  }
};

export type ButtonComponentProps = ButtonProps;

export const Button = (props: ButtonComponentProps): JSX.Element => {
  const settings = defaultButtonSettings;
  const classes = defaultButtonClasses;

  // Determine if button is outline or filled (default is outline)
  const isOutline = settings.style.outline !== false && !settings.style.filled;
  const isFilled = settings.style.filled === true;

  // Select the appropriate classes based on button style (filled or outline)
  const styleClasses = isFilled
    ? classes.style.filled
    : classes.style.outline;

  return componentBuilder(props, settings.defaultTag, classes.baseClasses)
    .withPadding(classes.px, classes.py)
    .withGaps(commonGaps, settings.gap)
    .withShadow(settings.shadow, settings.noShadow)
    .withHoverShadow(settings.hover?.shadow)
    .withTypography(classes.textSize, settings.typography)
    .withAppearance(styleClasses.hoverBackgroundAppearance, settings.hover.background)
    .withAppearance(styleClasses.activeBackgroundAppearance, settings.active.background)
    .withBorder(styleClasses.borderColor, classes.rounded, settings.border, settings.noBorder)
    .registerKeys(['filled', 'outline'])
    .build();
};
