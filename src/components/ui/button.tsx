import { JSX } from 'react';
import { ButtonProps } from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

export const Button = (props: ButtonProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.button} {...props} />
};
