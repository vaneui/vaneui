import { JSX } from 'react';
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
} from "./classes/appearanceValues";
import {
  textAppearanceClasses,
  filledTextAppearanceClasses,
} from "./classes/typographyClasses";
import {
  commonGaps,
  hoverShadowClasses,
  shadowClasses
} from "./classes/layoutClasses";
import { ButtonSettings } from './settings/buttonSettings';
import { ButtonClasses } from "./classes/buttonClasses";

const defaultButtonClasses: ButtonClasses = {
  baseClasses: "w-fit h-fit cursor-pointer inline-flex items-center justify-center border transition-all duration-300 whitespace-nowrap",
  textSize: {xs: "text-xs/5", sm: "text-sm/5", md: "text-base", lg: "text-lg/6", xl: "text-xl/6",},
  rounded: {xs: "rounded-sm", sm: "rounded-md", md: "rounded-md", lg: "rounded-lg", xl: "rounded-xl"},
  px: {xs: "px-2", sm: "px-2.5", md: "px-3.5", lg: "px-5", xl: "px-6"},
  py: {xs: "py-1", sm: "py-1.5", md: "py-2", lg: "py-3", xl: "py-4"},
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

export const Button = (props: ButtonProps): JSX.Element => {
  const settings = new ButtonSettings();
  const classes = defaultButtonClasses;

  const isOutline = props.outline !== undefined ? props.outline : settings.base.style.outline;
  const isFilled = props.filled !== undefined ? props.filled : settings.base.style.filled;

  const styleClasses = isFilled
    ? classes.style.filled
    : classes.style.outline;

  return componentBuilder(props, props.tag ? props.tag : settings.tag, classes.baseClasses)
    //apply base
    .with(c => c
      .withPadding(classes.px, classes.py)
      .withGaps(commonGaps, settings.base.gap)
      .withShadow(classes.shadow, settings.base.shadow)
      .withTypography(classes.textSize, styleClasses?.textAppearance, settings.base.typography)
      .withBorder(styleClasses.borderColor, classes.rounded, settings.base.border)
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
