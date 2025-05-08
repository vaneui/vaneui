import { JSX } from 'react';
import { TypographyComponentProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';

export const Badge = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  const badgeTheme = theme.badge;

  // Override the default tag to be "span" for badges (original implementation used span)
  const propsWithDefaultTag = { ...props, tag: props.tag ?? "span" };

  return componentBuilder(propsWithDefaultTag, badgeTheme).build();
};
