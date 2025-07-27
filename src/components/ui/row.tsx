import { JSX } from 'react';
import { RowProps, ROW_PROPS_TO_OMIT } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Row = (props: RowProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.row} propsToOmit={ROW_PROPS_TO_OMIT} {...props} />
};
