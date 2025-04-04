import { JSX } from 'react';
import { ComponentBuilder, componentBuilder } from "../utils/componentBuilder";
import { ButtonProps } from "./props/props";
import { ButtonSettings } from './settings/buttonSettings';
import { ButtonClasses, ButtonStyleClasses } from "./classes/buttonClasses";
import { useTheme } from '../theme';

export const Button = (props: ButtonProps): JSX.Element => {
  // Try to get settings from theme context, fall back to defaults if not available
  let buttonSettings: ButtonSettings;
  let buttonClasses: ButtonClasses;

  try {
    const theme = useTheme();
    buttonSettings = theme.button.settings;
    buttonClasses = theme.button.classes;
  } catch (e) {
    // Fallback to default settings if not within a ThemeProvider
    buttonSettings = new ButtonSettings();
    buttonClasses = new ButtonClasses();
  }

  let styleClasses: ButtonStyleClasses;

  if (props.outline === true) {
    styleClasses = buttonClasses.style.outline;
  } else if (props.filled === true) {
    styleClasses = buttonClasses.style.filled;
  } else {
    styleClasses = buttonSettings.base.style.outline
      ? buttonClasses.style.outline
      : buttonClasses.style.filled;
  }

  function applyState(c: ComponentBuilder, type: 'base' | 'hover' | 'active') {
    const classes = styleClasses[type];
    const settings = buttonSettings[type];
    return c
      .withPadding(classes.px, classes.py)
      .withGaps(classes.gap, settings.gap)
      .withShadow(classes.shadow, settings.shadow)
      .withTypography(classes.textSize, classes.textAppearance, settings.typography)
      .withBorder(classes.borderColor, classes.rounded, settings.border)
      .withAppearance(classes.background, settings.background);
  }

  return componentBuilder(props, props.tag ?? buttonSettings.tag, buttonClasses.baseClasses)
    .with(c => applyState(c, 'base'))
    .with(c => applyState(c, 'hover'))
    .with(c => applyState(c, 'active'))
    .registerKeys(['filled', 'outline'])
    .build();
};
