import { JSX } from 'react';
import { RowProps } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Row = (props: RowProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.row} {...props} />
};
