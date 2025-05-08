import { JSX } from 'react';
import { RowProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';
import { ROW_KEYS } from './props/propKeys';
import { rowToColumnBreakpointClasses } from './classes/layoutClasses';

export const Row = (props: RowProps): JSX.Element => {
  const theme = useTheme();
  const rowTheme = theme.row;

  // Override the default tag to be "div" for rows
  const propsWithDefaultTag = { ...props, tag: props.tag ?? "div" };

  return componentBuilder(propsWithDefaultTag, rowTheme, ROW_KEYS).build();
};
