import { JSX } from 'react';
import { GridProps } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Grid3 = (props: GridProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.grid3} {...props} />
};

export const Grid4 = (props: GridProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.grid4} {...props} />
};