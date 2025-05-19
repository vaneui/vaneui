import { JSX } from 'react';
import { TypographyComponentProps } from './props/props';
import { buildComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { BADGE_KEYS } from './props/propKeys';

export const Badge = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  const badgeTheme = theme.badge;

  // Override the default tag to be "span" for badges (original implementation used span)
  const propsWithDefaultTag = { ...props, tag: props.tag ?? "span" };

  return buildComponent(propsWithDefaultTag, badgeTheme, BADGE_KEYS);
};
