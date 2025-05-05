import { JSX } from 'react';
import { TypographyComponentProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';
import { useComponentClasses } from './hooks/useComponentClasses';

export const Badge = (props: TypographyComponentProps): JSX.Element => {
  const theme = useTheme();
  const badgeTheme = theme.badge;

  // Use the common component classes hook with badge-specific defaults
  const { cleanProps, tag: defaultTag, baseClasses, modeClasses } = useComponentClasses(
    props,
    badgeTheme
  );

  // Override the default tag to be "span" for badges (original implementation used span)
  const tag = props.tag ?? "span";

  return componentBuilder(cleanProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};
