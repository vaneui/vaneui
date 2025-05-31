import { JSX } from 'react';
import { ButtonProps } from './props/props';
import { buildComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { BUTTON_KEYS } from './props/keys';
import { ComponentTheme } from './theme/common/ComponentTheme';

export const Button = (props: ButtonProps): JSX.Element => {
  const theme = useTheme();
  const buttonTheme = theme.button;
  return buildComponent(props, buttonTheme, BUTTON_KEYS);
};
