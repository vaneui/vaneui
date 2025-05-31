import { JSX } from 'react';
import { StackProps } from './props/props';
import { buildComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { STACK_KEYS } from './props/keys';

export const Stack = (props: StackProps): JSX.Element => {
  const theme = useTheme();
  const stackTheme = theme.stack;
  return buildComponent(props, stackTheme, STACK_KEYS);
};
