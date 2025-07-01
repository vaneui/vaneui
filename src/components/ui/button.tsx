import { JSX } from 'react';
import { ButtonProps } from './props/props';
import { useTheme } from "../themeContext";
import { BUTTON_KEYS } from './props/keys';
import { ThemedComponent } from "../themedComponent";

export const Button = (props: ButtonProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.button} propsToOmit={BUTTON_KEYS} {...props} />
};
