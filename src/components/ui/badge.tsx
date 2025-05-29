import { JSX } from 'react';
import { BadgeProps, TypographyComponentProps } from './props/props';
import { buildComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { BADGE_KEYS } from './props/keys';

export const Badge = (props: BadgeProps): JSX.Element => {
  const theme = useTheme();
  const badgeTheme = theme.badge;
  return buildComponent(props, badgeTheme, BADGE_KEYS);
};
