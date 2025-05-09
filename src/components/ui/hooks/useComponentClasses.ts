import { useMemo } from 'react';
import { MODE_KEYS } from '../props/mode';
import { omitProps } from '../../utils/componentUtils';
import { ComponentThemeClass, StyleVariantComponentThemeClass, SimpleComponentThemeClass } from '../theme/componentThemeClass';
import { BaseTheme } from '../theme/baseTheme';
import {
  SIZE_KEYS,
  STYLE_KEYS,
  TEXT_APPEARANCE_KEYS,
  FONT_FAMILY_KEYS,
  FONT_WEIGHT_KEYS,
  FONT_STYLE_KEYS,
  TEXT_DECORATION_KEYS,
  TEXT_TRANSFORM_KEYS,
  TEXT_ALIGN_KEYS,
  SHAPE_KEYS,
  HIDE_KEYS,
  POSITION_KEYS,
  NO_BORDER_KEYS,
  NO_SHADOW_KEYS,
  NO_RING_KEYS,
  DIRECTION_KEYS,
  ITEMS_KEYS,
  JUSTIFY_KEYS,
  DIRECTION_REVERSE_KEYS,
  WRAP_KEYS,
  BREAKPOINT_KEYS
} from '../props/propKeys';

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
  theme: ComponentThemeClass | StyleVariantComponentThemeClass | SimpleComponentThemeClass | BaseTheme,
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
