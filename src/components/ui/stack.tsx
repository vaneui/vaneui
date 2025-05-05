import { JSX } from 'react';
import { StackProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';
import { useComponentClasses } from './hooks/useComponentClasses';
import { STACK_KEYS } from './props/propKeys';
import { rowToColumnBreakpointClasses, directionClasses } from './classes/layoutClasses';

export const Stack = (props: StackProps): JSX.Element => {
  const theme = useTheme();
  const stackTheme = theme.stack;

  // Use the common component classes hook with stack-specific defaults
  const { cleanProps, tag: defaultTag, baseClasses, modeClasses } = useComponentClasses(
    props,
    stackTheme,
    STACK_KEYS
  );

  // Set default direction if none is specified
  const defaultDirection = !props.row && !props.column ? {column: true} : {};
  const directionProps = {...defaultDirection, ...cleanProps};

  // Override the default tag to be "div" for stacks
  const tag = props.tag ?? "div";

  return componentBuilder(directionProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .withClasses(rowToColumnBreakpointClasses)
    .withClasses(directionClasses, {column: true})
    .build();
};
