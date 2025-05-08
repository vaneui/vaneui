import { JSX } from 'react';
import { StackProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';
import { STACK_KEYS } from './props/propKeys';

export const Stack = (props: StackProps): JSX.Element => {
  const theme = useTheme();
  const stackTheme = theme.stack;

  // Set default direction if none is specified
  const defaultDirection = !props.row && !props.column ? {column: true} : {};
  const propsWithDirection = {...defaultDirection, ...props};

  return componentBuilder(propsWithDirection, stackTheme, STACK_KEYS).build();
};
