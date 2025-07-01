import { JSX } from 'react';
import { DividerProps } from './props/props';
import { ThemedComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { DIVIDER_KEYS } from './props/keys';

export const Divider = (props: DividerProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.divider} propsToOmit={DIVIDER_KEYS} {...props} />
};
