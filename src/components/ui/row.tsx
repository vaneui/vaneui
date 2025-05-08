import { JSX } from 'react';
import { RowProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';
import { useComponentClasses } from './hooks/useComponentClasses';
import { ROW_KEYS } from './props/propKeys';
import { rowToColumnBreakpointClasses } from './classes/layoutClasses';

export const Row = (props: RowProps): JSX.Element => {
  const theme = useTheme();
  const rowTheme = theme.row;

  // Use the common component classes hook with row-specific defaults
  const { cleanProps, tag: defaultTag, baseClasses, modeClasses } = useComponentClasses(
    props,
    rowTheme,
    ROW_KEYS
  );

  // Set default direction if none is specified
  const directionProps = {...cleanProps};

  // Override the default tag to be "div" for rows
  const tag = props.tag ?? "div";

  return componentBuilder(directionProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};
