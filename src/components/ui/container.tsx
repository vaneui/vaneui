import { JSX } from 'react';
import { LayoutComponentProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';
import { CONTAINER_KEYS } from './props/propKeys';

export const Container = (props: LayoutComponentProps): JSX.Element => {
  const theme = useTheme();
  const containerTheme = theme.container;

  // Override the default tag to be "div" for containers
  const propsWithDefaultTag = { ...props, tag: props.tag ?? "div" };

  return componentBuilder(propsWithDefaultTag, containerTheme, CONTAINER_KEYS).build();
};
