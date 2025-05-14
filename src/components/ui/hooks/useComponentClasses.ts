import { useMemo } from 'react';
import { MODE_KEYS } from '../props/mode';
import { omitProps } from '../../utils/componentUtils';
import { BaseComponentTheme } from '../theme/common/baseComponentTheme';
import { BaseTheme } from '../theme/common/baseTheme';
import { StyleVariantComponentTheme } from "../theme/common/styleVariantComponentTheme";
import { SimpleComponentTheme } from "../theme/common/simpleComponentTheme";

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
  theme: BaseComponentTheme | StyleVariantComponentTheme | SimpleComponentTheme | BaseTheme,
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
