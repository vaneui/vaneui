import { JSX } from 'react';
import { DividerProps } from './props/props';
import { buildComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { DIVIDER_KEYS } from './props/keys';

export const Divider = (props: DividerProps): JSX.Element => {
  const theme = useTheme();
  const dividerTheme = theme.divider;
  return buildComponent(props, dividerTheme, DIVIDER_KEYS);
};
