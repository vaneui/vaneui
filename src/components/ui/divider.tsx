import { JSX } from 'react';
import { BaseComponentProps } from './props/props';
import { buildComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { DIVIDER_KEYS } from './props/keys';

export const Divider = (props: BaseComponentProps): JSX.Element => {
  const theme = useTheme();
  const dividerTheme = theme.divider;

  // Override the default tag to be "div" for dividers
  const propsWithDefaultTag = { ...props, tag: props.tag ?? "div" };

  return buildComponent(propsWithDefaultTag, dividerTheme, DIVIDER_KEYS);
};
