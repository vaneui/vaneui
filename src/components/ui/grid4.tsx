import { JSX } from 'react';
import { GridProps } from './props/props';
import { buildComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { GRID_KEYS } from './props/propKeys';

export const Grid4 = (props: GridProps): JSX.Element => {
  const theme = useTheme();
  const grid4Theme = theme.grid4;

  // Override the default tag to be "div" for grid4
  const propsWithDefaultTag = { ...props, tag: props.tag ?? "div" };

  return buildComponent(propsWithDefaultTag, grid4Theme, GRID_KEYS);
};
