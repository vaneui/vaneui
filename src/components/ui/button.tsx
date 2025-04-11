import { JSX } from 'react';
import { ComponentBuilder, componentBuilder } from "../utils/componentBuilder";
import { ButtonProps } from "./props/props";
import { ButtonSettings } from './settings/buttonSettings';
import { ButtonBaseClasses, ButtonClasses } from "./classes/buttonClasses";
import { useTheme } from '../theme';
import { Mode } from "./settings/mode";

export const Button = (props: ButtonProps): JSX.Element => {
  // Create default instances
  let buttonSettings = new ButtonSettings();
  let buttonClasses = new ButtonClasses();

  const theme = useTheme();
  // Apply settings and classes functions from theme context if available
  if (theme?.button?.settings) {
    buttonSettings = theme.button.settings(buttonSettings);
  }
  if (theme?.button?.classes) {
    buttonClasses = theme.button.classes(buttonClasses);
  }

  let styleClasses: Record<Mode, ButtonBaseClasses>;

  if (props.outline === true) {
    styleClasses = buttonClasses.style.outline;
  } else if (props.filled === true) {
    styleClasses = buttonClasses.style.filled;
  } else {
    styleClasses = buttonSettings.base.style?.outline
      ? buttonClasses.style.outline
      : buttonClasses.style.filled;
  }

  console.log("button settings", buttonSettings)

  function applyState(c: ComponentBuilder, mode: Mode) {
    const classes = styleClasses[mode];
    const settings = buttonSettings[mode];
    console.log("button settings " + mode, buttonSettings[mode])
    console.log("button classes " + mode, styleClasses[mode])
    return c
      .withPadding(classes?.px, classes?.py, settings?.px, settings?.py)
      .withGaps(classes?.gap, settings?.gap)
      .withShadow(classes?.shadow, settings?.shadow)
      .withTypography(classes?.textSize, classes?.textAppearance, settings?.typography)
      .withBorder(classes?.borderColor, classes?.rounded, settings?.border, mode, 'ring')
      .withAppearance(classes?.background, settings.background);
  }

  return componentBuilder(props, props.tag ?? buttonSettings.tag, buttonClasses.baseClasses)
    .with(c => applyState(c, 'base'))
    .with(c => applyState(c, 'hover'))
    .with(c => applyState(c, 'active'))
    .registerKeys(['filled', 'outline'])
    .withExtraClasses(buttonClasses.extraClasses)
    .build();
};
