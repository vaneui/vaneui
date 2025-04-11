import { JSX } from 'react';
import { ComponentBuilder, componentBuilder } from "../utils/componentBuilder";
import { ButtonProps } from "./props/props";
import { ButtonSettings } from './settings/buttonSettings';
import { ButtonBaseClasses, ButtonClasses } from "./classes/buttonClasses";
import { useTheme } from '../theme';
import { Mode } from "./settings/mode";

export const Button = (props: ButtonProps): JSX.Element => {
  // Try to get settings from theme context, fall back to defaults if not available
  let buttonSettings: ButtonSettings;
  let buttonClasses: ButtonClasses;

  const theme = useTheme();
  buttonSettings = new ButtonSettings(theme.button?.settings !== undefined ? theme.button?.settings : {});
  buttonClasses = new ButtonClasses(theme.button?.classes !== undefined ? theme.button?.classes : {});

  let styleClasses: Record<Mode, Partial<ButtonBaseClasses>>;

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
    return c
      .withPadding(classes?.px, classes?.py)
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
    .build();
};
