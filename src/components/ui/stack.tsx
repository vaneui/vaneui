import { JSX } from 'react';
import { StackProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';
import { useComponentClasses } from './hooks/useComponentClasses';
import { STACK_KEYS } from './props/propKeys';

export const Stack = (props: StackProps): JSX.Element => {
  const theme = useTheme();
  const stackTheme = theme.stack;

  // Use the common component classes hook with stack-specific defaults
  const { cleanProps, tag, baseClasses, modeClasses } = useComponentClasses(
    props,
    stackTheme,
    STACK_KEYS
  );

  // Set default direction if none is specified
  const defaultDirection = !props.row && !props.column ? {column: true} : {};
  const directionProps = {...defaultDirection, ...cleanProps};


  return componentBuilder(directionProps, tag || "div")
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};
