import { JSX } from 'react';
import { CodeProps } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Code = (props: CodeProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.code} {...props} />
};