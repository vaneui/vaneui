import { JSX } from 'react';
import { ButtonProps, BUTTON_PROPS_TO_OMIT } from './props/props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

export const Button = (props: ButtonProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.button} propsToOmit={BUTTON_PROPS_TO_OMIT} {...props} />
};
