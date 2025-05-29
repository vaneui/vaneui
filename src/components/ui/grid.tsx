import { JSX } from 'react';
import { GridProps } from './props/props';
import { buildComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { GRID_KEYS } from './props/keys';

export const Grid3 = (props: GridProps): JSX.Element => {
  const theme = useTheme();
  const grid3Theme = theme.grid3;
  return buildComponent(props, grid3Theme, GRID_KEYS);
};

export const Grid4 = (props: GridProps): JSX.Element => {
  const theme = useTheme();
  const grid4Theme = theme.grid4;
  return buildComponent(props, grid4Theme, GRID_KEYS);
};