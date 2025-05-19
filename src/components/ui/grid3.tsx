import { JSX } from 'react';
import { GridProps } from './props/props';
import { buildComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { GRID_KEYS } from './props/propKeys';

export const Grid3 = (props: GridProps): JSX.Element => {
  const theme = useTheme();
  const grid3Theme = theme.grid3;

  // Override the default tag to be "div" for grid3
  const propsWithDefaultTag = { ...props, tag: props.tag ?? "div" };

  return buildComponent(propsWithDefaultTag, grid3Theme, GRID_KEYS);
};
