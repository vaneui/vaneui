import { JSX } from 'react';
import { ContainerProps } from './props/props';
import { buildComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { CONTAINER_KEYS } from './props/keys';

export const Container = (props: ContainerProps): JSX.Element => {
  const theme = useTheme();
  const containerTheme = theme.container;
  return buildComponent(props, containerTheme, CONTAINER_KEYS);
};
