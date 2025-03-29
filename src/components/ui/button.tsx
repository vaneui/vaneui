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
import { ButtonSettings, ButtonClasses } from './settings/settings';

// Default button classes
const defaultButtonClasses: ButtonClasses = {
  // Component builder settings
  baseClasses: "w-fit h-fit cursor-pointer inline-flex items-center justify-center border transition-all duration-300 whitespace-nowrap",

  // Common classes for both styles
  textSize: buttonTextSizeClasses,
  rounded: buttonRoundedClasses,

  style: {
    filled: {
      backgroundAppearance: filledBackgroundAppearanceClasses,
      hoverBackgroundAppearance: filledHoverBackgroundAppearanceClasses,
      activeBackgroundAppearance: filledActiveBackgroundAppearanceClasses,
      textAppearance: filledTextAppearanceClasses,
      borderColor: filledBorderAppearanceClasses
    },
    outline: {
      backgroundAppearance: backgroundAppearanceClasses,
      hoverBackgroundAppearance: hoverBackgroundAppearanceClasses,
      activeBackgroundAppearance: activeBackgroundAppearanceClasses,
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
    backgroundAppearance: {default: true}
  },
  backgroundAppearance: {default: true},
  active: {
    backgroundAppearance: {default: true}
  },
  borderColor: {default: true},
  borderRadius: {
    rounded: {md: true},
    pill: {pill: false},
    sharp: {sharp: false},
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
    .withPx(settings.px)
    .withPy(settings.py)
    .withGap(settings.gap)
    .withShadow(settings.shadow)
    .withHoverShadow(settings.hover?.shadow)
    .withTypography(settings.typography)
    .withTextSize(classes.textSize, settings.typography?.textSize)
    .withAppearance(styleClasses.hoverBackgroundAppearance, settings.hover.backgroundAppearance)
    .withAppearance(styleClasses.activeBackgroundAppearance, settings.active.backgroundAppearance)
    .withBorderColor(styleClasses.borderColor, settings.borderColor)
    .withRounded(classes.rounded, settings.borderRadius.rounded)
    .withPill(settings.borderRadius.pill)
    .withSharp(settings.borderRadius.sharp)
    .withNoBorder(settings.noBorder)
    .withNoShadow(settings.noShadow)
    .registerKeys(['filled', 'outline'])
    .build();
};
