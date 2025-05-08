import { JSX } from 'react';
import { BaseComponentProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';
import { DIVIDER_KEYS } from './props/propKeys';

export const Divider = (props: BaseComponentProps): JSX.Element => {
  const theme = useTheme();
  const dividerTheme = theme.divider;

  // Override the default tag to be "div" for dividers
  const propsWithDefaultTag = { ...props, tag: props.tag ?? "div" };

  return componentBuilder(propsWithDefaultTag, dividerTheme, DIVIDER_KEYS).build();
};
