import { JSX } from 'react';
import { ButtonProps } from './props/props';
import { buildComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { BUTTON_KEYS } from './props/propKeys';

export const Button = (props: ButtonProps): JSX.Element => {
  const theme = useTheme();
  const buttonTheme = theme.button;

  // Override the default tag to be "button" for buttons
  const propsWithDefaultTag = { ...props, tag: props.tag ?? "button" };

  return buildComponent(propsWithDefaultTag, buttonTheme, BUTTON_KEYS);
};
