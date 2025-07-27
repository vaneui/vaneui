import { JSX } from 'react';
import { DividerProps, DIVIDER_PROPS_TO_OMIT } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Divider = (props: DividerProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.divider} propsToOmit={DIVIDER_PROPS_TO_OMIT} {...props} />
};
