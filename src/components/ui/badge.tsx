import { JSX } from 'react';
import { BadgeProps } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Badge = (props: BadgeProps): JSX.Element => {
  const theme = useTheme();
  return <ThemedComponent theme={theme.badge} {...props} />
}
