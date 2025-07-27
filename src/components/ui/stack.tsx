import { JSX } from 'react';
import { StackProps, STACK_PROPS_TO_OMIT } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Stack = (props: StackProps): JSX.Element => {
  const theme = useTheme();
  const stackTheme = theme.stack;
  return <ThemedComponent theme={stackTheme} propsToOmit={STACK_PROPS_TO_OMIT} {...props} />
};
