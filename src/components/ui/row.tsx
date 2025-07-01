import { JSX } from 'react';
import { RowProps } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";
import { ROW_KEYS } from './props/keys';

export const Row = (props: RowProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.row} propsToOmit={ROW_KEYS} {...props} />
};
