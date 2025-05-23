import { JSX } from 'react';
import { ButtonProps } from './props/props';
import { buildComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { BUTTON_KEYS } from './props/propKeys';
import { ComponentTheme } from './theme/common/ComponentTheme';

export const Button = (props: ButtonProps): JSX.Element => {
  const theme = useTheme();
  const buttonTheme = theme.button;

  // Override the default tag to be "button" for buttons
  const propsWithDefaultTag = { ...props, tag: props.tag ?? "button" };

  // Use a type assertion to explicitly tell TypeScript that buttonTheme is of type ComponentTheme<ButtonProps>
  return buildComponent(propsWithDefaultTag, buttonTheme as ComponentTheme<ButtonProps>, BUTTON_KEYS);
};
