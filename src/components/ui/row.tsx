import { JSX } from 'react';
import { RowProps } from './props/props';
import { buildComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { ROW_KEYS } from './props/keys';
import { rowToColumnBreakpointClasses } from './classes/layoutClasses';

export const Row = (props: RowProps): JSX.Element => {
  const theme = useTheme();
  const rowTheme = theme.row;
  return buildComponent(props, rowTheme, ROW_KEYS);
};
