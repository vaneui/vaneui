import { useMemo } from 'react';
import { MODE_KEYS } from '../props/mode';
import { omitProps } from '../../utils/componentUtils';
import { ComponentTheme, StyleVariantComponentTheme, SimpleComponentTheme } from '../theme/componentTheme';
import { BaseTheme } from '../theme/baseTheme';

// Generic props interface for components that use the theme system
export interface ComponentProps {
  tag?: string;
  noBorder?: boolean;
  noShadow?: boolean;
  noRing?: boolean;
  [key: string]: any;
}

// Hook to generate component classes based on props and theme
export function useComponentClasses<P extends ComponentProps>(
  props: P,
  theme: ComponentTheme | StyleVariantComponentTheme | SimpleComponentTheme | BaseTheme,
  propsToOmit: readonly string[] = []
) {
  // Use only the props to omit passed from the outside
  const allPropsToOmit: readonly string[] = propsToOmit;

  const cleanProps = omitProps(props, allPropsToOmit);
  const tag: string | undefined = props.tag;

  // Get classes for each mode
  const classes = useMemo(() => {
    const modeClasses: string[] = [];

    // Get classes for each mode (base, hover, active)
    MODE_KEYS.forEach(mode => {
      modeClasses.push(theme.getClasses(props, mode));
    });

    return modeClasses.filter(Boolean).join(' ');
  }, [props, theme]);

  return { cleanProps, tag, classes };
}
