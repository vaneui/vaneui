import { JSX } from 'react';
import { StackProps } from './props/props';
import { ThemedComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { STACK_KEYS } from './props/keys';

export const Stack = (props: StackProps): JSX.Element => {
  const theme = useTheme();
  const stackTheme = theme.stack;
  return <ThemedComponent theme={stackTheme} propsToOmit={STACK_KEYS} {...props} />
};
