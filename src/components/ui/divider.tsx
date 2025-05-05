import { JSX } from 'react';
import { BaseComponentProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';
import { useComponentClasses } from './hooks/useComponentClasses';
import { DIVIDER_KEYS } from './props/propKeys';

export const Divider = (props: BaseComponentProps): JSX.Element => {
  const theme = useTheme();
  const dividerTheme = theme.divider;

  // Use the common component classes hook with divider-specific defaults
  const { cleanProps, tag: defaultTag, baseClasses, modeClasses } = useComponentClasses(
    props,
    dividerTheme,
    DIVIDER_KEYS
  );

  // Override the default tag to be "div" for dividers
  const tag = props.tag ?? "div";

  return componentBuilder(cleanProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};
