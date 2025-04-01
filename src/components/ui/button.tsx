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
} from "./props/typographyValues";
import {
  commonGaps,
  hoverShadowClasses,
  shadowClasses
} from "./props/layoutValues";
import { ButtonSettings, BaseButtonSettings, ShadowSettings } from './settings/settings';
import { ButtonClasses } from "./classes/classes";

// Default button classes
const defaultButtonClasses: ButtonClasses = {
  // Component builder settings
  baseClasses: "w-fit h-fit cursor-pointer inline-flex items-center justify-center border transition-all duration-300 whitespace-nowrap",

  textSize: {
    xs: "text-xs/5",
    sm: "text-sm/5",
    md: "text-base",
    lg: "text-lg/6",
    xl: "text-xl/6",
  },
  rounded: {
    xs: "rounded-sm",
    sm: "rounded-md",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl"
  },
  px: {
    xs: "px-2",
    sm: "px-2.5",
    md: "px-3.5",
    lg: "px-5",
    xl: "px-6"
  },
  py: {
    xs: "py-1",
    sm: "py-1.5",
    md: "py-2",
    lg: "py-3",
    xl: "py-4"
  },
  shadow: shadowClasses,

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

const baseSettings: BaseButtonSettings = {
  style: {
    outline: true,
    filled: false
  },
  typography: {
    fontWeight: {semibold: true},
    textAppearance: {default: true},
    textSize: {md: true}
  },
  background: {default: true},
  border: {
    color: {default: true},
    radius: {
      rounded: {md: true},
      pill: false,
      sharp: false,
    },
    noBorder: false
  },
  shadow: new ShadowSettings(),
  px: {md: true},
  py: {md: true},
  gap: {
    size: {md: true},
    noGap: false
  }
}

// Default button settings
const defaultButtonSettings: ButtonSettings = {
  tag: "button",

  base: baseSettings,
  hover: baseSettings,
  active: baseSettings,
};

export type ButtonComponentProps = ButtonProps;

export const Button = (props: ButtonComponentProps): JSX.Element => {
  const settings = defaultButtonSettings;
  const classes = defaultButtonClasses;

  // Determine if button is outline or filled (default is outline)
  const isOutline = props.outline !== undefined ? props.outline : settings.base.style.outline;
  const isFilled = props.filled !== undefined ? props.filled : settings.base.style.filled;

  // Select the appropriate classes based on button style (filled or outline)
  const styleClasses = isFilled
    ? classes.style.filled
    : classes.style.outline;

  return componentBuilder(props, props.tag ? props.tag : settings.tag, classes.baseClasses)
    //apply base
    .with(c => c
      .withPadding(classes.px, classes.py)
      .withGaps(commonGaps, settings.base.gap.size, settings.base.gap.noGap)
      .withShadow(classes.shadow, settings.base.shadow.size, settings.base.shadow.noShadow)
      .withTypography(classes.textSize, styleClasses?.textAppearance, settings.base.typography)
      .withBorder(styleClasses.borderColor, classes.rounded, settings.base.border, settings.base.border.noBorder)
      .withAppearance(styleClasses.background, settings.base.background)
    )
    //apply hover
    .with(c => c
      .withShadow(hoverShadowClasses)
      .withAppearance(styleClasses.hoverBackground, settings.hover.background)
    )
    //apply active
    .with(c => c
      .withAppearance(styleClasses.activeBackground, settings.active.background)
    )
    .registerKeys(['filled', 'outline'])
    .build();
};
