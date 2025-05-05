import { JSX } from 'react';
import { TypographyComponentProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';
import { useComponentClasses } from './hooks/useComponentClasses';

/**
 * Badge component
 * 
 * A badge is a small visual indicator that typically appears as a colored dot, 
 * circle, or pill-shaped element. It's commonly used to highlight new or unread 
 * items, notify users of updates, or display counts.
 * 
 * The badge component maintains its original simple implementation while using
 * the theme system for consistent styling.
 */
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
