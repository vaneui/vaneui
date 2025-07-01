import { JSX } from 'react';
import { ColProps } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";
import { COL_KEYS } from './props/keys';

export const Col = (props: ColProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.col} propsToOmit={COL_KEYS} {...props} />
};
