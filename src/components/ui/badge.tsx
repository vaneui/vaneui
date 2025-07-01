import { JSX } from 'react';
import { BadgeProps } from './props/props';
import { ThemedComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { BADGE_KEYS } from './props/keys';

export const Badge = (props: BadgeProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.badge} propsToOmit={BADGE_KEYS} {...props} />
}
