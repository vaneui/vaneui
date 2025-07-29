import { JSX } from 'react';
import { StackProps } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Stack = (props: StackProps): JSX.Element => {
  const theme = useTheme();
  const stackTheme = theme.stack;
  return <ThemedComponent theme={stackTheme} {...props} />
};
